import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Room } from "./room";

@Entity()
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column("text")
	content!: string;

	@Column()
	roomId!: string;

	@Column()
	userId!: string;

	@CreateDateColumn()
	generatedOn!: string;

	@ManyToOne(() => User, (user) => user.messages)
	@JoinColumn({ name: "userId" })
	user!: User;

	@ManyToOne(() => Room, (room) => room.messages)
	@JoinColumn({ name: "roomId" })
	room!: Room;
}
