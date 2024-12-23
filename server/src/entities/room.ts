import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	JoinColumn,
	Unique,
	OneToMany,
} from "typeorm";
import { User } from "./user";
import { Message } from "./message";

@Entity()
@Unique(["name"])
export class Room {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ length: 100 })
	name!: string;

	@Column({ length: 100 })
	password!: string;

	@CreateDateColumn()
	createdOn!: string;

	@Column()
	ownerId!: string;

	@ManyToOne(() => User, (user) => user.roomsCreated)
	@JoinColumn({ name: "ownerId" })
	owner!: User;

	@ManyToMany(() => User, (user) => user.rooms)
	members!: User[];

	@OneToMany(() => Message, (msg) => msg.room)
	messages!: Message[];
}
