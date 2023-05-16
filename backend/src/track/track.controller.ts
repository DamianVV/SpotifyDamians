import { Controller, Get, Delete, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { Query } from '@nestjs/common/decorators'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CreateTrackDto } from './dto/create-track.dto'
import { TrackService } from './track.service'
@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files
        return this.trackService.create(dto, picture[0], audio[0])
    }
    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.trackService.getAll(+count, +offset)
    }
    @Get('/search')
    searchByQuery(@Query('query') query: string) {
        return this.trackService.searchByQuery(query)
    }
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.trackService.getById(+id)
    }
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.trackService.delete(+id)
    }
    @Post('/comment')
    createComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto)
    }
}