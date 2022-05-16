const express = require('express');
const router = express.Router();
// const librosController = require('../controllers/librosController'); 

/* GET home page. */
router.get('/',(req,res,next) => {
    res.send('Bienvenido a la biblioteca');
});

module.exports = router;
