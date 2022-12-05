import * as dotenv from 'dotenv' 
dotenv.config();

export const env = {
RDS_USER :process.env.RDS_USER,
RDS_HOST:process.env.RDS_HOST,
RDS_DATABASE:process.env.RDS_DATABASE,
RDS_PASSWORD:process.env.RDS_PASSWORD,
RDS_PORT:parseInt(process.env.RDS_PORT as string),

}