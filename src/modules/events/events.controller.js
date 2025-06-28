import { createService, readByIdService, updateService, readAllService, readByService } from "./events.service.js";

const createEvent = async (req, res) => {
    try {
        const { method, originalUrl:url} = req;
        const data = req.body;
        data.user_id = "684358b0ec304634a461768d"
        if(!data.date || !data.message || !data.user_id || !data.place){
            return res.status(400).json({error: "All fields are requiered"});
        }
        const newEvent = await createService(data);
        res.status(200).cookie("event",{user_id:data.user_id,event_id:newEvent._id},{maxAge:10000}).json({resposne:newEvent, method, url})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}//checked
const getUserEvents = async (req, res) =>{
    try {
        const { method, originalURL: url } = req;
        const {userId} = req.params;
        if (!userId){
            res.status(400).json({ error: "user_id is required"});
        }
        const response = await readAllService({user_id:userId});
        if(!response){
            res.status(404).json({error:"Event not found"});
        }
        res.status(200).json({response, method, url});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
} //cheked
const updateEvent = async (req,res)=>{
    try {
        const { id } = req.params;
        const data = req.body;
        const {email} = req.body
        // Verificar si el evento existe
        const existingEvent = await readByIdService(id);
        if (!existingEvent) {
            return res.status(404).json({error: "Event not found"});
        }
        // Validar que hay datos para actualizar
        if (!data) {
            return res.status(400).json({error: "No data provided for update"});
        }
        //Verificar si ya confirmo
        const existingEmail = await readByService({_id:id, "attendees.email":email})
        if(existingEmail){
            return res.status(400).json({error:"Email already confirmed attendance"})
        }
        const response = await updateService(id, data);
        res.status(200).json({response, message: "Event updated successfully"});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
} // checked
const getEventById =  async (req, res) => {
    try {
        const {id} = req.params;
        const {method, originalURL:url} = req;

        const response = await readByIdService(id);

        res.status(200).json({response, method, url});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
} // cheked
const getEventAttendees = async (req, res)=>{
try {
    const {id} = req.params
    const {method , originalURL:url} = req;
    const response = await readByService({_id:id},{attendees:1, user_id:0})
    res.status(200).json({response, method, url})
} catch (error) {
    res.status(500).json({error:error.message})
}
} //cheked
const getEvents = async (req, res) =>{
    try {
        const filter = req.query;
        const {method, originalURL:url}= req;

        const response = await readAllService(filter)
        res.status(200).json({response, method, url});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export { createEvent, getUserEvents, updateEvent, getEventById, getEventAttendees, getEvents};