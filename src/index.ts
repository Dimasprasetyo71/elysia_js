import { Elysia } from "elysia";
import { setupDatabase } from "./databases/db";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { helmet } from "elysia-helmet";
import { ratelimiteMiddleware } from "./middlewares/ratelimiteMiddleware";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import AuthController from "./controller/AuthController";
import CategoryController from "./controller/CategoryController";
import UserController from "./controller/UserController";
import { ip } from "elysia-ip";


import BlogController from "./controller/AuthController";


console.log("🚀 Initializing Database...");
setupDatabase();
console.log("✅ Done!");

new Elysia()

  // menerapkan CORS
  .use(cors())

  // menerapkan Helmet
  .use(helmet())

  // ip anddres
  .use(ip({ headersOnly: true }))

  .use(
    opentelemetry({
      serviceName: "first_elysia",
      autoDetectResources: true,
    })
  )

  .get("/", ({ ip }) => "tes" + ip + new Date())
  .onError(({ error, code }) => {
    if (code === "NOT_FOUND") return "Not Found :(";

    console.error(error);
  })

  // menerapkan Swagger dan dimodifikasi sedikit
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia Blog API",
          version: "1.0.0",
          description:
            "Blog API Project. Developed with Elysia.js framework, Bun runtime, Typescript, and SQLite.",
        },
        components: {
          securitySchemes: {
            JwtAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        servers: [{ url: "http://localhost:3000" }],
      },
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  )

  // RATE LIMIT
  .use(ratelimiteMiddleware)
  // memanggil semua controller yang ada
  .use(AuthController)
  .use(CategoryController)
  .use(UserController)
  .use(BlogController)
  // menjalankan server sesuai port yang tertera di .env
  .listen(Bun.env.PORT!);

console.log(`🦊 Elysia is running on port ${Bun.env.PORT!}`);
