# NestJS Blog Backend - Project Plan

> **Project Type:** BACKEND (API only)
> **Created:** 2026-01-25
> **Status:** PLANNING

---

## Overview

Build a personal blog backend API using NestJS and PostgreSQL. The system will provide RESTful endpoints for managing blog content (posts, pages, categories, tags), a simple comment system, and single-user JWT authentication. The API will support public read access while requiring authentication for write operations.

### Key Features

- **Content Management:** Posts, Pages, Categories, Tags with draft/published workflow
- **Comments:** Simple public comment system
- **Authentication:** Single admin user with JWT
- **Search:** Full-text search using PostgreSQL capabilities
- **SEO:** Metadata support (slug, meta description, keywords)
- **Security:** Rate limiting, API versioning

---

## Success Criteria

| Criteria                             | Measurement                               |
| ------------------------------------ | ----------------------------------------- |
| All CRUD endpoints working           | Postman/Thunder Client test suite passes  |
| JWT auth protecting write operations | Unauthorized requests return 401          |
| Public read access                   | GET endpoints work without auth           |
| Full-text search                     | Search returns relevant results in <200ms |
| Rate limiting active                 | Excessive requests return 429             |
| Docker deployment                    | `docker-compose up` starts full stack     |
| API versioning                       | `/api/v1/` prefix on all routes           |
| Database migrations                  | TypeORM migrations run successfully       |

---

## Tech Stack

| Layer             | Technology                          | Rationale                                   |
| ----------------- | ----------------------------------- | ------------------------------------------- |
| **Framework**     | NestJS 10+                          | TypeScript-first, modular, enterprise-ready |
| **Database**      | PostgreSQL 15+                      | Full-text search, JSONB, reliability        |
| **ORM**           | TypeORM                             | User preference, NestJS native support      |
| **Auth**          | Passport + JWT                      | NestJS standard, stateless authentication   |
| **Validation**    | class-validator + class-transformer | DTO validation, transformation              |
| **Docs**          | Swagger/OpenAPI                     | Auto-generated API documentation            |
| **Rate Limiting** | @nestjs/throttler                   | Built-in NestJS throttling                  |
| **Testing**       | Jest + Supertest                    | Unit + E2E testing                          |
| **Container**     | Docker + docker-compose             | Development and deployment consistency      |

---

## File Structure

```
blog/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module
│   │
│   ├── config/                          # Configuration
│   │   ├── configuration.ts             # Environment config
│   │   ├── database.config.ts           # TypeORM config
│   │   └── swagger.config.ts            # Swagger setup
│   │
│   ├── common/                          # Shared utilities
│   │   ├── decorators/                  # Custom decorators
│   │   │   ├── public.decorator.ts      # Mark routes as public
│   │   │   └── api-version.decorator.ts # Versioning decorator
│   │   ├── filters/                     # Exception filters
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/                      # Auth guards
│   │   │   └── jwt-auth.guard.ts
│   │   ├── interceptors/                # Response interceptors
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/                       # Validation pipes
│   │   │   └── validation.pipe.ts
│   │   └── dto/                         # Shared DTOs
│   │       └── pagination.dto.ts
│   │
│   ├── modules/
│   │   ├── auth/                        # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── auth-response.dto.ts
│   │   │
│   │   ├── users/                       # User module (single admin)
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── dto/
│   │   │       └── update-user.dto.ts
│   │   │
│   │   ├── posts/                       # Blog posts module
│   │   │   ├── posts.module.ts
│   │   │   ├── posts.controller.ts
│   │   │   ├── posts.service.ts
│   │   │   ├── entities/
│   │   │   │   └── post.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-post.dto.ts
│   │   │       ├── update-post.dto.ts
│   │   │       └── post-query.dto.ts
│   │   │
│   │   ├── pages/                       # Static pages module
│   │   │   ├── pages.module.ts
│   │   │   ├── pages.controller.ts
│   │   │   ├── pages.service.ts
│   │   │   ├── entities/
│   │   │   │   └── page.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-page.dto.ts
│   │   │       └── update-page.dto.ts
│   │   │
│   │   ├── categories/                  # Categories module
│   │   │   ├── categories.module.ts
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   ├── entities/
│   │   │   │   └── category.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-category.dto.ts
│   │   │       └── update-category.dto.ts
│   │   │
│   │   ├── tags/                        # Tags module
│   │   │   ├── tags.module.ts
│   │   │   ├── tags.controller.ts
│   │   │   ├── tags.service.ts
│   │   │   ├── entities/
│   │   │   │   └── tag.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-tag.dto.ts
│   │   │       └── update-tag.dto.ts
│   │   │
│   │   ├── comments/                    # Comments module
│   │   │   ├── comments.module.ts
│   │   │   ├── comments.controller.ts
│   │   │   ├── comments.service.ts
│   │   │   ├── entities/
│   │   │   │   └── comment.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-comment.dto.ts
│   │   │       └── update-comment.dto.ts
│   │   │
│   │   └── search/                      # Full-text search module
│   │       ├── search.module.ts
│   │       ├── search.controller.ts
│   │       ├── search.service.ts
│   │       └── dto/
│   │           └── search-query.dto.ts
│   │
│   └── database/
│       ├── migrations/                  # TypeORM migrations
│       └── seeds/                       # Database seeders
│           └── admin-user.seed.ts
│
├── test/
│   ├── app.e2e-spec.ts                  # E2E tests
│   └── jest-e2e.json
│
├── docker/
│   └── Dockerfile
│
├── .env.example                         # Environment template
├── docker-compose.yml                   # Docker orchestration
├── nest-cli.json                        # NestJS CLI config
├── package.json
├── tsconfig.json
└── README.md
```

