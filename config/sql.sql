CREATE DATABASE biblioteca_prueba;
use biblioteca_prueba;
DROP DATABASE biblioteca_prueba;

CREATE TABLE nacionalidad(
    id_nacionalidad INT PRIMARY KEY AUTO_INCREMENT,
    nombre_pais VARCHAR(50),
    nombre_gentilicio VARCHAR(30)
);
CREATE TABLE editorial(
    id_edi INT PRIMARY KEY AUTO_INCREMENT,
    nombre_edi VARCHAR(100),
    descripcion VARCHAR(300)
);
CREATE TABLE autor(
    id_aut INT PRIMARY KEY,
    nombre_aut VARCHAR(50),
    edad_aut INT,
    email_aut VARCHAR(100),
    direccion_aut VARCHAR(150),
    lugar_nac_aut VARCHAR(100),
    fk_editorial INT,
    fk_nacionalidad INT,
    CONSTRAINT fk_edi_aut FOREIGN KEY (fk_editorial) REFERENCES editorial(id_edi),
    CONSTRAINT fk_nacio_aut FOREIGN KEY (fk_nacionalidad) REFERENCES nacionalidad(id_nacionalidad)
);

CREATE TABLE categoria(
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(30)
);

CREATE TABLE estado_libro(
    id_estado INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50),
    nombre_estado VARCHAR(20)
);
CREATE TABLE libro(
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    nombre_libro VARCHAR(30),
    descripcion_libro  VARCHAR(500),
    fecha_libro DATE,
    num_paginas INT,
    fk_autor_libre INT,
    fk_categoria_libro INT,
    fk_estado_libro INT,
    CONSTRAINT fk_aut_libro FOREIGN KEY (fk_autor_libre) REFERENCES autor(id_aut),
    CONSTRAINT fk_categoria_libro FOREIGN KEY (fk_categoria_libro) REFERENCES categoria(id_categoria),
    CONSTRAINT fk_esta_libro FOREIGN KEY (fk_estado_libro) REFERENCES estado_libro(id_estado)
);

CREATE TABLE usuario(
    id_usu INT PRIMARY KEY,
    nombre_usu VARCHAR(50),
    edad_usu INT,
    email_usu VARCHAR(60),
    direccion VARCHAR(100)
);

CREATE TABLE cargo(
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_cargo VARCHAR(50),
    fk_usuario INT,
    CONSTRAINT fk_user_cargo FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usu)
);



CREATE TABLE prestamo(
    id_pres INT PRIMARY KEY AUTO_INCREMENT,
    fecha_inicial_pres DATE,
    fehca_final_pres DATE,
    fk_user INT,
    fk_libro_prestamo INT,
    CONSTRAINT fk_user_presta FOREIGN KEY (fk_user) REFERENCES usuario(id_usu),
    CONSTRAINT fk_libro_presta FOREIGN KEY (fk_libro_prestamo) REFERENCES libro(id_libro)
);

CREATE TABLE reserva(
    id_res INT PRIMARY KEY AUTO_INCREMENT,
    fecha_reserva DATE,
    fk_user INT,
    fk_libro_reserva INT,
    CONSTRAINT fk_user_reserva FOREIGN KEY (fk_user) REFERENCES usuario(id_usu),
    CONSTRAINT fk_libro_reserva FOREIGN KEY (fk_libro_reserva) REFERENCES libro(id_libro)

);

# Consultas
#2. Obtener todos los autores y su nacionalidad.
SELECT * FROM autor a
INNER JOIN nacionalidad n 
ON n.id_nacionalidad = a.id_aut;

# 3. Listar todas las categorías disponibles.
SELECT * FROM categoria;

# 4. Mostrar todas las editoriales y sus direcciones.
SELECT * FROM editorial;

# 5. Obtener los estados de los libros y sus descripciones.

