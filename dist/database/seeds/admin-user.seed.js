"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function seed() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
    });
    await dataSource.initialize();
    const email = process.env.ADMIN_EMAIL || 'admin@blog.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';
    const name = process.env.ADMIN_NAME || 'Admin';
    const existingUser = await dataSource.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.length > 0) {
        console.log(`⚠️  Admin user already exists: ${email}`);
        await dataSource.destroy();
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await dataSource.query(`INSERT INTO users (id, email, password, name, "createdAt", "updatedAt") 
     VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())`, [email, hashedPassword, name]);
    console.log(`✅ Admin user created successfully!`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    await dataSource.destroy();
}
seed().catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
});
//# sourceMappingURL=admin-user.seed.js.map