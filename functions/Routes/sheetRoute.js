const express = require('express');
const apiRoute = express();
const sheetFunc = require('../Functions/sheetFunction')

apiRoute.get('/sheet-rate/:sheetid', (req, res) => {
    sheetFunc.postRateSheet(req.params.sheetid,(err,result) => {
        if(err) {
            return res.status(500).send('Internal Server Error')
        }
        else {
            return res.status(200).send({result})
        }
    })
})

module.exports = apiRoute;