SELECT * FROM libro l 
INNER JOIN estado_libro e
ON e.id_estado = l.fk_estado_libro;


# 6. Mostrar todos los libros con su título, autor y editorial.

SELECT l.nombre_libro titulo_libro, a.nombre_aut Nombre_autor, e.nombre_edi Nombre_editorial 
FROM libro l 
INNER JOIN autor a 
ON l.fk_autor_libre = a.id_aut
INNER JOIN editorial e ON a.fk_editorial=e.id_edi; 

# 7. Listar los préstamos realizados con fecha de préstamo,
# fecha de devolución y estado.
SELECT p.id_pres,p.fecha_inicial_pres fecha_prestamo,p.fehca_final_pres fecha_entrega 
FROM prestamo p;


# 8. Obtener todas las reservas realizadas con su fecha de
# reserva y estado.

SELECT r.id_res,r.fecha_reserva 
FROM reserva r;


# 9. Mostrar los libros disponibles para préstamo con su título y
# autor. 
SELECT l.nombre_libro , e.nombre_estado,a.nombre_aut FROM libro l 
INNER JOIN estado_libro e
ON e.id_estado = l.fk_estado_libro
INNER JOIN autor a 
ON l.fk_autor_libre = a.id_aut
WHERE e.nombre_estado  LIKE '%DISPONIBLE%' OR e.nombre_estado  LIKE '%disponible%' ;

# 10.Obtener los libros prestados y su fecha de devolución.


SELECT * FROM libro l 
INNER JOIN estado_libro e
ON e.id_estado = l.fk_estado_libro
INNER JOIN prestamo p 
ON  l.id_libro = p.fk_libro_prestamo 
WHERE  e.nombre_estado  LIKE '%USADO%' OR e.nombre_estado  LIKE '%usado%';



# 11.Listar los usuarios y sus correos electrónicos.

SELECT u.email_usu Email_usuario,u.* FROM usuario u;

# 12.Mostrar los libros escritos por un autor específico (ejemplo:
# Gabriel García
SELECT * FROM libro l 
INNER JOIN autor a 
ON l.fk_autor_libre = a.id_aut
WHERE a.nombre_aut LIKE '%Autor 1%';

# 13.Obtener los libros de cierta categoría (ejemplo: Novela).

SELECT * FROM libro l 
INNER JOIN categoria c 
ON l.fk_categoria_libro = c.id_categoria
WHERE c.nombre_categoria LIKE '%Catego%';

SELECT * FROM categoria;


# 14.Listar los préstamos realizados por un usuario (ejemplo:
# Juan Pérez).



# 15.Mostrar los libros con más de 500 páginas y su autor.
SELECT * FROM libro l 
INNER JOIN autor a 
ON l.fk_autor_libre = a.id_aut
WHERE l.num_paginas > 500;

# 16.Obtener los libros prestados a un usuario específico
# (ejemplo: María Gómez). 
SELECT * FROM libro l 
INNER JOIN prestamo p 
ON l.id_libro = p.fk_libro_prestamo 
INNER JOIN usuario u
ON u.id_usu = p.fk_user 
WHERE u.nombre_usu LIKE '%Usuario 1%';

SELECT * FROM usuario;
# insercion de data 

INSERT INTO nacionalidad (nombre_pais, nombre_gentilicio) VALUES
    ('España', 'Español'),
    ('Estados Unidos', 'Estadounidense'),
    ('Francia', 'Francés'),
    ('Alemania', 'Alemán'),
    ('Italia', 'Italiano');

INSERT INTO editorial (nombre_edi,descripcion) VALUES
    ('Editorial A', 'Esta es una editorial especializada en libros de ficción.'),
    ('Editorial B', 'Una editorial reconocida por sus libros de ciencia y tecnología.'),
    ('Editorial C', 'Una editorial que se enfoca en libros de autoayuda y desarrollo personal.'),
    ('Editorial D', 'Editorial con una amplia variedad de libros infantiles y juveniles.'),
    ('Editorial E', 'Una editorial líder en publicaciones académicas y científicas.');
