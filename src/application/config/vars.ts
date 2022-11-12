import * as dotenv from 'dotenv' 
dotenv.config();

export const env = {
    TABLE_NAME: process.env.TABLE_NAME as string
}