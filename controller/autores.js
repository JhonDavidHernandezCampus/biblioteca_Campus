import Express from "express";
import conx from './../config/db.js';
import jwt from './../controller/jwt.js';
import proxyusuario from "../middleware/proxyUsuario.js";
const router = Express();


// 2. Obtener todos los autores y su nacionalidad.

router.get('/nacionalidad',jwt.validartoken , (req, res) => {
    let query = `SELECT * FROM autor a
    INNER JOIN nacionalidad n 
    ON n.id_nacionalidad = a.id_aut`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// # 3. Listar todas las categorías disponibles.
router.get('/categorias',jwt.validartoken , (req, res) => {
    let query = `SELECT * FROM categoria`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})


// # 4. Mostrar todas las editoriales y sus direcciones.
router.get('/editorial', jwt.validartoken ,(req, res) => {
    let query = `SELECT * FROM editorial`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// #  5. Obtener los estados de los libros y sus descripciones.
router.get('/estadolibro',jwt.validartoken , (req, res) => {
    let query = `
    SELECT * FROM libro l 
    INNER JOIN estado_libro e
    ON e.id_estado = l.fk_estado_libro`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// #  6. Mostrar todos los libros con su título, autor y editorial.
router.get('/libros',jwt.validartoken , (req, res) => {
    let query = `
    SELECT l.nombre_libro titulo_libro, a.nombre_aut Nombre_autor, e.nombre_edi Nombre_editorial 
    FROM libro l 
    INNER JOIN autor a 
    ON l.fk_autor_libre = a.id_aut
    INNER JOIN editorial e ON a.fk_editorial=e.id_edi;`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// #  # 7. Listar los préstamos realizados con fecha de préstamo,
// # fecha de devolución y estado.
router.get('/prestamos', jwt.validartoken ,(req, res) => {
    let query = `SELECT p.id_pres,p.fecha_inicial_pres fecha_prestamo,p.fehca_final_pres fecha_entrega 
    FROM prestamo p`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// # 8. Obtener todas las reservas realizadas con su fecha de
// # reserva y estado.
router.get('/reservas', jwt.validartoken ,(req, res) => {
    let query = `
    SELECT r.id_res,r.fecha_reserva 
    FROM reserva r;`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})


// # 9. Mostrar los libros disponibles para préstamo con su título y
// # autor. 
router.get('/libros/disponibles',jwt.validartoken ,(req, res) => {
    let query = `SELECT l.nombre_libro , e.nombre_estado,a.nombre_aut FROM libro l 
    INNER JOIN estado_libro e
    ON e.id_estado = l.fk_estado_libro
    INNER JOIN autor a 
    ON l.fk_autor_libre = a.id_aut
    WHERE e.nombre_estado  LIKE '%DISPONIBLE%' OR e.nombre_estado  LIKE '%disponible%' ;
    `;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})


// # 10.Obtener los libros prestados y su fecha de devolución.

router.get('/libros/prestados',jwt.validartoken ,(req, res) => {
    let query = `
    SELECT * FROM libro l 
    INNER JOIN estado_libro e
    ON e.id_estado = l.fk_estado_libro
    INNER JOIN prestamo p 
    ON  l.id_libro = p.fk_libro_prestamo 
    WHERE  e.nombre_estado  LIKE '%USADO%' OR e.nombre_estado  LIKE '%usado%'`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})


// #  11.Listar los usuarios y sus correos electrónicos.

router.get('/lista/usuarios',jwt.validartoken ,(req, res) => {
    let query = `SELECT u.email_usu Email_usuario,u.* FROM usuario u;`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})
// # 12.Mostrar los libros escritos por un autor específico (ejemplo:
// # Gabriel García

router.get('/libroautor/:autor',jwt.validartoken ,(req, res) => {
    let param = req.params.autor;
    let query = `SELECT * FROM libro l 
    INNER JOIN autor a 
    ON l.fk_autor_libre = a.id_aut
    WHERE a.nombre_aut LIKE '%${param}%';`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// # 13.Obtener los libros de cierta categoría (ejemplo: Novela).

router.get('/librocategoria/:categoria' ,jwt.validartoken, (req, res) => {
    let param = req.params.categoria;
    let query = `
    SELECT * FROM libro l 
    INNER JOIN categoria c 
    ON l.fk_categoria_libro = c.id_categoria
    WHERE c.nombre_categoria LIKE '%${param}%';`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})


// # 15.Mostrar los libros con más de 500 páginas y su autor.

router.get('/paginas' ,jwt.validartoken,(req, res) => {
    let query = `
    SELECT * FROM libro l 
    INNER JOIN autor a 
    ON l.fk_autor_libre = a.id_aut
    WHERE l.num_paginas > 500;`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

// # # 16.Obtener los libros prestados a un usuario específico
// # (ejemplo: María Gómez).

router.get('/prestamos/:nom_persona' ,jwt.validartoken,(req, res) => {
    let param = req.params.nom_persona;
    let query = `
        SELECT * FROM libro l 
        INNER JOIN prestamo p 
        ON l.id_libro = p.fk_libro_prestamo 
        INNER JOIN usuario u
        ON u.id_usu = p.fk_user 
        WHERE u.nombre_usu LIKE '%Usuario 1%';`;
    conx.query(query, (err, respuesta, fil) => {
        if (err) {
            console.log({ "Message": "Error al mostrar los pedidos", "Error": err });
            res.send({ "Message": "Error al mostrar los pedidos", "Error": err });
        } else {
            res.send(respuesta);
        }
    })
})

export default router;
