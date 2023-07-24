import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsEmail, IsNumber } from 'class-validator';

/* 
{
    "id_usuario":322,
    "nombre_usuario":"CarAlmeida121",
    "email":"jhon@gamil.com",
    "fk_id_genero":1,
    "camp_nombre":"Jhon calos Almeida",
    "camp_direccion":"Floridablanca la casa blanca",
    "camp_telefono":"3224757536",

    otros
    "nombre_comprador":"Jhon calos Almeida",
    "compra_direccion":"Floridablanca la casa blanca",
    "compra_telefono":"3224757536",
}
*/

export class Usuarios{

    @Expose({name: 'id_usuario'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_usuario no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    id_usuario?: number;

    @Expose({name : 'nombre_usuario'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro nombre_usuario no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    nombre_usuario?:string;
    
    @Expose({name:'email'})
    @IsEmail()
    @Transform(
        ({ value })=>{if(/\S+@\S+\.\S+/.test(value)) return value; else throw {status:200 , message: "El parametro email no cumple con los requerimientos establecidos"};
    }, {toClassOnly:true})
    email?:string;

    @Expose({name: 'fk_id_genero'})
    @Transform(
        ({ value })=>{if(Math.floor(value) && typeof value === 'number') return Math.floor(value); else throw {status:400, message:"El parametro genero no cumple con las condiciones necesarias"};
    },{toClassOnly:true})
    fk_id_genero?:number;

    @Expose({name:'camp_nombre'})
    @Transform(
        ({ value })=>{
            if(value === undefined) return value;
            if(/^[a-z A-Z]+$/.test(value)) return value; else throw {status: 400, message:"El parametro camp_nombre no cumple con lo requerimientos espesificos"};
        },{toClassOnly:true})
    camp_nombre?:string;

    @Expose({name:'camp_direccion'})
    @IsString()
    @IsNotEmpty({message:"La direccion no puede estar vacia"})
    @Matches(/^[0-9]+[a-zA-Z0-9\s\-\,]*$/,{message:""})
    camp_direccion?:string;

    @Expose({name:'camp_telefono'})
    @Transform(
        ({ value })=>{
            if(value === undefined) return value;
            if(/^[0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro camp_telefono no cumple con als espesificacion requeridas"};
        },{toClassOnly:true})
    camp_telefono?:string;

    @Expose({name:'nombre_comprador'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z]+$/.test(value)) return value; else throw {status:400, message:"El parametro nombre no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    nombre_comprador?:string;

    @Expose({name:'compra_direccion'})
    @IsString()
    @IsNotEmpty({message:"La direccion no puede estar vacia"})
    @Matches(/^[0-9]+[a-zA-Z0-9\s\-\,]*$/,{message:""})
    compra_direccion?:string;

    @Expose({name:'compra_telefono'})
    @Transform(
        ({ value })=>{
            if(value === undefined) return value;
            if(/^[0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro camp_telefono no cumple con als espesificacion requeridas"};
        },{toClassOnly:true})
    compra_telefono?:string;

    constructor(
        id_usuario?:number,
        nombre_usuario?:string,
        email?:string,
        fk_id_genero?:number,
        camp_nombre?:string,
        camp_direccion?:string,
        camp_telefono?:string,
        nombre_comprador?:string,
        compra_telefono?:string

    ){
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.email= email;
        this.fk_id_genero = fk_id_genero;
        this.camp_nombre = camp_nombre;
        this.camp_direccion = camp_direccion;
        this.camp_telefono = camp_telefono;
        this.nombre_comprador = nombre_comprador;
        this.compra_telefono = compra_telefono;
    }
}