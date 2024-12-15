import "reflect-metadata";
import { DataSource } from "typeorm";
import entities from "./entities";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "socket-db",
	entities: entities,
	synchronize: true,
	logging: false,
});
