import {config} from 'dotenv'
import argvsConfig from './argvs.config.js'

const mode = argvsConfig.mode;
const path = '.env.'+ mode;

config({path});

const env ={
    PORT: process.env.PORT,
    LINK_DB: process.env.LINK_DB,
    SECRET: process.env.SECRET
}

export default env;