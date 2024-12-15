import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user";

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column({ length: 100 })
	name!: string;

	@CreateDateColumn()
	createdOn!: string;

	@ManyToOne(() => User, (user) => user.roomsCreated)
	owner!: User;

	@ManyToMany(() => User, (user) => user.rooms)
	members!: User[];
}