---

## Task Breakdown

### Phase 1: Foundation (P0)

#### Task 1.1: Project Initialization

| Field            | Value                                      |
| ---------------- | ------------------------------------------ |
| **Agent**        | `backend-specialist`                       |
| **Skills**       | `nodejs-best-practices`, `clean-code`      |
| **Priority**     | P0 - Critical                              |
| **Dependencies** | None                                       |
| **INPUT**        | Empty project directory                    |
| **OUTPUT**       | NestJS project with dependencies installed |
| **VERIFY**       | `npm run start:dev` runs without errors    |

**Subtasks:**

- [ ] Initialize NestJS project with strict TypeScript
- [ ] Install core dependencies (TypeORM, pg, passport, jwt, class-validator, swagger, throttler)
- [ ] Configure ESLint + Prettier
- [ ] Create `.env.example` with all required variables

---

#### Task 1.2: Database Configuration

| Field            | Value                                         |
| ---------------- | --------------------------------------------- |
| **Agent**        | `database-architect`                          |
| **Skills**       | `database-design`, `nodejs-best-practices`    |
| **Priority**     | P0 - Critical                                 |
| **Dependencies** | Task 1.1                                      |
| **INPUT**        | NestJS project                                |
| **OUTPUT**       | TypeORM configured with PostgreSQL connection |
| **VERIFY**       | Database connection successful on startup     |

**Subtasks:**

- [ ] Create `database.config.ts` with TypeORM configuration
- [ ] Configure environment-based connection settings
- [ ] Set up migration configuration
- [ ] Create initial migration directory structure

---

#### Task 1.3: Docker Setup

| Field            | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| **Agent**        | `devops-engineer`                                        |
| **Skills**       | `deployment-procedures`                                  |
| **Priority**     | P0 - Critical                                            |
| **Dependencies** | Task 1.2                                                 |
| **INPUT**        | Project with database config                             |
| **OUTPUT**       | Docker + docker-compose configuration                    |
| **VERIFY**       | `docker-compose up -d` starts PostgreSQL and can connect |

**Subtasks:**

- [ ] Create `Dockerfile` for NestJS app
- [ ] Create `docker-compose.yml` with PostgreSQL service
- [ ] Configure volumes for data persistence
- [ ] Add health checks for services

---

### Phase 2: Core Infrastructure (P1)

#### Task 2.1: Common Utilities

| Field            | Value                                           |
| ---------------- | ----------------------------------------------- |
| **Agent**        | `backend-specialist`                            |
| **Skills**       | `api-patterns`, `clean-code`                    |
| **Priority**     | P1 - High                                       |
| **Dependencies** | Task 1.1                                        |
| **INPUT**        | Initialized project                             |
| **OUTPUT**       | Common decorators, filters, interceptors, pipes |
| **VERIFY**       | All utilities importable and documented         |

**Subtasks:**

- [ ] Create `@Public()` decorator for public routes
- [ ] Create global exception filter with standardized error format
- [ ] Create transform interceptor for response wrapping
- [ ] Create pagination DTO with validation
- [ ] Set up global validation pipe

---

#### Task 2.2: API Versioning Setup

