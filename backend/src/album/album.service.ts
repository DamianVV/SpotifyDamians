import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service';
import { FileService, FileType } from '../file/file.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from '@prisma/client';
import { AddTrackToAlbum } from './dto/add-track-to-album.dto';

@Injectable()
export class AlbumService {
    constructor(
        private prisma: PrismaService,
        private fileService: FileService
    ) { }
    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        return this.prisma.album.create({
            data: {
                ...dto,
                picture: picturePath
            }
        })
    }
    async searchByName(query: string): Promise<Album[]> {
        return this.prisma.album.findMany({
            where: {
                name: {
                    contains: query
                }
            }
        })
    }
    async addToAlbum(dto: AddTrackToAlbum) {
        const { trackId, albumId } = dto
        return this.prisma.track.update({
            where: {
                id: trackId
            },
            data: {
                albumId: albumId
            }
        })
    }
    async getAll(count = 10, offset = 0): Promise<Album[]> {
        return this.prisma.album.findMany({})
    }
    async getById(id: number): Promise<Album> {
        return this.prisma.album.findUnique({
            where: {
                id
            },
            include: {
                tracks: true
            }
        })
    }
    async delete(id: number) {
        return this.prisma.album.delete({ where: { id } })
    }
}