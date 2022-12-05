import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import PostgresCliente from '../data/postgres'

export class SalidaVehiculoController {
    private postgres: PostgresCliente
    private placa: string

    constructor(event: APIGatewayProxyEventV2) {
        this.postgres = new PostgresCliente()
        this.placa = JSON.parse(event.body!).placa
    }
    public async exec() {
        try {
        


            const respuesta = await this.postgres.salida(this.placa)
            return new ResponseCustom(200, respuesta)
        }
        catch(error){
            return new ResponseCustom(400,error)
        }

    }
}
