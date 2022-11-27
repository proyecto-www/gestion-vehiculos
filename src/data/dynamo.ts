import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { NOTFOUND } from "dns";
import * as vars from '../application/config/vars'
import ResponseCustom from "../response/ResponseCustom";
const REGION = "us-east-1";



export default class DynamoCliente {

    private ddbClient: DynamoDBClient
    private tableName: string

    constructor(tableName: string) {
        this.tableName = tableName
        this.ddbClient = new DynamoDBClient({ region: REGION });
    }
    public async obtenerUltimaVisitaPorPlaca(placa: string) {

        const params = {
            TableName: vars.env.TABLE_NAME, //TABLE_NAME
            ExpressionAttributeValues: {
                ':placa': { S: placa },

            },
            KeyConditionExpression: 'placa = :placa',
            ScanIndexForward: false,    // true = ascending, false = descending
            Limit: 1

        };
        const respuesta = await this.ddbClient.send(new QueryCommand(params))
        return respuesta


    }
    public async guardarNuevo(placa:string,tipoVehiculo:string){
        let unixValue :number = Date.now()
        let hoy: string = unixValue.toString()
        const params = {
            TableName: vars.env.TABLE_NAME, //TABLE_NAME
            Item:{
                'placa':{S:placa},
                'fechaHoraEntrada':{N:hoy},
                'tipoDeVehiculo':{S:tipoVehiculo},
                'sigueEnUso':{BOOL:true},
                'valorPagado':{N:'0'}
            }
        };
        const respuesta = await this.ddbClient.send(new PutItemCommand(params))
        return respuesta
    }
    public async salida(placa:string, fechaHoraEntrada:number){
        const params = {
            TableName: vars.env.TABLE_NAME, //TABLE_NAME
            Key:{
                // 'placa':placa,              
                // 'fechaHoraEntrada':fechaHoraEntrada.toString(),
                'placa':{S:placa},
                'fechaHoraEntrada':{N:fechaHoraEntrada.toString()},

                
            },
            UpdateExpression:'set sigueEnUso = :sigueEnUso',
 
            ExpressionAttributeValues: {
                ':sigueEnUso':{BOOL:false},
            },
            
            ReturnValues: "UPDATED_NEW",

        };
        const respuesta = await this.ddbClient.send(new UpdateItemCommand(params))
        return respuesta
    }


}