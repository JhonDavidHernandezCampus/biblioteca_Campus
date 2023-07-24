import Express  from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {Usuarios} from './../controllerDTO/usuario.js';
import jwt from './../controller/jwt.js';

const proxyusuario = Express();

proxyusuario.use(jwt.validartoken,(req,res,next)=>{
    try {
        let data = plainToClass(Usuarios, req.body,{excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data))
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})

export default proxyusuario;
