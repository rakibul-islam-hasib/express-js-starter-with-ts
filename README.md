# 🚀Express Stater Kit

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1-lightgrey.svg)](https://expressjs.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**Express js  Backend stater Kit** is a highly-engineered, industrial-grade Express.js starter kit built with TypeScript. It provides a rock-solid foundation for building scalable, secure, and maintainable RESTful APIs.

---

## ✨ Features

- 🏗️ **Modern Architecture** - Clean, modular structure inspired by industry best practices.
- 🔷 **TypeScript First** - Deeply typed development experience for maximum developer productivity.
- 🛡️ **Security Out-of-the-box** - Pre-configured with Helmet, CORS, and request rate limiting.
- ✅ **Type-Safe Validation** - Schema-based request validation using [Zod](https://zod.dev/).
- 📊 **Structured Logging** - Professional logging via Winston with automatic file rotation.
- 🗄️ **Mongoose Integration** - Seamless MongoDB connectivity with robust error handling.
- ☁️ **Media Management** - Ready-to-use Cloudinary integration for cloud storage.
- 📧 **Mail Services** - Pre-configured SMTP support via Nodemailer.
- 🔄 **Lifecycle Management** - Sophisticated graceful shutdown for zero-downtime potential.
- 📖 **Interactive API Docs** - Built-in Swagger/OpenAPI documentation.

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) (>= 18.x)
- **Framework:** [Express.js 5](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Validation:** [Zod](https://zod.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Logger:** [Winston](https://github.com/winstonjs/winston)
- **Security:** [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors)
- **Documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) installed (LTS recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) instance running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakibul-islam-hasib/express-js-starter-with-ts.git
   cd ishwardi-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Open .env and fill in your credentials
   ```

4. **Initialize Build System** (Required for path aliases)
   ```bash
   npm run build
   ```

---

## 🏃 Running the App

### Development Mode
```bash
# Start with hot-reload (using nodemon + ts-node)
npm run dev
```

### Production Mode
```bash
# Build the project
npm run build:prod

# Start the compiled JS
npm start
```

---

## 📂 Project Structure

```text
src/
├── app.ts            # App entry & middleware configuration
├── server.ts         # Server bootstrapping & lifecycle
├── index.ts          # Entry point
├── config/           # App configuration & environment validation
├── middleware/       # Custom Express middlewares (errors, validation)
├── routes/           # API Route definitions
├── types/            # Global TypeScript types/interfaces
└── utils/            # Helper functions (logger, responses)
```

---

## 🧪 Testing & Quality

```bash
# Lint code
npm run lint

# Check types
npm run typecheck

# Format code
npm run format
```

---

## 🤝 Contributing

We love contributions! Whether it's a bug fix, new feature, or documentation improvement, please feel free to:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## 📝 License

Distributed under the ISC License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/rakibul-islam-hasib">Rakibul Islam Hasib</a>
</p>
