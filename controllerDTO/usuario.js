var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator';
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
export class Usuarios {
    constructor(id_usuario, nombre_usuario, email, fk_id_genero, camp_nombre, camp_direccion, camp_telefono, nombre_comprador, compra_telefono) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.email = email;
        this.fk_id_genero = fk_id_genero;
        this.camp_nombre = camp_nombre;
        this.camp_direccion = camp_direccion;
        this.camp_telefono = camp_telefono;
        this.nombre_comprador = nombre_comprador;
        this.compra_telefono = compra_telefono;
    }
}
__decorate([
    Expose({ name: 'id_usuario' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_usuario no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Usuarios.prototype, "id_usuario", void 0);
__decorate([
    Expose({ name: 'nombre_usuario' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro nombre_usuario no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuarios.prototype, "nombre_usuario", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsEmail(),
    Transform(({ value }) => {
        if (/\S+@\S+\.\S+/.test(value))
            return value;
        else
            throw { status: 200, message: "El parametro email no cumple con los requerimientos establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuarios.prototype, "email", void 0);
__decorate([
    Expose({ name: 'fk_id_genero' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El parametro genero no cumple con las condiciones necesarias" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Usuarios.prototype, "fk_id_genero", void 0);
__decorate([
    Expose({ name: 'camp_nombre' }),
    Transform(({ value }) => {
        if (value === undefined)
            return value;
        if (/^[a-z A-Z]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro camp_nombre no cumple con lo requerimientos espesificos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuarios.prototype, "camp_nombre", void 0);
__decorate([
    Expose({ name: 'camp_direccion' }),
    IsString(),
    IsNotEmpty({ message: "La direccion no puede estar vacia" }),
    Matches(/^[0-9]+[a-zA-Z0-9\s\-\,]*$/, { message: "" }),
    __metadata("design:type", String)
], Usuarios.prototype, "camp_direccion", void 0);
__decorate([
    Expose({ name: 'camp_telefono' }),
    Transform(({ value }) => {
        if (value === undefined)
            return value;
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro camp_telefono no cumple con als espesificacion requeridas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuarios.prototype, "camp_telefono", void 0);
__decorate([
    Expose({ name: 'nombre_comprador' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro nombre no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuarios.prototype, "nombre_comprador", void 0);
__decorate([
    Expose({ name: 'compra_direccion' }),
    IsString(),
    IsNotEmpty({ message: "La direccion no puede estar vacia" }),
    Matches(/^[0-9]+[a-zA-Z0-9\s\-\,]*$/, { message: "" }),
    __metadata("design:type", String)
], Usuarios.prototype, "compra_direccion", void 0);
__decorate([
    Expose({ name: 'compra_telefono' }),
    Transform(({ value }) => {
        if (value === undefined)
            return value;
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro camp_telefono no cumple con als espesificacion requeridas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuarios.prototype, "compra_telefono", void 0);