| Field            | Value                                            |
| ---------------- | ------------------------------------------------ |
| **Agent**        | `backend-specialist`                             |
| **Skills**       | `api-patterns`                                   |
| **Priority**     | P1 - High                                        |
| **Dependencies** | Task 2.1                                         |
| **INPUT**        | Common utilities                                 |
| **OUTPUT**       | API versioning configured with `/api/v1/` prefix |
| **VERIFY**       | Routes accessible at `/api/v1/` prefix           |

**Subtasks:**

- [ ] Configure global route prefix
- [ ] Set up URI versioning strategy
- [ ] Document versioning approach in README

---

#### Task 2.3: Swagger/OpenAPI Configuration

| Field            | Value                                     |
| ---------------- | ----------------------------------------- |
| **Agent**        | `backend-specialist`                      |
| **Skills**       | `api-patterns`, `documentation-templates` |
| **Priority**     | P1 - High                                 |
| **Dependencies** | Task 2.2                                  |
| **INPUT**        | Versioned API setup                       |
| **OUTPUT**       | Swagger UI accessible at `/api/docs`      |
| **VERIFY**       | Swagger UI loads with API documentation   |

**Subtasks:**

- [ ] Create `swagger.config.ts`
- [ ] Configure Swagger module in app bootstrap
- [ ] Add JWT bearer auth to Swagger
- [ ] Set up API tags for grouping endpoints

---

#### Task 2.4: Rate Limiting

| Field            | Value                                           |
| ---------------- | ----------------------------------------------- |
| **Agent**        | `security-auditor`                              |
| **Skills**       | `vulnerability-scanner`, `api-patterns`         |
| **Priority**     | P1 - High                                       |
| **Dependencies** | Task 2.1                                        |
| **INPUT**        | Common utilities                                |
| **OUTPUT**       | Rate limiting active on all endpoints           |
| **VERIFY**       | Excessive requests return 429 Too Many Requests |

**Subtasks:**

- [ ] Configure ThrottlerModule globally
- [ ] Set reasonable limits (e.g., 100 requests/minute)
- [ ] Add custom throttler guard
- [ ] Document rate limits in API docs

---

### Phase 3: Authentication (P1)

#### Task 3.1: User Entity & Module

| Field            | Value                                    |
| ---------------- | ---------------------------------------- |
| **Agent**        | `backend-specialist`                     |
| **Skills**       | `database-design`, `api-patterns`        |
| **Priority**     | P1 - High                                |
| **Dependencies** | Task 1.2                                 |
| **INPUT**        | Database configuration                   |
| **OUTPUT**       | User entity with hashed password storage |
| **VERIFY**       | User table created via migration         |

**Subtasks:**

- [ ] Create User entity with email, password, name fields
- [ ] Implement password hashing with bcrypt
- [ ] Create UsersService with findByEmail method
- [ ] Create migration for users table

---

#### Task 3.2: JWT Authentication

| Field            | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Agent**        | `security-auditor`                                      |
| **Skills**       | `vulnerability-scanner`, `api-patterns`                 |
| **Priority**     | P1 - High                                               |
| **Dependencies** | Task 3.1                                                |
| **INPUT**        | User module                                             |
| **OUTPUT**       | JWT-based authentication with login endpoint            |
| **VERIFY**       | Login returns valid JWT, protected routes require token |

**Subtasks:**

- [ ] Create LocalStrategy for username/password validation
- [ ] Create JwtStrategy for token validation
- [ ] Create AuthController with login endpoint
- [ ] Create global JwtAuthGuard (default protect all routes)
- [ ] Configure JWT secret and expiration from environment

---

#### Task 3.3: Admin User Seeder

| Field            | Value                                   |
| ---------------- | --------------------------------------- |
| **Agent**        | `backend-specialist`                    |
| **Skills**       | `database-design`                       |
| **Priority**     | P1 - High                               |
| **Dependencies** | Task 3.2                                |
| **INPUT**        | Auth module complete                    |
| **OUTPUT**       | Seed command to create admin user       |
| **VERIFY**       | `npm run seed:admin` creates admin user |

**Subtasks:**

- [ ] Create admin user seeder script
- [ ] Read admin credentials from environment
- [ ] Add npm script for seeding
- [ ] Document initial setup in README

---

### Phase 4: Content Modules (P1)

