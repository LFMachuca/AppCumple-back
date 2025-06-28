import User from "../../../modules/users/users.model.js";
import Event from "../../../modules/events/events.model.js";
class Manager {
  constructor(model) {
    this.model = model;
  }

  createOne = async (data) => await this.model.create(data);

  readAll = async (filter) => await this.model.find(filter).lean();

  readById = async (id) => await this.model.findOne({ _id: id }).lean();

  readBy = async (filter, projection) => await this.model.findOne(filter, projection).lean();

  updateById = async (id, data) =>
    await this.model.findByIdAndUpdate(id, data, { new: true });

  destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

const usersManager = new Manager(User);
const eventsManager = new Manager(Event);
export { usersManager, eventsManager};
