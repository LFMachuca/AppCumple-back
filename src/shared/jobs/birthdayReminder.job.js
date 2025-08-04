import { guestsManager } from "../managers/mongo/manager.mongo.js";
import nodeCron from "node-cron";
import { sendMessageJob } from "./sendMessage.job.js";
const birthdayReminderJob = async () => {
    try{
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth()+1;
        const users = await guestsManager.readAll({$expr:{$eq: [{$month:"$birthday"}, month]}});
        users.forEach(user => {
            const userBirthday = new Date(user.birthday);
            if(userBirthday.getDate() > day){
                sendMessageJob(user);
                console.log('Se acerca tu cumpleaños, ' + user.name);
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

const startBirthdayReminderJob = () =>{
    nodeCron.schedule("* * * * *",birthdayReminderJob);
    console.log("recordatorio de cumpleaños iniciado");
}

export { startBirthdayReminderJob }