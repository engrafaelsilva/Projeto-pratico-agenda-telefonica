import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("src/swagger/swagger.json"), "utf8")
);

export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  console.log("📄 Swagger rodando em: http://localhost:3000/api-docs");
}