import { Controller, Get, Delete, Post, Body, Param, UseInterceptors, UploadedFiles, Query } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { AddTrackToAlbum } from './dto/add-track-to-album.dto'
@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) { }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const { picture } = files
        return this.albumService.create(dto, picture[0])
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.albumService.getAll(+count, +offset)
    }
    @Get('/search')
    searchByQuery(@Query('query') query: string) {
        return this.albumService.searchByName(query)
    }
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.albumService.getById(+id)
    }
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.albumService.delete(+id)
    }
    // @Delete(':albumId/track/:trackId')
    // deleteTrack(@Param('albumId') albumId: number, @Param('trackId') trackId: number) {
    //     return this.albumService.deleteTrack(+albumId, +trackId)
    // }
    @Post('/tracks')
    createComment(@Body() dto: AddTrackToAlbum) {
        return this.albumService.addToAlbum(dto)
    }
}