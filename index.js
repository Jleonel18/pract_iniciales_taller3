'use strict'

const express = require("express")
const mongoose = require("mongoose")
const Usuario = require("./src/models/user.model")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

app.get('/obtenerUsuarios',async(req,res)=>{
    var todosUsuarios
    todosUsuarios =  await Usuario.find()
    return res.status(200).json(todosUsuarios)
})

app.get("/obtenerHola", async (req, res) => {
    return res.json({ message: "Hello, World" });
});

app.post("/crearUsuario", async(req,res)=>{
    var nuevoUsuario = new Usuario({...req.body});
    var usuarioInsertado = await nuevoUsuario.save();
    return res.status(201).json(usuarioInsertado);
})

app.delete("/eliminarUsuario/:id",async(req,res)=>{
    var {id} = req.params
    var usuarioEliminado = await Usuario.findByIdAndDelete(id);
    return res.status(200).send(usuarioEliminado)
})

app.put("/editarUsuario/:id",async(req,res)=>{
    var {id} = req.params;
    var params = req.body
    await Usuario.updateOne({_id: id}, params);
    var usuarioActualizado = await Usuario.findById(id)
    return res.status(200).send(usuarioActualizado)
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/practInicialesTaller3',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family:4}).then(()=>{
    console.log("Se encuentra conectado a la base de datos")

    app.listen(3000,()=>{
        console.log("El servidor esta corriendo en el puerto 3000")
    })
}).catch(err=> console.log(err))