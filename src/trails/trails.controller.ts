import { Controller, Post, Body } from '@nestjs/common';

import { TrailsService } from './trails.service';
import { CreateTrailsDto } from './dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post('add')
  create(@Body() createTrailsDto: CreateTrailsDto) {
    return this.trailsService.createTrail(createTrailsDto);
  }

  // @Get(':id')
  // show(@Param('id', ParseIntPipe) id: number) {
  //   return this.trailsService.showById(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('/quiz')
  // addQuizResult(@Body() addQuizResultDto: AddQuizResultDto, @Request() req) {
  //   return this.usersService.updateQuizDatas(
  //     parseInt(req.user.userId),
  //     addQuizResultDto,
  //   );
  // }
}
