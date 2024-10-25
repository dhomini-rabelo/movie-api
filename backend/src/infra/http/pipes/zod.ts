import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodSchema, ZodFormattedError } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(this.formatZodError(error.format()))
      }

      throw new BadRequestException({
        message: error.message,
      })
    }
    return value
  }

  formatZodError<ISchema>(payload: ZodFormattedError<ISchema>) {
    return Object.entries(payload).reduce(
      (acc: {
        [key: string]: string[] | { position: string; errors: string[] }[];
      }, entryData) => {
        const [fieldName, errorBody] = entryData as [
          string,
          string[] | { _errors: string[] } | { [key: string]: { _errors: string[] } },
        ];

        
        if (!Array.isArray(errorBody)) {
          if (Object.keys(errorBody).length === 1) {
            const errorBodyData = errorBody as { _errors: string[] };
            acc[fieldName] = errorBodyData._errors;
          } else {
            const errorBodyData = errorBody as { [key: string]: { _errors: string[] } };
            acc[fieldName] = Object.entries(errorBodyData).filter(([key]) => key !== '_errors').map(
              (entryData) => {
                const [index, errorBodyData] = entryData as [string, { _errors: string[] }];
                return {
                  position: index,
                  errors: errorBodyData._errors,
                }
              },
            )
          }
        } else if (errorBody.length > 0) {
          acc.body = errorBody;
        }
        
          return acc;
        },
        {},
    );
  }

}