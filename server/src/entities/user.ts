import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Message } from "./message";
import { Room } from "./room";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column({
		length: 50,
	})
	name!: string;

	@Column({
		length: 100,
	})
	email!: string;

	@CreateDateColumn()
	joinedOn!: string;

	@OneToMany(() => Message, (message) => message.user)
	messages!: Message[];

	@OneToMany(() => Room, (room) => room.owner)
	roomsCreated!: Room[];

	@ManyToMany(() => Room, (room) => room.members)
	@JoinTable()
	rooms!: Room[];
}
