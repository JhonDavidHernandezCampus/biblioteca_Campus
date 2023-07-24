## Instruciones de como usar el api

### Diagrama de la base de datos
![Alt text](./img/diagrama.png)

# Manual para usar el API 
## !Advertencia para usar el api primero debes obtener un token de verificacion¡
- Method = GET
- Enpoint:  http://127.121.12.6:9103/token/:id/nombreUsusario
- Ejemplo:
```
http://127.121.12.6:9103/token/14/jhonhernandez322
```
La idea de hacer esto es que solo los usuarios com permisos segun la base de datos
pudean realizar determinadas acciones.
Una vez tengas tu token de verificacion debes colocarlo en un header llamado Authorization para que el api te pueda validar.

- Este endpoint te rotornara un token valido por media hora que te permitira usar el api.



###### Endpoind #1
- Method = GET
http://127.121.12.6:9103/autores/nacionalidad
- Este endpoind me muestra todos los autores y su nacionalidad


###### Endpoind #2
- Method = GET
http://127.121.12.6:9103/autores/categorias
- Este endpoind me muestra todas las categorias disponibles de los libros


###### Endpoind #3
- Method = GET
http://127.121.12.6:9103/autores/editorial
- Este endpoind me muestra todas las editoriales y sus direcciones


###### Endpoind #4
- Method = GET
http://127.121.12.6:9103/autores/estadolibro
- Este endpoind me muestra todos los estados de los libros y sus descripciones


###### Endpoind #5
- Method = GET
http://127.121.12.6:9103/autores/libros
- Este endpoind me muestra todos los estados de los libros y sus descripciones


###### Endpoind #6
- Method = GET
http://127.121.12.6:9103/autores/prestamos
- Este endpoind me muestra todos los préstamos realizados con fecha de préstamo.

###### Endpoind #7
- Method = GET
http://127.121.12.6:9103/autores/reservas
- Este endpoind me muestra todas las reservas realizadas con su fecha de reserva y estado


###### Endpoind #8
- Method = GET
http://127.121.12.6:9103/autores/libros/disponibles
- Este endpoind me muestra todas los libros disponibles para préstamo con su título y autor


###### Endpoind #9
- Method = GET
http://127.121.12.6:9103/autores/libros/disponibles
- Este endpoind me muestra todas los libros disponibles para préstamo con su título y autor


###### Endpoind #10
- Method = GET
http://127.121.12.6:9103/autores/libros/prestados
- Este endpoind me muestra todas los libros prestados y su fecha de devolución.

###### Endpoind #11
- Method = GET
http://127.121.12.6:9103/autores/lista/usuarios
- Este endpoind me muestra todas  los usuarios y sus correos electrónicos.

###### Endpoind #12
- Method = GET
http://127.121.12.6:9103/autores/libroautor/:autor

Ejemplo: http://127.121.12.6:9103/autores/libroautor/camilo
- Este endpoind me muestra todas  los libros escritos por un autor específico.


###### Endpoind #13
- Method = GET
http://127.121.12.6:9103/autores/librocategoria/:categoria

Ejemplo: http://127.121.12.6:9103/autores/libroautor/usado
- Este endpoind me muestra todas   los libros de cierta categoría

###### Endpoind #14
- Method = GET
http://127.121.12.6:9103/autores/paginas

- Este endpoind me muestra todas los libros con más de 500 páginas y su autor.

###### Endpoind #15
- Method = GET
http://127.121.12.6:9103/autores/prestamos/:nom_persona
Ejemplo: http://127.121.12.6:9103/autores/prestamos/andres

- Este endpoind me muestra todas os libros prestados a un usuario específico








