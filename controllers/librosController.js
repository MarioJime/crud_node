const conexion = require('../config/conexion');
const libro = require('../model/libro');
const borrar = require('fs');//file system permite generar este borrado

module.exports = {

    index: (req, res) => {

        libro.obtener(conexion, (err, datos) => {
            console.log(datos);
            res.render('libros/index', { title: 'Aplicacion', libros: datos });

        })
    },
    crear: (req, res) => {
        res.render('libros/crear');
    },
    /**Se ocupara body parser, se ocupara para recepcionar los datos al darle en Guardar */
    guardar: (req, res) => {
        console.log(req.body);
        console.log(req.file.filename);

        libro.insertar(conexion, req.body, req.file, (err) => {
            res.redirect('/libros');

        })
    },
    eliminar: (req, res) => {
        console.log("Recepcion de datos");
        console.log(req.params.id);
        libro.retornarDatoId(conexion, req.params.id, (err, registros) => {
            //Obtener informacion de donde esta la imagen, mandamos un fuction para los registros y el error
            //retornarDatisID viene del modelo de libro

            var nombreImagen = "public/images/" + (registros[0].imagen);


            if (borrar.existsSync(nombreImagen)) { //-> esto nos va a permitir borrar el archivo, buscando primero el nombre
                borrar.unlinkSync(nombreImagen);
            }

            libro.borrar(conexion, req.params.id, (err) => {
                res.redirect('/libros');
            })
        });

    },

    editar: (req, res) => {
        /**Recoge los datos por el request params, por id y eso retorna registros y esos registros se devuelven a la vista */
        libro.retornarDatoId(conexion, req.params.id, (err, registros) => {
            console.log(registros[0]);
            res.render('libros/editar', { libro: registros[0] });


        })


    },

    actualizar: (req, res) => {
        console.log(req.body.nombre);
        if (req.file) {
            if (req.file.filename) {

                libro.retornarDatoId(conexion, req.body.id, (err, registros) => {
                    //Obtener informacion de donde esta la imagen, mandamos un fuction para los registros y el error
                    //retornarDatisID viene del modelo de libro

                    var nombreImagen = "public/images/" + (registros[0].imagen);


                    if (borrar.existsSync(nombreImagen)) { //-> esto nos va a permitir borrar el archivo, buscando primero el nombre
                        borrar.unlinkSync(nombreImagen);
                    }

                    libro.actualizarArchivo(conexion, req.body, req.file, (err) => { })
                });
            }

        }
        if (req.body.nombre) {
            libro.actualizar(conexion, req.body, (err) => {

            });
        }
        res.redirect('/libros');

    }
}


