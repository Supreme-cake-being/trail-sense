trailsense/
│
├── apps/
│   ├── api/                # NestJS backend
│   ├── web/                # Next.js (Pages Router)
│   ├── mobile/             # React Native (Expo)
│   └── worker/             # background jobs (optional, future)
│
├── packages/
│   ├── api-client/         # shared API client (web + mobile)
│   ├── shared-types/       # shared TS types (DTO-like)
│   ├── ui/                 # shared UI components (optional)
│   ├── config/             # eslint, tsconfig, prettier
│   ├── utils/              # shared helpers
│   ├── constants/          # enums, categories
│   └── validation/         # zod schemas (shared)
│
├── infra/
│   ├── docker/             # docker configs
│   ├── postgres/           # db init scripts
│   └── nginx/              # optional reverse proxy
│
├── docs/
│   ├── ai-rules.md
│   ├── architecture.md
│   └── api-contract.md
│
├── .github/
│   └── workflows/          # CI/CD
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md