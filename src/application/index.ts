import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { APIGatewayProxyResult } from 'aws-lambda';
import { GuardarVehiculoController } from '../controller/GuardarVehiculoController';
import { ObtenerVehiculoController } from '../controller/ObtenerVehiculoController';
import ResponseCustom from '../response/ResponseCustom';


export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
   let controller
    switch (event.requestContext.http.method) {
        case 'GET':
        controller = new ObtenerVehiculoController(event)
            break
        case 'POST':
        controller = new GuardarVehiculoController(event)

            break
        default:
            return ResponseCustom.badRequestJson()

    }
    const respuesta = controller.exec()
    
    return respuesta
}