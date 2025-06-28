import { eventsManager } from "../../shared/managers/mongo/manager.mongo.js";

const createService = async (data) => await eventsManager.createOne(data);
const readByService = async (filter, projection) => await eventsManager.readBy(filter,projection);
const readAllService = async (filter) => await eventsManager.readAll(filter);
const updateService = async (id,data) => await eventsManager.updateById(id,{$push:{attendees:data}});
const readByIdService = async (id) => await eventsManager.readById(id);

export { createService, readByService, readAllService, updateService, readByIdService};