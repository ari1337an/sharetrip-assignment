# ShareTrip Assignment

## Table of Contents

- [Introduction](#introduction)
- [Production Server](#production-server)
- [Tech Stack](#tech-stack)
- [Onboarding Docs](#onboarding-docs)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)

  
## Introduction

This is a pre-interview assignment project from [ShareTrip](https://sharetrip.net)'s hirings, focusing on an ExpressJS backend within a NodeJS environment. The underlying codebase adopts a [clean architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164) methodology, prioritizing maintainability, scalability, and testability by systematically segregating third-party dependencies from the core business logic.

In this structure, the business logic is confined to the `/src/infrastructure/` directory, composed entirely in pure JavaScript. It deliberately avoids reliance on third-party packages, with the exception of using `zod` for validation purposes. This isolation ensures that the business logic remains contained, preventing it from permeating the entire codebase.

One notable feature is the adaptability of this infrastructure. The entire `/src/infrastructure/` folder, with its core business logic, can be seamlessly transferred to other codebases. This facilitates the integration of different frameworks or databases, as necessitated by the project requirements. The design incorporates dependency injection and design patterns, contributing to the code's overall maintainability and readability. These principles empower developers to easily modify or extend functionality while preserving the architectural integrity of the system.

## Production Server

Visit the [https://arian-sharetrip.onrender.com/search?keyword=tempora](https://arian-sharetrip.onrender.com/search?keyword=tempora) to explore the live application.

## Tech Stack
   - Nodejs ✅
   - ExpressJS ✅
   - TypeScript ✅
   - Prisma ✅
   - MongoDB ✅
   - Zod ✅

## Onboarding Docs

Commit messages style/structure: [Conventional Commit Message Style](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

Project architecture:

![Clean Architecture Diagram](docs/architecture.jpg)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v20.10.0 recommended and tested)
- Git

### Installation

Follow these steps to set up the project:

```bash
git clone https://github.com/ari1337an/sharetrip-assignment.git
cd sharetrip-assignment
npm install
npm run build
npm run start
```

Visit `http://localhost:your-port` in your browser to see the application.

## Environment Variables

Before running the application, create a `.env` file in the project root with the following variables:

```env
PORT=3000
EXTERNAL_API="https://jsonplaceholder.typicode.com/posts"
DATABASE_URL="mongodb+srv://<username>:<password>@<hostname>/<database>"
```

Refer to the `sampleenv` file for a sample structure of the environment file.
