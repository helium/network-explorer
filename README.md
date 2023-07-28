# Helium Network Explorer

## Development

### Installation

Requirements: [Node.js 16.8](https://nodejs.org/) or later

[Install pnpm](https://pnpm.io/installation) if you haven't already, for example using [brew](https://brew.sh/):

```bash
brew install pnpm
```

Download the dependencies:

```bash
pnpm install
```

Add environment variables:

```bash
cp .env.example .env.local
```

Add your [Mapbox access token](https://docs.mapbox.com/help/glossary/access-token/).
Add your [Dune API key](https://dune.com/docs/api/#obtaining-an-api-key)
Setup a PostgreSQL database and add your DATABASE_URL. (It will default to using an in memory database if you don't set one up).

### Run locally

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
