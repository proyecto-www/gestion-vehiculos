import DynamoCliente from '../data/dynamo'
import * as vars from '../application/config/vars'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import PlacaUtils from '../utils/PlacaUtils'

export class GuardarVehiculoController {
    private dynamo: DynamoCliente
    private placa: string

    constructor(event: APIGatewayProxyEventV2) {
        this.dynamo = new DynamoCliente(vars.env.TABLE_NAME)
        this.placa = JSON.parse(event.body!).placa
    }
    public async exec() {
        try {
            const comprobarPlaca = new PlacaUtils(this.placa)
            const tipoVehiculo: string = comprobarPlaca.definirTipoVehiculo()


            const respuesta = await this.dynamo.guardarNuevo(this.placa, tipoVehiculo)
            return new ResponseCustom(201, respuesta)
        }
        catch(error){
            return new ResponseCustom(400,error)
        }

    }
}
