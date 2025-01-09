import "reflect-metadata";
import { DataSource } from "typeorm";
import entities from "./entities";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST,
	port: (process.env.DATABASE_PORT as unknown as number) || 5432,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: entities,
	synchronize: true,
	logging: false,
});
