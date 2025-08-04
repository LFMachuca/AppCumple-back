import { adminsManager } from "../managers/mongo/manager.mongo.js";
import {verifyToken} from "../utils/token.util.js"

const setUpPolicies = (policies) => async (req, res, next) =>{
    try {
        if(policies.includes("PUBLIC")) return next();
        const token = req?.cookies?.token;
        const data = verifyToken(token);
        const {user_id, role}=data;
        if(!user_id) return res.status(401).json();
        const allowedRoles ={
            USER: policies.includes("USER"),
            ADMIN: policies.includes("ADMIN")
        };
        if (!allowedRoles[role]) return res.status(403).json();
        const user = await adminsManager.readById(user_id);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default setUpPolicies