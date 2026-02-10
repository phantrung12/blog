import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'blog',
  });

  await dataSource.initialize();

  const email = process.env.ADMIN_EMAIL || 'admin@blog.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';
  const name = process.env.ADMIN_NAME || 'Admin';

  // Check if admin already exists
  const existingUser = await dataSource.query(
    'SELECT id FROM users WHERE email = $1',
    [email],
  );

  if (existingUser.length > 0) {
    console.log(`⚠️  Admin user already exists: ${email}`);
    await dataSource.destroy();
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert admin user
  await dataSource.query(
    `INSERT INTO users (id, email, password, name, "createdAt", "updatedAt") 
     VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())`,
    [email, hashedPassword, name],
  );

  console.log(`✅ Admin user created successfully!`);
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
