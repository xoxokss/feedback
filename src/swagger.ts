import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Test API",
			version: "0.0.1",
			description: "Test API with express",
		},
		basePath: "/",
	},
	apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};
const specs = swaggereJsdoc(options);
export { swaggerUi, specs };
