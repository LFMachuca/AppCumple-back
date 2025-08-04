import CustomRouter from "../../shared/utils/customRouter.util.js"
import {createEvent, readEvents, destroyEvent, updateEvent, readEvent} from "./events.controller.js";
class EventsRouter extends CustomRouter{
constructor(){
    super();
    this.init();
}
init =()=>{
    this.create("/",["ADMIN"], createEvent);
    this.read("/", ["ADMIN"], readEvents);
    this.read("/:id",["PUBLIC"], readEvent)
    this.update("/:id",["ADMIN"], updateEvent);
    this.destroy("/:id",["ADMIN"], destroyEvent);

}


}
const eventsRouter = (new EventsRouter()).getRouter();
export default eventsRouter