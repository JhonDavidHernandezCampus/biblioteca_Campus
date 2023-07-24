import express from 'express';
import ControllerAutores from './../controller/autores.js';
import jwt from './../controller/jwt.js';

const Routes = express.Router();

Routes.use('/token', jwt.jwt);
Routes.use('/autores', ControllerAutores);

export default Routes;