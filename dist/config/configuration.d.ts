declare const _default: () => {
    nodeEnv: string;
    port: number;
    apiPrefix: string;
    apiVersion: string;
    database: {
        url: string | undefined;
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    admin: {
        email: string;
        password: string;
        name: string;
    };
};
export default _default;
