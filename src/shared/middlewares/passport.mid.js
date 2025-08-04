import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { adminsManager } from "../managers/mongo/manager.mongo.js";
import { createToken } from "../utils/token.util.js"
import { compareHash, createHash } from "../utils/hash.util.js"


passport.use("register", new LocalStrategy(
    {passReqToCallback:true, usernameField:"email"},
    async(req, email, password, done) =>{
        try {
            
            let user = await adminsManager.readBy({email});
            if(user) {
                 const error = new Error ("Invalid Credentials");
                 error.statusCode = 401;
                 throw error;
            }
            const hashedPassword = createHash(password)
            req.body.password = hashedPassword;
            user = await adminsManager.createOne(req.body);
            done(null,user);
        } catch (error) {
            done(error);
        }
    }
));
passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email"},
    async(req, email, password, done) =>{
        try {
            const user = await adminsManager.readBy({ email });
            if(!user){
                const error = new Error ("invalid credentials");
                error.statusCode = 401;
                throw error;
            }
            const verifyPassword = compareHash(password, user.password);
            if(!verifyPassword){
                const error = new Error ("Invalid Credentials");
                error.statusCode = 401;
                throw error;
            }
            const data = {
                user_id: user._id,
                email: user.email,
                role: user.role
            };
            const token = createToken(data);
            user.token = token;
            done(null, user);
        } catch (error) {
            done(error)
        }
    }
));
passport.use("current", new JwtStrategy(
    {   jwtFromRequest: ExtractJwt.fromExtractors([(req)=> req?.cookies?.token]),
        secretOrKey: process.env.SECRET
    },
    async (data, done) => {
        try {
            const {user_id, email, role} = data ;
            const uder = await usersManager.readBy({_id:user_id, email, role});
            if(!user){
                const error = new Error ("Forbidden");
                error.statusCode = 403 ;
                throw error ;
            }
            const currentUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role : user.role
            };
            done(null, currentUser)
        } catch (error) {
            done(error);
        }
    }
));

export default passport;