#### Task 4.1: Categories Module

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **Agent**        | `backend-specialist`                                                  |
| **Skills**       | `api-patterns`, `clean-code`                                          |
| **Priority**     | P1 - High                                                             |
| **Dependencies** | Task 3.2                                                              |
| **INPUT**        | Auth module                                                           |
| **OUTPUT**       | CRUD endpoints for categories                                         |
| **VERIFY**       | All CRUD operations work, GET is public, POST/PUT/DELETE require auth |

**Subtasks:**

- [ ] Create Category entity (id, name, slug, description)
- [ ] Create DTOs with validation
- [ ] Create CategoriesController with CRUD endpoints
- [ ] Apply @Public() to GET endpoints
- [ ] Create migration

---

#### Task 4.2: Tags Module

| Field            | Value                                        |
| ---------------- | -------------------------------------------- |
| **Agent**        | `backend-specialist`                         |
| **Skills**       | `api-patterns`, `clean-code`                 |
| **Priority**     | P1 - High                                    |
| **Dependencies** | Task 3.2                                     |
| **INPUT**        | Auth module                                  |
| **OUTPUT**       | CRUD endpoints for tags                      |
| **VERIFY**       | All CRUD operations work, public read access |

**Subtasks:**

- [ ] Create Tag entity (id, name, slug)
- [ ] Create DTOs with validation
- [ ] Create TagsController with CRUD endpoints
- [ ] Apply @Public() to GET endpoints
- [ ] Create migration

---

#### Task 4.3: Posts Module

| Field            | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| **Agent**        | `backend-specialist`                                           |
| **Skills**       | `api-patterns`, `database-design`, `clean-code`                |
| **Priority**     | P1 - High                                                      |
| **Dependencies** | Task 4.1, Task 4.2                                             |
| **INPUT**        | Categories and Tags modules                                    |
| **OUTPUT**       | Full posts CRUD with relationships, draft/published, SEO       |
| **VERIFY**       | Posts CRUD works with category/tag relations, status filtering |

**Subtasks:**

- [ ] Create Post entity with all fields:
  - id, title, slug, content, excerpt
  - status (draft/published), publishedAt
  - SEO: metaTitle, metaDescription, metaKeywords
  - Relations: category (ManyToOne), tags (ManyToMany), author (ManyToOne)
- [ ] Create DTOs with validation
- [ ] Create PostsController with:
  - GET /posts (public, only published)
  - GET /posts/:slug (public, only published)
  - GET /posts/admin/all (auth, all posts)
  - POST/PUT/DELETE (auth)
- [ ] Implement filtering by category, tag, status
- [ ] Add pagination support
- [ ] Create migration with relationships

---

#### Task 4.4: Pages Module

| Field            | Value                                        |
| ---------------- | -------------------------------------------- |
| **Agent**        | `backend-specialist`                         |
| **Skills**       | `api-patterns`, `clean-code`                 |
| **Priority**     | P1 - High                                    |
| **Dependencies** | Task 3.2                                     |
| **INPUT**        | Auth module                                  |
| **OUTPUT**       | CRUD endpoints for static pages              |
| **VERIFY**       | Pages CRUD works with draft/published status |

**Subtasks:**

- [ ] Create Page entity (id, title, slug, content, status, SEO fields)
- [ ] Create DTOs with validation
- [ ] Create PagesController with CRUD
- [ ] Public read (only published), auth for write
- [ ] Create migration

---

#### Task 4.5: Comments Module

| Field            | Value                                                |
| ---------------- | ---------------------------------------------------- |
| **Agent**        | `backend-specialist`                                 |
| **Skills**       | `api-patterns`, `clean-code`                         |
| **Priority**     | P1 - High                                            |
| **Dependencies** | Task 4.3                                             |
| **INPUT**        | Posts module                                         |
| **OUTPUT**       | Simple comment system for posts                      |
| **VERIFY**       | Comments can be created publicly, admin can moderate |

**Subtasks:**

- [ ] Create Comment entity:
  - id, authorName, authorEmail, content
  - status (pending/approved/rejected)
  - post relation (ManyToOne)
  - createdAt
- [ ] Create DTOs with validation (email format, content length)
- [ ] Create CommentsController:
  - POST /posts/:postId/comments (public, creates pending)
  - GET /posts/:postId/comments (public, only approved)
  - GET /comments/admin/pending (auth)
  - PATCH /comments/:id/approve (auth)
  - DELETE /comments/:id (auth)
- [ ] Create migration

---

### Phase 5: Search (P2)

#### Task 5.1: Full-Text Search

