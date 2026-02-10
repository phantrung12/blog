"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const app_module_js_1 = require("./app.module.js");
const swagger_config_js_1 = require("./config/swagger.config.js");
const expressApp = (0, express_1.default)();
let cachedApp;
async function bootstrapServer() {
    if (cachedApp) {
        return cachedApp;
    }
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const apiPrefix = configService.get('apiPrefix') || 'api';
    app.setGlobalPrefix(apiPrefix);
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
    (0, swagger_config_js_1.setupSwagger)(app);
    await app.init();
    cachedApp = app;
    return app;
}
async function handler(req, res) {
    await bootstrapServer();
    expressApp(req, res);
}
//# sourceMappingURL=serverless.js.map