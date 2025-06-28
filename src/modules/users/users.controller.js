import {
  createOneService,
  getAllService,
  readByIdService,
  updateByIdService,
} from "./users.service.js";

const registerUser = async (req, res) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    if (!data.phone || !data.name || !data.birthday) {
      const error = new Error("Completa todos los campo");
      throw error;
    }
    const fechaValida = (date) => {
      return !isNaN(new Date(date));
    };

    if (!fechaValida(data.birthday)) {
      const error = new Error("Fecha invalida");
      throw error;
    }
    const response = await createOneService(data);
    res.status(200).json({ response, method, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; // checked
const getUsers = async (req, res) => {
  try {
    const { method, originalUrl: url } = req;
    const filter = req.query;
    const response = await getAllService(filter);
    res.status(200).json({ response, method, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //checked
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { method, originalURL: url } = req;
    const response = await readByIdService(id);
    res.status(200).json({ response, method, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; // checked
const updateUser = async (req, res) => {
  try {
    const { method, originalURL: url } = req;
    const { user_id } = req.params;
    const data = req.body;

    const response = await updateByIdService(user_id, data);
    res.status(200).json(response, method, url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; // not implemented yet
export { registerUser, getUsers, getUserById };
