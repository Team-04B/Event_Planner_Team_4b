import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')})

export default {
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    jwt:{
        jwt_scret:process.env.JWT_SECRET,
        expires_in:process.env.EXPIRES_IN,
        refresh_token_secret:process.env.REFRESH_TOEKN_SECRET,
        refresh_token_expires_in:process.env.REFRESH_TOEKN_EXPIRES_IN,
    },
    reset_password_secret:process.env.RESET_PASS_TOKEN,
    reset_password_expires_in:process.env.RESET_PASS_TOKEN_EXPIRES_IN,
    reset_password_link:process.env.RESET_PASSWORD_LINK,
    email:process.env.EMAIL,
    app_password:process.env.APP_PASSWORD
}