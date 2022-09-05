const express = require('express')
const Container = require('./clases.js')
//Instanciamos nuestra clase
const products = new Container('products.txt')
 
const app = express()

app.get('/', (req, res) => {
    res.send('Desafio 3')
})

app.get('/products', async (req, res) => {
    let allProducts = await products.getAll()
    res.send(allProducts)
})

app.get('/productRandom', async(req, res) => {
    res.send(await products.getRandom())
})

const server = app.listen(8080, ()=>{
    console.log( `Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))