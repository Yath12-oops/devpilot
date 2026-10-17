# DevPilot

An AI co-pilot that lets you **chat with your GitHub codebases**. Ask questions in plain English
and get answers grounded in your own code, with file and line references.

Built with **Java + Spring Boot + RAG (Retrieval-Augmented Generation) + Generative AI** on the
backend and **Next.js** on the frontend.

---

## How it works

1. **Sign in with GitHub** — OAuth2 login. The backend upserts the user and stores the GitHub
   access token **encrypted at rest**.
2. **Index a repository** — background workers traverse the Git tree, parse and chunk the code,
   create embeddings with OpenAI, and store the vectors in **PostgreSQL + pgvector**.
3. **Ask a question** — the most relevant code chunks are retrieved with cosine similarity, and the
   model answers using only that context, streamed token-by-token to the client over **SSE**.

```
┌────────────┐   OAuth2    ┌──────────────────────────┐   embeddings   ┌───────────────────┐
│  Next.js   │ ──────────▶ │  Spring Boot (REST/SSE)  │ ─────────────▶ │  OpenAI           │
│  client    │ ◀────────── │  RAG pipeline + workers  │ ◀───────────── │  chat + embeddings│
└────────────┘   tokens    └────────────┬─────────────┘                └───────────────────┘
                                        │ vectors / similarity search
                                        ▼
                              ┌────────────────────────┐
                              │  PostgreSQL + pgvector │
                              └────────────────────────┘
```

---

## Tech stack

| Layer        | Technology                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------- |
| Backend      | Java 17, Spring Boot 4, Spring Web MVC, Spring Data JPA, Spring Security + OAuth2 Client     |
| AI / RAG     | Spring AI (`gpt-4o-mini` for chat, `text-embedding-3-small` for embeddings), OpenAI           |
| Database     | PostgreSQL 16 + `pgvector` (cosine similarity vector search)                                  |
| Auth         | GitHub OAuth2, HTTP-only session cookie                                                       |
| Frontend     | Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, shadcn/ui           |
| Client state | TanStack React Query, `next-themes`                                                           |
| Infra        | Docker / Docker Compose                                                                       |
| Build        | Maven (`mvnw` wrapper), npm                                                                   |

---

## Repository structure

```
.
├── backend/                         # Spring Boot application
│   ├── src/main/java/devPilot/backend/
│   │   ├── config/                  # security, CORS, encryption, async/rest-client beans
│   │   ├── controllers/             # REST controllers (auth, ...)
│   │   ├── dto/                     # request/response records
│   │   ├── entity/                  # JPA entities
│   │   ├── exceptions/              # custom exceptions + global handler
│   │   ├── repository/              # Spring Data repositories
│   │   ├── security/                # OAuth2 user service, current-user resolver
│   │   └── services/                # business logic
│   ├── src/main/resources/          # application.properties
│   └── pom.xml
├── client/                          # Next.js frontend
│   ├── app/                         # App Router pages
│   ├── components/                  # UI + providers (shadcn/ui)
│   ├── hooks/                       # custom React hooks
│   └── package.json
├── docker/postgres/init-extensions.sql
└── docker-compose.yml
```

---

## Prerequisites

- **Java 17+**
- **Node.js 20+** and npm
- **Docker** (for PostgreSQL + pgvector)
- A **GitHub OAuth App** (client id + secret)
- An **OpenAI API key**

---

## Getting started

### 1. Clone

```bash
git clone https://github.com/Yath12-oops/devpilot.git
cd devpilot
```

### 2. Start PostgreSQL (with pgvector)

```bash
docker compose up -d
```

This starts Postgres on host port `5433` (database `devpilot`, user/password `postgres`) and loads
the `vector` extension via `docker/postgres/init-extensions.sql`.

### 3. Configure the backend

Backend configuration lives in `backend/src/main/resources/application.properties`. Every property
has a sensible local default and can be overridden with environment variables:

| Variable                  | Purpose                                            | Default (dev)                                    |
| ------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `DB_URL`                  | JDBC URL                                           | `jdbc:postgresql://localhost:5433/devpilot`      |
| `DB_USERNAME`             | DB user                                            | `postgres`                                        |
| `DB_PASSWORD`             | DB password                                        | `postgres`                                        |
| `GITHUB_CLIENT_ID`        | GitHub OAuth App client id                         | —                                                |
| `GITHUB_CLIENT_SECRET`    | GitHub OAuth App client secret                     | —                                                |
| `OPENAI_API_KEY`          | OpenAI API key                                     | —                                                |
| `TOKEN_ENCRYPTION_KEY`    | Key used to encrypt GitHub access tokens           | `change-me-...`                                  |
| `TOKEN_ENCRYPTION_SALT`   | Hex salt for token encryption                      | `5c0744940b5c369b`                               |
| `FRONTEND_URL`            | Frontend origin (OAuth redirect target)            | `http://localhost:3000`                          |
| `CORS_ALLOWED_ORIGINS`    | Comma-separated allowed CORS origins               | `http://localhost:3000`                          |

> ⚠️ **Never commit real secrets.** Provide them through environment variables (or a local,
> git-ignored file). The `application.properties` committed to this repo contains only development
> placeholders.

### 4. Run the backend

```bash
cd backend
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

The API starts on `http://localhost:8080`.

### 5. Run the client

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## API

| Method | Endpoint                     | Description                                      |
| ------ | ---------------------------- | ------------------------------------------------ |
| `GET`  | `/api/auth/login-url`        | Returns the GitHub authorization URL             |
| `GET`  | `/oauth2/authorization/github` | Starts the GitHub OAuth2 login flow            |
| `GET`  | `/api/auth/me`               | Returns the authenticated user's profile         |
| `POST` | `/api/auth/logout`           | Clears the session                               |

---

## Status / roadmap

- [x] GitHub OAuth2 login + encrypted token storage
- [x] PostgreSQL + pgvector infrastructure
- [x] Secure session handling, CORS, global error handling
- [ ] Repository traversal + code chunking + embedding/indexing
- [ ] RAG retrieval + generation with file/line citations
- [ ] Streaming (SSE) chat endpoint
- [ ] Frontend chat UI
- [ ] End-of-project cleanup of unused/WIP code

---

## References

- Tutorial: [Complete Java Springboot project with RAG and GenAI](https://www.youtube.com/watch?v=R8VBA_KtUo0&list=WL&index=29&t=5754s)
- Spring AI: https://docs.spring.io/spring-ai/reference/
- pgvector: https://github.com/pgvector/pgvector
- Next.js: https://nextjs.org/docs
