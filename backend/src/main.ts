import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        app.setGlobalPrefix('api');
        await app.listen(PORT, () => console.log(`[INFO] Server started on PORT ${PORT}`))
    } catch (e) {

    }
}
start()