import crypto from 'crypto';

const createToken = () =>{
    return crypto.randomBytes(16).toString('hex');
}

export default createToken;