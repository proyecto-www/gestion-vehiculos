import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import PostgresCliente from '../data/postgres'

export class ObtenerVehiculoController {
    private postgres: PostgresCliente
    private placa: string

    constructor(event: APIGatewayProxyEventV2) {
        this.postgres = new PostgresCliente()
        this.placa = event.pathParameters?.placa as string
    }
    public async exec() {
        const respuesta = await this.postgres.consultarPlaca(this.placa)
        if(respuesta==null){
            return ResponseCustom.notFound()
        }
        let body = respuesta

        return new ResponseCustom(200, body)
    }
}
