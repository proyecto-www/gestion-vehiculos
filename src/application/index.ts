import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { APIGatewayProxyResult } from 'aws-lambda';
import { GuardarVehiculoController } from '../controller/GuardarVehiculoController';
import { ObtenerVehiculoController } from '../controller/ObtenerVehiculoController';
import ResponseCustom from '../response/ResponseCustom';
import {SalidaVehiculoController} from '../controller/SalidaVehiculoController'
import PostgresCliente from '../data/postgres';
import { RegistrarPagoController } from '../controller/RegistrarPagoController';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    const prueba = new PostgresCliente()
    prueba.registrarPago('ABC123','HOOLA',10000)
    let controller
    switch (event.requestContext.http.method) {
        case 'GET':
            controller = new ObtenerVehiculoController(event)
            break
        case 'POST':

            if(event.requestContext.http.path=='/vehiculos/registrar/pago'){
                controller = new RegistrarPagoController(event)

            }
            else{
                controller = new GuardarVehiculoController(event)

            }
            break
        case 'PATCH':
            controller = new SalidaVehiculoController(event)
            break
        default:
            return ResponseCustom.badRequestJson()

    }
    const respuesta = controller.exec()

    return respuesta
}