import DynamoCliente from '../data/dynamo'
import * as vars from '../application/config/vars'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'

export class GuardarVehiculoController {
    private dynamo: DynamoCliente
    private placa: string

    constructor(event: APIGatewayProxyEventV2) {
        this.dynamo = new DynamoCliente(vars.env.TABLE_NAME)
        this.placa = JSON.parse(event.body!).placa
    }
    public async exec() {
        const respuesta = await this.dynamo.guardarNuevo(this.placa)
        return new ResponseCustom(201, respuesta)

    }
}
