import { eventsManager } from "../../shared/managers/mongo/manager.mongo.js";

const createEvent = async (req,res)=>{
    const data = req.body;
    data.createdBy = req.user._id;
    const checkDate = new Date(req.body.date);
    data.date = checkDate;
    const response = await eventsManager.createOne(data);
    res.json201(response);
}

const readEvents = async(req,res) =>{
    const filter = req.user._id;
    const response = await eventsManager.readAll({createdBy:filter});
    if(response.length === 0){
        res.json404("Empty events");
    }
    res.json200(response); 
}

const destroyEvent = async(req,res) =>{
    const{id} = req.params
    const response = await eventsManager.destroyById(id);
    if (!response) {
        res.json404(response);
    }
    res.json200(response);
}   

const updateEvent = async(req, res) =>{
    const {id} = req.params;
    const data = req.body;
    const response = await eventsManager.updateById(id,data);
    if(!response){
        res.json404(response)
    }
    res.json200(response);
}

const readEvent = async (req, res)=>{
    const{id} = req.params;
    const response = await eventsManager.readById(id)
    if(!response){
        res.json404(response);
    }
    res.json200(response);
}

export{ createEvent, readEvents, destroyEvent, updateEvent, readEvent}