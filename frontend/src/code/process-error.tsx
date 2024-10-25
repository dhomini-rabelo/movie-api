import { ErrorOption, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'

export function processFormErrorResponse<SchemaType extends FieldValues>(
  error: AxiosError,
  fieldsData: SchemaType,
  setError: (fieldName: keyof SchemaType, errorOptions: ErrorOption) => void,
  reset: (data: SchemaType) => void,
  renderFeedback: (
    type: 'error' | 'success',
    message: {
      message: string
      title?: string
      onClose?: () => void
    },
  ) => void | null,
  adapterFields: { [fieldName: string]: string } = {},
) {
  function showErrorMessages<SchemaType extends FieldValues>(
    apiFormErrors: { [field: string]: string[] },
    fieldsData: SchemaType,
    setError: (fieldName: keyof SchemaType, errorOptions: ErrorOption) => void,
    reset: (data: SchemaType) => void,
    adapterFields: { [fieldName: string]: string } = {},
  ) {
    reset(fieldsData)
    function loadErrors([fieldNameArray, fieldErrorsArray]: [
      string,
      string[],
    ]) {
      const fieldErrors = fieldErrorsArray as string[]
      const adaptedFieldName = (
        fieldNameArray in adapterFields
          ? adapterFields[fieldNameArray]
          : fieldNameArray
      ) as keyof SchemaType
      try {
        setError(adaptedFieldName!, { type: 'custom', message: fieldErrors[0] })
      } catch {
        throw new Error(`Invalid error key => ${fieldNameArray} `)
      }
    }
    Object.entries(apiFormErrors).forEach(
      ([fieldNameArray, fieldErrorsArray]) => {
        const fieldErrors = fieldErrorsArray as
          | string[]
          | { [key: string]: string[] }
        if (fieldErrors instanceof Array) {
          loadErrors([fieldNameArray, fieldErrorsArray])
        } else {
          Object.entries(fieldErrors).forEach(
            ([internalFieldNameArray, internalFieldErrorsArray]) =>
              loadErrors([
                `${fieldNameArray}.${internalFieldNameArray}`,
                internalFieldErrorsArray,
              ]),
          )
        }
      },
    )
  }

  if (error.response!.status === 400) {
    showErrorMessages<SchemaType>(
      error.response!.data as { [field: string]: string[] },
      fieldsData,
      setError,
      reset,
      adapterFields,
    )
  } else if (error.response!.status === 401) {
    if (renderFeedback) {
      renderFeedback('error', {
        message: 'Sessão expirada',
        onClose: () => {
          window.location.href = '/login'
        },
      })
    } else {
      window.location.href = '/login'
    }
  } else {
    reset(fieldsData)
    if (renderFeedback) {
      renderFeedback('error', { message: 'Server Error' })
    }
  }
}
