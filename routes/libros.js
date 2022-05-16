const express = require('express');
const multer = require('multer');

let fecha = Date.now();

const rutaAlmacen = multer.diskStorage({

        destination: (request, file, callback) => {
            callback(null, './public/images/');

        },

        // filename se manda a llamar en el controller

        filename: (request, file, callback) => {
            console.log(file);
            callback(null, fecha + '_' + file.originalname);


        }
    })
var cargar = multer({ storage: rutaAlmacen });

const router = express.Router();
const librosController = require('../controllers/librosController');

/* GET home page. */
router.get('/', librosController.index);
router.get('/crear', librosController.crear);

/**Aquii se trae todo lo que es multer para poderse ajuntar, lo traemos de la vista y lo 
 * mandamos a llamar por le name */

router.post('/', cargar.single('archivo'), librosController.guardar);
router.post('/eliminar/:id',librosController.eliminar);
router.get('/editar/:id',librosController.editar);
router.post('/actualizar', cargar.single('archivo'), librosController.actualizar);

module.exports = router;
