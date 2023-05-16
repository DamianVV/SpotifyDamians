
import { Module } from '@nestjs/common'
import { FileService } from '../file/file.service';
import { PrismaService } from '../prisma.service';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
@Module({
    controllers: [AlbumController],
    providers: [AlbumService, PrismaService, FileService]
})
export class AlbumModule {

}