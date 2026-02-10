# Personal Blog Backend API

A RESTful API for a personal blog application built with **NestJS** and **PostgreSQL**.

## Features

- ✅ **JWT Authentication** - Single admin user with secure token-based auth
- ✅ **Blog Posts** - Full CRUD with draft/published workflow
- ✅ **Static Pages** - Create and manage pages like About, Contact
- ✅ **Categories** - Organize posts by category
- ✅ **Tags** - Multiple tags per post (many-to-many)
- ✅ **Comments** - Public submission with moderation system
- ✅ **Full-Text Search** - PostgreSQL-powered search across posts and pages
- ✅ **SEO Metadata** - Title, description, keywords for posts and pages
- ✅ **Rate Limiting** - Built-in API throttling
- ✅ **API Versioning** - Prefixed routes (`/api/v1/`)
- ✅ **Swagger Documentation** - Auto-generated API docs
- ✅ **Docker Support** - Docker Compose for development

## Tech Stack

| Component        | Technology        |
| ---------------- | ----------------- |
| Framework        | NestJS 10+        |
| Database         | PostgreSQL 15+    |
| ORM              | TypeORM           |
| Auth             | Passport + JWT    |
| Validation       | class-validator   |
| Documentation    | Swagger/OpenAPI   |
| Rate Limiting    | @nestjs/throttler |
| Containerization | Docker            |

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+ (or Docker)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
```

### Database Setup

**Option 1: Using Docker (Recommended)**

```bash
# Start PostgreSQL container
docker-compose up -d

# Wait for database to be ready
# The app will auto-create tables on first run (synchronize: true in dev)
```

**Option 2: Local PostgreSQL**

```bash
# Create database
createdb blog

# Update .env with your connection details
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Create Admin User

```bash
# Run the seeder script
npm run seed:admin
```

Default credentials (from .env.example):

- Email: `admin@blog.com`
- Password: `Admin@123`

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Authentication

| Method | Endpoint        | Auth | Description              |
| ------ | --------------- | ---- | ------------------------ |
| POST   | `/auth/login`   | No   | Login, returns JWT       |
| GET    | `/auth/profile` | Yes  | Get current user profile |

### Posts

| Method | Endpoint            | Auth | Description                  |
| ------ | ------------------- | ---- | ---------------------------- |
| GET    | `/posts`            | No   | List published posts         |
| GET    | `/posts/slug/:slug` | No   | Get post by slug             |
| GET    | `/posts/:id`        | No   | Get post by ID               |
| GET    | `/posts/admin/all`  | Yes  | List all posts (inc. drafts) |
| POST   | `/posts`            | Yes  | Create a post                |
| PATCH  | `/posts/:id`        | Yes  | Update a post                |
| DELETE | `/posts/:id`        | Yes  | Delete a post                |

### Pages

| Method | Endpoint            | Auth | Description          |
| ------ | ------------------- | ---- | -------------------- |
| GET    | `/pages`            | No   | List published pages |
| GET    | `/pages/slug/:slug` | No   | Get page by slug     |
| GET    | `/pages/:id`        | No   | Get page by ID       |
| GET    | `/pages/admin/all`  | Yes  | List all pages       |
| POST   | `/pages`            | Yes  | Create a page        |
| PATCH  | `/pages/:id`        | Yes  | Update a page        |
| DELETE | `/pages/:id`        | Yes  | Delete a page        |

### Categories

| Method | Endpoint                 | Auth | Description          |
| ------ | ------------------------ | ---- | -------------------- |
| GET    | `/categories`            | No   | List all categories  |
| GET    | `/categories/:id`        | No   | Get category by ID   |
| GET    | `/categories/slug/:slug` | No   | Get category by slug |
| POST   | `/categories`            | Yes  | Create a category    |
| PATCH  | `/categories/:id`        | Yes  | Update a category    |
| DELETE | `/categories/:id`        | Yes  | Delete a category    |

### Tags

