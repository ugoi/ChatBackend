import { JwtPayload } from 'jsonwebtoken';


export interface ChatJwtPayload extends JwtPayload {
    username: string;
    // any other custom claims you expect
}


export type ChatRequestUser = {
    userId: string;
    username: string;
}
  