| Field            | Value                                                 |
| ---------------- | ----------------------------------------------------- |
| **Agent**        | `backend-specialist`                                  |
| **Skills**       | `database-design`, `api-patterns`                     |
| **Priority**     | P2 - Medium                                           |
| **Dependencies** | Task 4.3, Task 4.4                                    |
| **INPUT**        | Posts and Pages modules                               |
| **OUTPUT**       | Full-text search across posts and pages               |
| **VERIFY**       | Search returns relevant results, response time <200ms |

**Subtasks:**

- [ ] Add PostgreSQL full-text search columns (tsvector) to posts/pages
- [ ] Create search index migration
- [ ] Create SearchService with search query builder
- [ ] Create SearchController with GET /search endpoint
- [ ] Implement result ranking and highlighting
- [ ] Add search to Swagger docs

---

### Phase 6: Testing (P3)

#### Task 6.1: Unit Tests

| Field            | Value                                             |
| ---------------- | ------------------------------------------------- |
| **Agent**        | `test-engineer`                                   |
| **Skills**       | `testing-patterns`, `tdd-workflow`                |
| **Priority**     | P3 - Normal                                       |
| **Dependencies** | Phase 4 complete                                  |
| **INPUT**        | All modules implemented                           |
| **OUTPUT**       | Unit tests for services with >80% coverage        |
| **VERIFY**       | `npm run test` passes, coverage report shows >80% |

**Subtasks:**

- [ ] Write unit tests for AuthService
- [ ] Write unit tests for PostsService
- [ ] Write unit tests for CommentsService
- [ ] Write unit tests for SearchService
- [ ] Configure coverage thresholds

---

#### Task 6.2: E2E Tests

| Field            | Value                                |
| ---------------- | ------------------------------------ |
| **Agent**        | `test-engineer`                      |
| **Skills**       | `testing-patterns`, `webapp-testing` |
| **Priority**     | P3 - Normal                          |
| **Dependencies** | Task 6.1                             |
| **INPUT**        | Unit tests passing                   |
| **OUTPUT**       | E2E tests for critical flows         |
| **VERIFY**       | `npm run test:e2e` passes            |

**Subtasks:**

- [ ] Set up E2E test database configuration
- [ ] Write E2E tests for auth flow
- [ ] Write E2E tests for posts CRUD
- [ ] Write E2E tests for public vs authenticated access
- [ ] Write E2E tests for rate limiting

---

### Phase 7: Documentation & Polish (P3)

#### Task 7.1: README Documentation

| Field            | Value                                             |
| ---------------- | ------------------------------------------------- |
| **Agent**        | `documentation-writer`                            |
| **Skills**       | `documentation-templates`                         |
| **Priority**     | P3 - Normal                                       |
| **Dependencies** | All phases complete                               |
| **INPUT**        | Complete project                                  |
| **OUTPUT**       | Comprehensive README.md                           |
| **VERIFY**       | New developer can set up project following README |

**Subtasks:**

- [ ] Document project overview and features
- [ ] Write installation/setup instructions
- [ ] Document environment variables
- [ ] Add API endpoint documentation overview
- [ ] Include Docker instructions
- [ ] Add troubleshooting section

---

## API Endpoints Summary

| Endpoint                         | Method | Auth | Description                  |
| -------------------------------- | ------ | ---- | ---------------------------- |
| `/api/v1/auth/login`             | POST   | No   | Login, returns JWT           |
| `/api/v1/posts`                  | GET    | No   | List published posts         |
| `/api/v1/posts/:slug`            | GET    | No   | Get single published post    |
| `/api/v1/posts/admin/all`        | GET    | Yes  | List all posts (inc. drafts) |
| `/api/v1/posts`                  | POST   | Yes  | Create post                  |
| `/api/v1/posts/:id`              | PUT    | Yes  | Update post                  |
| `/api/v1/posts/:id`              | DELETE | Yes  | Delete post                  |
| `/api/v1/pages`                  | GET    | No   | List published pages         |
| `/api/v1/pages/:slug`            | GET    | No   | Get single page              |
| `/api/v1/pages`                  | POST   | Yes  | Create page                  |
| `/api/v1/pages/:id`              | PUT    | Yes  | Update page                  |
| `/api/v1/pages/:id`              | DELETE | Yes  | Delete page                  |
| `/api/v1/categories`             | GET    | No   | List categories              |
| `/api/v1/categories`             | POST   | Yes  | Create category              |
| `/api/v1/categories/:id`         | PUT    | Yes  | Update category              |
| `/api/v1/categories/:id`         | DELETE | Yes  | Delete category              |
| `/api/v1/tags`                   | GET    | No   | List tags                    |
| `/api/v1/tags`                   | POST   | Yes  | Create tag                   |
| `/api/v1/tags/:id`               | PUT    | Yes  | Update tag                   |
| `/api/v1/tags/:id`               | DELETE | Yes  | Delete tag                   |
| `/api/v1/posts/:postId/comments` | GET    | No   | List approved comments       |
| `/api/v1/posts/:postId/comments` | POST   | No   | Submit comment (pending)     |
| `/api/v1/comments/admin/pending` | GET    | Yes  | List pending comments        |
| `/api/v1/comments/:id/approve`   | PATCH  | Yes  | Approve comment              |
| `/api/v1/comments/:id`           | DELETE | Yes  | Delete comment               |
| `/api/v1/search`                 | GET    | No   | Full-text search             |

