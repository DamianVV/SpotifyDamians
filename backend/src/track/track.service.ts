import { Injectable } from '@nestjs/common'
import { Track, Comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from '../prisma.service';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
    constructor(
        private prisma: PrismaService,
        private fileService: FileService
    ) { }
    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        return this.prisma.track.create({
            data: {
                ...dto,
                picture: picturePath,
                audio: audioPath
            },

        })
    }
    async getAll(count = 10, offset = 0): Promise<any[]> {
        return this.prisma.track.findMany({
            include: {
                comments: true
            },
        })
    }
    async getById(id: number): Promise<Track> {
        return this.prisma.track.findUnique({
            where: {
                id
            },
            include: {
                comments: true
            }
        })
    }
    async searchByQuery(query: string): Promise<Track[]> {
        return this.prisma.track.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { artist: { contains: query } },
                ]
            }
        })
    }
    async delete(id: number) {
        return this.prisma.track.delete({
            where: {
                id
            }
        })
    }
    async addComment(dto: CreateCommentDto): Promise<Comment> {
        return this.prisma.comment.create({
            data: {
                ...dto
            }
        })


    }
}