import { usersManager } from "../../shared/managers/mongo/manager.mongo.js";

const createOneService = async (data) => await usersManager.createOne(data);
const getAllService = async () => await usersManager.readAll();
const updateByIdService = async(id, data) => await usersManager.updateById(id,data);
const readByIdService = async (id) => await usersManager.readById(id);
export {createOneService, getAllService, updateByIdService, readByIdService}