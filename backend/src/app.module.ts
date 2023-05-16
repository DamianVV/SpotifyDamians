
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
@Module({
    imports: [TrackModule, FileModule, AlbumModule, ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
    }),]
})
export class AppModule {

}