| Method | Endpoint           | Auth | Description     |
| ------ | ------------------ | ---- | --------------- |
| GET    | `/tags`            | No   | List all tags   |
| GET    | `/tags/:id`        | No   | Get tag by ID   |
| GET    | `/tags/slug/:slug` | No   | Get tag by slug |
| POST   | `/tags`            | Yes  | Create a tag    |
| PATCH  | `/tags/:id`        | Yes  | Update a tag    |
| DELETE | `/tags/:id`        | Yes  | Delete a tag    |

### Comments

| Method | Endpoint                  | Auth | Description           |
| ------ | ------------------------- | ---- | --------------------- |
| GET    | `/posts/:postId/comments` | No   | Get approved comments |
| POST   | `/posts/:postId/comments` | No   | Submit a comment      |
| GET    | `/comments/admin/pending` | Yes  | List pending comments |
| PATCH  | `/comments/:id/approve`   | Yes  | Approve a comment     |
| PATCH  | `/comments/:id/reject`    | Yes  | Reject a comment      |
| DELETE | `/comments/:id`           | Yes  | Delete a comment      |

### Search

| Method | Endpoint          | Auth | Description      |
| ------ | ----------------- | ---- | ---------------- |
| GET    | `/search?q=query` | No   | Full-text search |

## API Documentation

Swagger UI is available at: `http://localhost:3000/api/docs`

## Environment Variables

| Variable         | Description                | Default                 |
| ---------------- | -------------------------- | ----------------------- |
| `NODE_ENV`       | Environment                | development             |
| `PORT`           | Server port                | 3000                    |
| `API_PREFIX`     | API prefix                 | api                     |
| `API_VERSION`    | API version                | v1                      |
| `DB_HOST`        | Database host              | localhost               |
| `DB_PORT`        | Database port              | 5432                    |
| `DB_USERNAME`    | Database user              | postgres                |
| `DB_PASSWORD`    | Database password          | postgres                |
| `DB_NAME`        | Database name              | blog                    |
| `JWT_SECRET`     | JWT secret key             | (change in production!) |
| `JWT_EXPIRES_IN` | Token expiration           | 7d                      |
| `THROTTLE_TTL`   | Rate limit window (ms)     | 60000                   |
| `THROTTLE_LIMIT` | Requests per window        | 100                     |
| `ADMIN_EMAIL`    | Admin email for seeding    | admin@blog.com          |
| `ADMIN_PASSWORD` | Admin password for seeding | Admin@123               |
| `ADMIN_NAME`     | Admin name                 | Admin                   |

## Project Structure

```
src/
├── config/              # Configuration files
├── common/              # Shared utilities
│   ├── decorators/      # Custom decorators
│   ├── dto/             # Shared DTOs
│   ├── filters/         # Exception filters
│   └── interceptors/    # Response interceptors
├── modules/
│   ├── auth/            # Authentication
│   ├── users/           # User management
│   ├── posts/           # Blog posts
│   ├── pages/           # Static pages
│   ├── categories/      # Categories
│   ├── tags/            # Tags
│   ├── comments/        # Comments
│   └── search/          # Full-text search
├── database/
│   └── seeds/           # Database seeders
├── app.module.ts        # Root module
└── main.ts              # Entry point
```

## Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Docker

```bash
# Start PostgreSQL only
docker-compose up -d

# Build and run everything (uncomment api service in docker-compose.yml)
docker-compose up -d --build
```

## Scripts

| Script               | Description               |
| -------------------- | ------------------------- |
| `npm run start:dev`  | Start in development mode |
| `npm run build`      | Build for production      |
| `npm run start:prod` | Start in production mode  |
| `npm run format`     | Format code with Prettier |
| `npm run lint`       | Lint code with ESLint     |
| `npm run test`       | Run unit tests            |
| `npm run test:e2e`   | Run E2E tests             |
| `npm run seed:admin` | Create admin user         |

## License

UNLICENSED
