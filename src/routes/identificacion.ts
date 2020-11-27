import {Request, Response, Router } from 'express'
import { db } from '../database/database'

class Identificacion {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private ident = async (req: Request, res: Response) =>{
        const { password } = req.params
        const { user } = req.params
        setBD(true, user, password) 
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            res.send(mensaje)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    misRutas(){
        this._router.get('/:user&:password', this.ident) //Introducir el usuario y contraseña
    }
}

const setBD = async (local: boolean, userAtlas: string, passAtlas: string) => {
    const bdLocal = 'proyecto'
    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'Refugio' //Nombre de la colección
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.7gnbs.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

const obj = new Identificacion()
obj.misRutas()
export const identificacion = obj.router
