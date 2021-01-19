
//vamos a crear nuestro primer servidor con express.js

//en la documentacion de express hay una guia de getting started.

// lo vamos a crear comom arquitectura REST. 

/*
1. Protocolo cliente-servidor, sin estado => HHTP
2.Métodos bien definidos ('GET, 'POST, 'DELETE....)
3. Sintazis universal (rutas, '/recurso/identificador')
4.Uso de hypermedios OK. 


*/

const express = require('express')

const fs = require('fs')

// const { request } = require('express') PREGUNTAR A CHARLES

const app = express() //esto nos crea un servidor como el de http.createServer


app.use(express.json()) // esto es un middelwares. Si la petición tiene en el header que es un json nos lo parsea. 

// para leer la informacion del archivo de koders
app.get('/koders', (req, res) => {
    // establece el header de la respuesta Content-type: application/json
    //stringify del objeto, el método json lo convierte en un string.
    // y solito pone el response.end()

    const kodersData = fs.readFileSync('koders.txt', 'utf8')
    res.json({
        succes: true,
        message: 'koders API',
        data: kodersData
    })
})


// para agregar un registro de koder al archivo
app.post('/koders', (req, res) => { 

    fs.appendFileSync('koders.txt', `\n${req.body.name}, ${req.body.age}`, 'utf8')
    console.log('body: ', req.body)

    console.log('name: ', req.body.name)
    res.json({
        succes: true,
        data: req.body
    })
})


app.listen(8080, () => {
    console.log('server listening on port 8080')
})
