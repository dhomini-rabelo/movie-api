import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "@/infra/adapters/database/prisma";

@Controller('/movie-app/movie/components')
export class ListMovieComponentsController {

  constructor(
    private readonly prismaService: PrismaService
  ){}

  @Get()
  async handle(
  ) {
    const [genres, actors, directors] = await Promise.all([
      this.prismaService.genre.findMany(),
      this.prismaService.actor.findMany(),
      this.prismaService.director.findMany()
    ])

    return {
      genres,
      actors,
      directors,
    }
  }
}
