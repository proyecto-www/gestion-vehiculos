import { APIGatewayProxyEventV2 } from 'aws-lambda'
import ResponseCustom from '../response/ResponseCustom'
import PlacaUtils from '../utils/PlacaUtils'
import PostgresCliente from '../data/postgres'

export class GuardarVehiculoController {
    private postgres: PostgresCliente
    private placa: string

    constructor(event: APIGatewayProxyEventV2) {
        this.postgres = new PostgresCliente()
        this.placa = JSON.parse(event.body!).placa
    }
    public async exec() {
        try {
            const comprobarPlaca = new PlacaUtils(this.placa)
            const tipoVehiculo: string = comprobarPlaca.definirTipoVehiculo()


            const respuesta = await this.postgres.guardarNuevo(this.placa, tipoVehiculo)
            return new ResponseCustom(201, "Vehiculo ingresado correctamente")
        }
        catch(error){
            return new ResponseCustom(400,error)
        }

    }
}
