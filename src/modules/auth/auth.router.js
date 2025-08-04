import CustomRouter from "../../shared/utils/customRouter.util.js"
import passportCb from "../../shared/middlewares/passportCb.mid.js"
import { loginAdmin, logoutAdmin, forbidden, badAuth, isOnline, register} from "./auth.controller.js"

class AuthRouter extends CustomRouter{
    constructor(){
        super();
        this.init();
    }
    init = ()=>{
        this.create("/register",["PUBLIC"] ,passportCb("register"), register);
        this.create("/login",["PUBLIC"] ,passportCb("login"), loginAdmin);
        this.destroy("/logout",["ADMIN"], logoutAdmin);
        this.read("/isOnline",["ADMIN"], isOnline);
        this.read("/bad-auth",["PUBLIC"], badAuth);
        this.read("/forbidden",["PUBLIC"], forbidden);
    }
}

const authRouter = (new AuthRouter()).getRouter();
export default authRouter;