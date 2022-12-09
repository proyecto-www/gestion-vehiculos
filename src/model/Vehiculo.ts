export default class Vehiculo {

    id: number
    fechahoraentrada: number
    placa: string
    fechahorasalida: number
    tiempoRestante: number
    tipodevehiculo: string

    constructor(id: number, fechahorasalida: number, placa: string, fechahoraentrada: number, tiempoRestante: number, tipodevehiculo: string) {
        this.id = id
        this.fechahorasalida = fechahorasalida
        this.placa = placa
        this.fechahoraentrada = fechahoraentrada
        this.tiempoRestante = tiempoRestante
        this.tipodevehiculo = tipodevehiculo
    }

}