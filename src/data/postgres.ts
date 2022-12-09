import { Pool } from 'pg'
import Vehiculo from '../model/Vehiculo'
import * as vars from '../application/config/vars'

export default class PostgresCliente {

    private cliente: Pool

    constructor() {
        this.cliente = new Pool({
            user: vars.env.RDS_USER,
            host: vars.env.RDS_HOST,
            database: vars.env.RDS_DATABASE,
            password: vars.env.RDS_PASSWORD,
            port: vars.env.RDS_PORT
        })
    }


    public async consultarPlaca(placa: string) {
        const queryValues = [placa]
        let query = await this.cliente.query('Select v.id,v.placa,v.fechahoraentrada,p.fechahorapago ,v.tipodevehiculo, v.fechahorasalida from vehiculo v join pago p on v.idpago =p.idpago where placa=$1 and sigueenuso=true order by fechahoraentrada desc limit 1', queryValues)
        if (query.rows.length == 0) {
            query = await this.cliente.query('Select id, placa,fechahoraentrada,fechahorasalida,tipodevehiculo from vehiculo where placa=$1 and sigueenuso=true order by fechahoraentrada desc limit 1;',queryValues)

        }
        let tiempoParaSalir =900000
        console.log(typeof query.rows[0].fechahorapago)
        let tiempoRestante :number=query.rows[0].fechahorapago? tiempoParaSalir-Date.now()+parseInt(query.rows[0].fechahorapago): -1

        this.cliente.end
        let respuesta: Vehiculo = new Vehiculo(query.rows[0].id, query.rows[0].fechahorasalida, query.rows[0].placa, query.rows[0].fechahoraentrada, tiempoRestante,query.rows[0].tipodevehiculo )


        return respuesta
    }


    public async guardarNuevo(placa: string, tipoVehiculo: string) {

        let fechaHoraEntrada: number = Date.now()
        const queryValues = [placa, fechaHoraEntrada, tipoVehiculo]
        const query = await this.cliente.query('INSERT INTO vehiculo(placa,fechahoraentrada,tipodevehiculo, sigueenuso) values ($1,$2,$3,true);', queryValues)
        this.cliente.end
        let respuesta = query
        return respuesta
    }
    public async salida(placa: string) {
        const queryValues = [placa]
        const query = await this.cliente.query('UPDATE vehiculo SET sigueenuso=false where sigueenuso=true and placa = $1;', queryValues)
        this.cliente.end
        let respuesta = query
        console.log(respuesta)
        return respuesta
    }
    public async registrarPago(placa: string, idPago: string, valorPagado: number) {
        let hoy: number = Date.now()
        let queryValues = [valorPagado, hoy, idPago]
        const pago = await this.cliente.query('INSERT INTO pago(valorpagado,fechahorapago,idpago) values ($1,$2,$3);', queryValues)

        const vehiculo = await this.consultarPlaca(placa)

        queryValues = [idPago, vehiculo.id]

        const actualizarVehiculo = await this.cliente.query('UPDATE vehiculo SET idpago=$1 where  id = $2;', queryValues)

        let respuesta = 'Pago registrado correctamente'

        return respuesta
    }


}
