const express = require('express');
const apiRoute = express();
const sheetFunc = require('../Functions/sheetFunction')

apiRoute.post('/postRate/:type/:event/:sheetid', (req, res) => {
    sheetFunc.postRateSheet(req.params,(err,result) => {
        if(err) {
            return res.status(500).send('Internal Server Error')
        }
        else {
            return res.status(200).send({result})
        }
    })
})

module.exports = apiRoute;