import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import PostgresCliente from '../data/postgres'

export class RegistrarPagoController {
    private postgres: PostgresCliente
    private placa: string
    private idPago:string
    private valorPagado:number

    constructor(event: APIGatewayProxyEventV2) {
        this.postgres = new PostgresCliente()
        this.placa = JSON.parse(event.body!).placa
        this.idPago = JSON.parse(event.body!).idPago
        this.valorPagado = JSON.parse(event.body!).valorPagado

    }
    public async exec() {
        try {
        


            const respuesta = await this.postgres.registrarPago(this.placa, this.idPago,this.valorPagado)
            return new ResponseCustom(200, respuesta)
        }
        catch(error){
            return new ResponseCustom(400,error)
        }

    }
}
