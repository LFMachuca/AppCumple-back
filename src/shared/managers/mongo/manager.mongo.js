import Admin from "../../../modules/admin/admin.model.js"
import Guest from "../../../modules/guests/guests.model.js"
import Event from "../../../modules/events/events.model.js";
class Manager {
  constructor(model) {
    this.model = model;
  }

  createOne = async (data) => await this.model.create(data);

  readAll = async (filter) => await this.model.find(filter).lean();

  readById = async (id) => await this.model.findOne({ _id: id }).lean();

  readBy = async (filter) => await this.model.findOne(filter).lean();

  updateById = async (id, data) =>
    await this.model.findByIdAndUpdate(id, data, { new: true });

  destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

const guestsManager = new Manager(Guest);
const eventsManager = new Manager(Event);
const adminsManager = new Manager(Admin);
export { guestsManager, eventsManager, adminsManager};
