# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build           # Compile TypeScript (tsc)
npm run typecheck       # Type check without emitting
npm test                # Run unit tests (*.test.ts)
npm run test:integration # Run integration tests (*.integration-test.ts) - requires real credentials
npm run test:e2e        # Run E2E tests (*.e2e-test.ts)
```

To run a single test file:
```bash
npx vitest run path/to/file.test.ts
```

## Architecture

This project follows **Hexagonal/Clean Architecture**:

```
src/
├── domain/           # Core business logic (no external dependencies)
│   ├── models/       # Value objects with toPrimitives() methods
│   ├── repositories/ # Repository interfaces
│   └── services/     # Domain service interfaces (Clock, Random, Logger)
├── infrastructure/   # External implementations
│   ├── cli/          # Yargs CLI entry point and app composition
│   ├── factorial-client/  # HTTP client for Factorial API (REST + GraphQL)
│   │   └── schema/   # Zod schemas for API response validation
│   └── repositories/ # Repository implementations using FactorialClient
└── use-cases/        # Application use cases (FillShifts)

test/
├── fakes/            # In-memory repository implementations for unit tests
└── mothers/          # Object mother utilities for test data
```

## Key Patterns

- **Repository pattern**: Domain defines interfaces, infrastructure implements them
- **API schemas**: Zod schemas in `src/infrastructure/factorial-client/schema/` validate and type API responses; use `camelcase-keys` to convert snake_case responses
- **Value objects**: Domain models expose `toPrimitives()` for serialization; IDs extend `DomainId`
- **Test fakes**: Use `test/fakes/*Fake.ts` classes as in-memory implementations for unit tests
- **FactorialClient**: Handles authentication, REST endpoints, and GraphQL mutations (projects)
