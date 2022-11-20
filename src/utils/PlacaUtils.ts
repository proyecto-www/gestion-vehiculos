
export default class PlacaUtils {
    private tiposDePlaca:{ expresion: RegExp, tipoVehiculo: string }[] = []
    private placa: string


    constructor(placa: string) {
        this.placa = placa
        let carro = { expresion: new RegExp('[A-Z]{3}[0-9]{3}'), tipoVehiculo: 'Carro' }
        let moto = { expresion: new RegExp('[A-Z]{3}[0-9]{2}[A-Z]{1}'), tipoVehiculo: 'Moto' }
        this.tiposDePlaca.push(carro,moto)
    }
    public definirTipoVehiculo(): string {
        const tipoDeVehiculo: string | undefined = this.tiposDePlaca.find(regex => regex.expresion.test(this.placa))?.tipoVehiculo

        if (tipoDeVehiculo == undefined) {
            throw 'Placa Invalida'
        }


        return tipoDeVehiculo

    }
}