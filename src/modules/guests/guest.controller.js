import { guestsManager } from "../../shared/managers/mongo/manager.mongo.js";

const confirmAttendance = async(req, res)=>{
    const {id} = req.params;
    const data = req.body;
    data.eventId = id;
    const response = await guestsManager.createOne(data)
    if(!response){
        res.json404()
    }
    res.json201(response);
}
const getGuestByEvent = async (req, res) =>{
    const {id}=req.params;
    const response = await guestsManager.readAll({eventId:id});
    if(!response.length === 0){
        res.json404();
    }
    res.json200(response);
}
const getGuest = async (req, res) =>{
    const filter =req.query;
    const response = await guestsManager.readAll(filter);
    if(!response.length === 0){
        res.json404();
    }
    res.json200(response);
}
export { confirmAttendance, getGuestByEvent, getGuest }