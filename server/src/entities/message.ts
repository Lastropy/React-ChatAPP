import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column("text")
	content!: string;

	@CreateDateColumn()
	generatedOn!: string;

	@ManyToOne(() => User, (user) => user.messages)
	user!: User;
}