INSERT INTO autor (id_aut, nombre_aut, edad_aut, email_aut, direccion_aut, lugar_nac_aut, fk_editorial, fk_nacionalidad) VALUES
    (12, 'Autor 112', 35, 'autor1@email.com', 'Dirección 1', 'Lugar 1', 1, 1),
    (22, 'Autor 212', 42, 'autor2@email.com', 'Dirección 2', 'Lugar 2', 2, 2),
    (32, 'Autor 312', 28, 'autor3@email.com', 'Dirección 3', 'Lugar 3', 3, 3),
    (42, 'Autor 412', 50, 'autor4@email.com', 'Dirección 4', 'Lugar 4', 4, 4),
    (52, 'Autor 512', 40, 'autor5@email.com', 'Dirección 5', 'Lugar 5', 5, 5);

INSERT INTO categoria (nombre_categoria) VALUES
    ('Categoría 1'),
    ('Categoría 2'),
    ('Categoría 3'),
    ('Categoría 4'),
    ('Categoría 5');

INSERT INTO estado_libro (descripcion, nombre_estado) VALUES
    ('Nuevo', 'NUEVO'),
    ('Usado en buen estado', 'USADO'),
    ('Desgastado', 'DESGASTADO'),
    ('Dañado', 'DAÑADO'),
    ('Esta en prestamo', 'PRESTADO'),
    ('Esta Disponible', 'DISPONIBLE'),
    ('En reparación', 'REPARACIÓN');
INSERT INTO libro (nombre_libro, descripcion_libro, fecha_libro, fk_autor_libre, fk_categoria_libro, fk_estado_libro) VALUES
    ('Libro 1', 'Este es un libro de aventuras emocionante...', '2023-01-15', 1, 1, 1),
    ('Libro 2', 'Una obra que explora la ciencia y el universo...', '2023-03-20', 2, 2, 2),
    ('Libro 3', 'Un libro para el crecimiento personal...', '2023-05-10', 3, 3, 3),
    ('Libro 4', 'Un cuento mágico para niños...', '2023-02-28', 4, 4, 4),
    ('Libro 5', 'Una obra académica sobre historia...', '2023-06-05', 5, 5, 5);

INSERT INTO usuario (id_usu, nombre_usu, edad_usu, email_usu, direccion) VALUES
    (1, 'Usuario 1', 25, 'usuario1@email.com', 'Dirección 1'),
    (2, 'Usuario 2', 30, 'usuario2@email.com', 'Dirección 2'),
    (3, 'Usuario 3', 40, 'usuario3@email.com', 'Dirección 3'),
    (4, 'Usuario 4', 22, 'usuario4@email.com', 'Dirección 4'),
    (5, 'Usuario 5', 28, 'usuario5@email.com', 'Dirección 5');

INSERT INTO prestamo (fecha_inicial_pres, fehca_final_pres, fk_user, fk_libro_prestamo) VALUES
    ('2023-07-01', '2023-07-15', 1, 1),
    ('2023-07-05', '2023-07-20', 2, 2),
    ('2023-07-10', '2023-07-25', 3, 3),
    ('2023-07-12', '2023-07-27', 4, 4),
    ('2023-07-18', '2023-08-02', 5, 5);

INSERT INTO reserva (fecha_reserva, fk_user, fk_libro_reserva) VALUES
    ('2023-07-10', 1, 1),
    ('2023-07-15', 2, 2),
    ('2023-07-20', 3, 3),
    ('2023-07-22', 4, 4),
    ('2023-07-25', 5, 5);

INSERT INTO cargo (nombre_cargo, fk_usuario) VALUES
('Gerente', 1),
('Supervisor', 2),
('Analista', 3),
('Asistente', 4),
('Ejecutivo', 5);
