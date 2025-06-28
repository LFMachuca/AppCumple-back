import twilio from 'twilio';
import 'dotenv/config.js';

const sendMessageJob = async (ususario) =>{
    try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_TOKEN;
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
        from: "+13136340844",
        body:`Hola ${ususario.name}, se acerca tu cumpleaños ! Organizalo con nosotros`,
        to: ususario.phone
    })
    console.log(`Mensaje enviado`)
    } catch (error) {
        console.log(error);
    }

}
export {sendMessageJob};