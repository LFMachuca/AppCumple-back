import 'dotenv/config.js';

const createLink = (eventId) =>{
    const url = process.env.BASE_URL;
    return `${url}/event/confirm/${eventId}`;
}

export default createLink;