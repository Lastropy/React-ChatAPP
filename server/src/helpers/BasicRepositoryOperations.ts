import { AppDataSource } from "../data-source";

class BasicRepositoryOperations {
	async create(entityName: string, data: Object) {
		try {
			const repository = AppDataSource.getRepository(entityName);
			const newRecord = await repository.save(data);
			return Promise.resolve(newRecord);
		} catch (error) {
			console.error("Error in BasicRepositoryOperations create");
			return Promise.reject(error);
		}
	}

	async find(entityName: string, data: Object) {
		try {
			const repository = AppDataSource.getRepository(entityName);
			const existingRecord = await repository.find(data);
			return Promise.resolve(existingRecord);
		} catch (error) {
			console.error("Error in BasicRepositoryOperations find");
			return Promise.reject(error);
		}
	}

	async findOne(entityName: string, data: Object) {
		try {
			const repository = AppDataSource.getRepository(entityName);
			const existingRecord = await repository.findOne({ where: data });
			return Promise.resolve(existingRecord);
		} catch (error) {
			console.error("Error in BasicRepositoryOperations findOne");
			return Promise.reject(error);
		}
	}
}

export default new BasicRepositoryOperations();
