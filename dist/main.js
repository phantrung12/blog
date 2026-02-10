"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const apiPrefix = configService.get('apiPrefix') || 'api';
    const apiVersion = configService.get('apiVersion') || 'v1';
    app.setGlobalPrefix(`${apiPrefix}`);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    (0, swagger_config_1.setupSwagger)(app);
    const port = configService.get('port') || 8080;
    await app.listen(port);
    console.log(`🚀 Blog API is running on: http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
    console.log(`🔒 API prefix: /${apiPrefix}/${apiVersion}`);
}
bootstrap()
    .then(() => {
    console.log('🚀 Blog API is running on: http://localhost:8080');
    console.log('📚 Swagger docs: http://localhost:8080/api/docs');
    console.log('🔒 API prefix: /api/v1');
})
    .catch((error) => {
    console.error('❌ Blog API failed to start:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map