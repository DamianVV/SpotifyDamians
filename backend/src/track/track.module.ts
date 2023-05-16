import { Module } from '@nestjs/common'
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FileService } from '../file/file.service';
import { PrismaService } from '../prisma.service';
@Module({
    controllers: [TrackController],
    providers: [TrackService, PrismaService, FileService]
})
export class TrackModule {

}