import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
	swaggerDefinition: {
		openapi: "3.0.1",
		info: {
			title: "Feedback API",
			version: "0.0.1",
			description: "Feedback API를 정리하기 위해 만들었습니다",
		},
		basePath: "/",
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/routes/*.ts", "./src/models/*.ts", "./swagger/*.yaml"],
};
const specs = swaggereJsdoc(options);
export { swaggerUi, specs };
