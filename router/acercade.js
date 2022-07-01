const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('acercade', {
        usuarioBD: {rol: req.session.rol} 
    })
})

module.exports = router;