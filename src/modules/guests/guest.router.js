import CustomRouter from "../../shared/utils/customRouter.util.js"
import { confirmAttendance, getGuestByEvent, getGuest } from "./guest.controller.js";
class GuestRouter extends CustomRouter{
    constructor(){
        super();
        this.init();
    }
    init = ()=>{
        this.create("/:id/confirm",["PUBLIC"], confirmAttendance)
        this.read('/:id/guests',['ADMIN'], getGuestByEvent)
        this.read('/guests',['ADMIN'], getGuest)
    }
}
const guestRouter = (new GuestRouter()).getRouter()
export default guestRouter