// 🌙 Will serve as our "data structure" to
// 🌙 store all current users
export interface User {
	id: string;
	name: string;
	room: string;
}

interface UserControllersResponse extends User {
	error?: string | undefined;
}

const users: User[] = [];

export const addUser = ({ id, name, room }: User): UserControllersResponse => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find((user) => user.name === name && user.room === room);

	if (existingUser) return { id: "", name: "", room: "", error: `Username ${name} is taken.` };

	const user: User = { id, name, room };
	users.push(user);

	return user;
};

export const removeUser = (id: User["id"]): UserControllersResponse => {
	const index = users.findIndex((user) => user.id === id);
	if (index === -1) return { id: "", name: "", room: "", error: `User with id ${id} cannot be removed.` };
	return users.splice(index, 1)[0];
};

export const getUser = (id: User["id"]): UserControllersResponse => {
	const user = users.find((user) => user.id === id);
	if (!user) return { id: "", name: "", room: "", error: `User with id ${id} not found.` };
	return user;
};

export const getUsersInRoom = (room: User["room"]): User[] => {
	return users.filter((user) => user.room === room);
};
