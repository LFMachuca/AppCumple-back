import CustomRouter from "../../shared/utils/customRouter.util.js";

class AdminsRouter extends CustomRouter{
    constructor(){
        super();
        this.init();
    }
    init =()=>{
    }
}
const adminsRouter = (new AdminsRouter()).getRouter();
export default adminsRouter