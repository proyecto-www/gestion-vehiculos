import DynamoCliente from '../data/dynamo'
import * as vars from '../application/config/vars'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import PlacaUtils from '../utils/PlacaUtils'

export class SalidaVehiculoController {
    private dynamo: DynamoCliente
    private placa: string
    private fechaHoraEntrada:number

    constructor(event: APIGatewayProxyEventV2) {
        this.dynamo = new DynamoCliente(vars.env.TABLE_NAME)
        this.placa = JSON.parse(event.body!).placa
        this.fechaHoraEntrada = JSON.parse(event.body!).fechaHoraEntrada
    }
    public async exec() {
        try {
        


            const respuesta = await this.dynamo.salida(this.placa, this.fechaHoraEntrada)
            return new ResponseCustom(200, respuesta)
        }
        catch(error){
            return new ResponseCustom(400,error)
        }

    }
}
