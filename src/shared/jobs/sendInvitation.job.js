import twilio from "twilio";
import 'dotenv/config.js';
const sendInvitationJob = async (invited) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_TOKEN;
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      from: "+13136340844",
      body: `Hola ${invited.name}, estas invitado al cumple.consfirma tu asistencia aca ${invited.link}`,
      to: invited.phone,
    });
    console.log("Message delivered");
  } catch (error) {
    console.log(error);
  }
};

export default sendInvitationJob