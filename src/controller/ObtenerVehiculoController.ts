import DynamoCliente from '../data/dynamo'
import * as vars from '../application/config/vars'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import {unmarshall} from '@aws-sdk/util-dynamodb'

export class ObtenerVehiculoController {
    private dynamo: DynamoCliente
    private placa: string

    constructor(event: APIGatewayProxyEventV2) {
        this.dynamo = new DynamoCliente(vars.env.TABLE_NAME)
        this.placa = event.pathParameters?.placa as string
    }
    public async exec() {
        const respuesta = await this.dynamo.obtenerUltimaVisitaPorPlaca(this.placa)
        if(respuesta.Items!.length==0 || !respuesta.Items![0].sigueEnUso.BOOL){
            return ResponseCustom.notFound()
        }
        let body = unmarshall(respuesta.Items![0])

        return new ResponseCustom(200, body)
    }
}
