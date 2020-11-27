"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutasAnimales = void 0;
const express_1 = require("express");
const Animal_1 = require("../model/Animal");
const database_1 = require("../database/database");
class rutasAnimales {
    constructor() {
        this.getAnimales = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Animal_1.Animales.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.animalnuevoPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { nombre, especie, peso, altura, curado, operaciones } = req.body;
            console.log(nombre);
            const dSchema = {
                _nombre: nombre,
                _especie: especie,
                _peso: parseInt(peso),
                _altura: parseInt(altura),
                _curado: curado,
                _operaciones: parseInt(operaciones)
            };
            console.log(dSchema);
            const oSchema = new Animal_1.Animales(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Tenemos un nuevo animal: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Algo salió mal: ' + err);
                res.send('Algo salió mal: ' + err);
            });
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    // private nuevoTrianguloGet = async (req: Request, res: Response) => {
    //     const { nombre, base, altura, lado1, lado2 } = req.params
    //     console.log(req.params)
    //     await db.conectarBD()
    //     const dSchema = {
    //         _nombre: nombre,
    //         _base: parseInt(base),
    //         _lado2: parseInt(lado1),
    //         _lado3: parseInt(lado2),
    //         _altura: parseInt(altura)
    //     }
    //     const oSchema = new Triangulos(dSchema)
    //     await oSchema.save()
    //     .then( (doc) => {
    //         console.log('Salvado Correctamente: '+ doc)
    //         res.json(doc)
    //     })
    //     .catch( (err: any) => {
    //         console.log('Error: '+ err)
    //         res.send('Error: '+ err)
    //     }) 
    //     // concatenando con cadena muestra sólo el mensaje
    //     await db.desconectarBD()
    // }  
    // private getArea = async (req: Request, res: Response) => {
    //     let triangulo: Triangulo
    //     let sup: number = 0
    //     const { nombre } = req.params
    //     await db.conectarBD()
    //     .then( async (mensaje) => {
    //         console.log(mensaje)
    //         await Triangulos.findOne({_nombre: {$eq: nombre}},
    //             (error, doc: any) => {
    //                 if(error) {
    //                     console.log(error)
    //                     res.json({"error": "mensaje: "+error})
    //                 }else{
    //                     if (doc == null) {
    //                         console.log('No existe')
    //                         res.json({})
    //                     }else {
    //                         console.log('Existe: '+ doc)
    //                         triangulo = 
    //                             new Triangulo(doc._nombre, doc._base, 
    //                                 doc._lado2, doc._lado3)
    //                         triangulo.altura = doc._altura  
    //                         sup = triangulo.area()
    //                         res.json({"nombre": nombre, "area": sup})
    //                     }
    //                 }
    //             }
    //         )
    //     })
    //     .catch((mensaje) => {
    //         res.send(mensaje)
    //         console.log(mensaje)
    //     })
    //     db.desconectarBD()
    // }
    // private getAreav2 = async (req: Request, res: Response) => {
    //     const { nombre } = req.params
    //     await db.conectarBD()
    //     .then( async (mensaje) => {
    //         console.log(mensaje)
    //         const query: any = await Triangulos.findOne({_nombre: nombre})
    //         if (query == null){
    //             console.log(query)
    //             res.json({})
    //         }else{
    //             const triangulo = new Triangulo(query._nombre, query._base, 
    //                 query._lado2, query._lado3)
    //             triangulo.altura = query._altura  
    //             console.log(triangulo)
    //             res.json({"nombre": triangulo.nombre, "area": triangulo.area()})
    //         }
    //     })
    //     .catch((mensaje) => {
    //         res.send(mensaje)
    //         console.log(mensaje)
    //     })
    //     db.desconectarBD()
    // }
    // private getDelete = async (req: Request, res: Response) => {
    //     const {nombre } = req.params
    //     await db.conectarBD()
    //     await Triangulos.findOneAndDelete(
    //         { _nombre: nombre }, 
    //         (err: any, doc) => {
    //             if(err) console.log(err)
    //             else{
    //                 if (doc == null) {
    //                     console.log(`No encontrado`)
    //                     res.send(`No encontrado`)
    //                 }else {
    //                     console.log('Borrado correcto: '+ doc)
    //                     res.send('Borrado correcto: '+ doc)
    //                 }
    //             }
    //         })
    //     db.desconectarBD()
    // }
    // private getAreas =  async (req: Request, res: Response) => {
    //     type tDoc = {
    //         nombre: String,
    //         area: Number
    //     }
    //     let arrayT: Array<tDoc> = new Array<tDoc>()
    //     await db.conectarBD()
    //     let tmpTriangulo: Triangulo
    //     let dTriangulo: any 
    //     const query =  await Triangulos.find( {} )
    //     for (dTriangulo of query){
    //         tmpTriangulo = 
    //             new Triangulo(dTriangulo._nombre, dTriangulo._base, 
    //                     dTriangulo._lado2, dTriangulo._lado3)
    //         tmpTriangulo.altura = dTriangulo._altura 
    //         const doc: tDoc = {
    //             nombre:  dTriangulo._nombre,
    //             area: tmpTriangulo.area()
    //         }
    //         arrayT.push(doc)
    //         console.log(`Triángulo ${tmpTriangulo.nombre} Área: ${tmpTriangulo.area()}`)
    //     }
    //     console.log(arrayT)
    //     res.json(arrayT)
    //     await db.desconectarBD()   
    // }
    // private actualiza = async (req: Request, res: Response) => {
    //     const { nombre } = req.params
    //     const { base, altura, lado2, lado3 } = req.body
    //     await db.conectarBD()
    //     await Triangulos.findOneAndUpdate(
    //             { _nombre: nombre }, 
    //             {
    //                 _nombre: nombre,
    //                 _base: base,
    //                 _lado2: lado2,
    //                 _lado3: lado3,
    //                 _altura: altura
    //             },
    //             {
    //                 new: true,
    //                 runValidators: true // para que se ejecuten las validaciones del Schema
    //             }  
    //         )
    //         .then( (docu) => {
    //                 if (docu==null){
    //                     console.log('El triangulo que desea modificar no existe')
    //                     res.json({"Error":"No existe: "+nombre})
    //                 } else {
    //                     console.log('Modificado Correctamente: '+ docu) 
    //                     res.json(docu)
    //                 }
    //             }
    //         )
    //         .catch( (err) => {
    //             console.log('Error: '+err)
    //             res.json({error: 'Error: '+err })
    //         }
    //         ) // concatenando con cadena muestra mensaje
    //     db.desconectarBD()
    // }
    misRutas() {
        this._router.get('/', this.getAnimales);
        this._router.get('/nuevo', this.animalnuevoPost);
    }
}
const obj = new rutasAnimales();
obj.misRutas();
exports.RutasAnimales = obj.router;
