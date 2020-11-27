// `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.7gnbs.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`

import {Request, Response, Router } from 'express'
import { db } from '../database/database'

class IdentificacionRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getId = async (req: Request, res: Response) =>{
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
        this._router.get('/', this.getId)
    }
}


const obj = new IdentificacionRoutes()
obj.misRutas()
export const identificacion = obj.router