---

## Entity Relationships

```
USER ||--o{ POST : writes
POST }o--|| CATEGORY : belongs_to
POST }o--o{ TAG : has_many
POST ||--o{ COMMENT : has_many

USER {
    uuid id PK
    string email UK
    string password
    string name
    timestamp createdAt
    timestamp updatedAt
}

POST {
    uuid id PK
    string title
    string slug UK
    text content
    text excerpt
    string status
    timestamp publishedAt
    string metaTitle
    string metaDescription
    string metaKeywords
    uuid authorId FK
    uuid categoryId FK
    timestamp createdAt
    timestamp updatedAt
}

PAGE {
    uuid id PK
    string title
    string slug UK
    text content
    string status
    string metaTitle
    string metaDescription
    timestamp createdAt
    timestamp updatedAt
}

CATEGORY {
    uuid id PK
    string name UK
    string slug UK
    text description
    timestamp createdAt
}

TAG {
    uuid id PK
    string name UK
    string slug UK
    timestamp createdAt
}

COMMENT {
    uuid id PK
    string authorName
    string authorEmail
    text content
    string status
    uuid postId FK
    timestamp createdAt
}
```

---

## Phase X: Verification Checklist

> **DO NOT mark project complete until ALL checks pass.**

### Automated Verification

```bash
# P0: Lint & Type Check
npm run lint && npx tsc --noEmit

# P0: Security Scan
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .

# P0: Build
npm run build

# P1: Unit Tests
npm run test

# P1: E2E Tests
npm run test:e2e

# P2: Start and verify
docker-compose up -d
# Wait for services...
curl http://localhost:3000/api/v1/health
```

### Manual Verification

- [ ] Login endpoint returns JWT token
- [ ] Protected endpoints return 401 without token
- [ ] Public GET endpoints work without auth
- [ ] Rate limiting returns 429 after threshold
- [ ] Swagger UI loads at `/api/docs`
- [ ] Full-text search returns relevant results
- [ ] Comments require moderation before appearing
- [ ] Draft posts not visible on public endpoints

### Rule Compliance

- [ ] All code follows clean-code principles
- [ ] No hardcoded secrets (all from environment)
- [ ] API responses follow consistent format
- [ ] All DTOs have proper validation

---

## Estimated Timeline

| Phase                        | Duration  | Cumulative |
| ---------------------------- | --------- | ---------- |
| Phase 1: Foundation          | 2 hours   | 2 hours    |
| Phase 2: Core Infrastructure | 1.5 hours | 3.5 hours  |
| Phase 3: Authentication      | 1.5 hours | 5 hours    |
| Phase 4: Content Modules     | 4 hours   | 9 hours    |
| Phase 5: Search              | 1 hour    | 10 hours   |
| Phase 6: Testing             | 2 hours   | 12 hours   |
| Phase 7: Documentation       | 1 hour    | 13 hours   |

**Total Estimated Time:** ~13 hours

---

## Risk Mitigation

| Risk                         | Mitigation                                                 |
| ---------------------------- | ---------------------------------------------------------- |
| TypeORM relation complexity  | Start with simple entities, add relations incrementally    |
| Full-text search performance | Add proper indexes, test with realistic data volume        |
| JWT security                 | Use environment secrets, implement token refresh if needed |
| Rate limiting bypass         | Apply at global level, monitor logs                        |

---

## Next Steps

1. Review this plan and suggest any modifications
2. Run `/create` to start implementation
3. Follow phase order: Foundation -> Auth -> Content -> Search -> Tests -> Docs

---

> **Plan Version:** 1.0
> **Last Updated:** 2026-01-25
