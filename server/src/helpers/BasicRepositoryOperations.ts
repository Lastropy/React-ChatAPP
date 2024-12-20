import { AppDataSource } from "../data-source";

class BasicRepositoryOperations {
	async create(entityName: string, data: Object) {
		try {
			const repository = AppDataSource.getRepository(entityName);
			const newRecord = await repository.save(data);
			console.log(newRecord);
			return Promise.resolve(newRecord);
		} catch (error) {
			console.error("Error in BasicRepositoryOperations create");
			return Promise.reject(error);
		}
	}

	async find(entityName: string, data: Object) {
		try {
			const repository = AppDataSource.getRepository(entityName);
			const existingRecord = await repository.findOneBy(data);
			console.log(existingRecord);
			return Promise.resolve(existingRecord);
		} catch (error) {
			console.error("Error in BasicRepositoryOperations create");
			return Promise.reject(error);
		}
	}
}

export default new BasicRepositoryOperations();
