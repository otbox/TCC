const express = require('express');
const App = express();
const bodyParser = require('body-parser'); //Traduz tudo para JSON
const mysql = require('mysql');
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'teste'
})

App.use(cors());
App.use(express.json());
App.use(bodyParser.urlencoded({extended: true}))

App.get('/',(req , res) => {
    res.send("Funfando")
})


App.post('/api/DeleteRegisters', (req,res) => {
    const id = req.body.id;
    
    const sqlDelete = "Delete from admins where id = ?"
    db.query(sqlDelete, id,(err,result) =>{
        console.log(result);
    })
})

App.post('/api/InsertRegister', (req,res) =>{
    const nome = req.body.name;
    const passw = req.body.passwd;

    const sqlInsert = "INSERT INTO user1 (Nome, Passw) VALUES (?,?)";
    db.query(sqlInsert, [nome,passw], (err,result) =>{
        console.log(result);
        console.log(err);
    })
})

App.get("/api/GetRegisters", (req , res) => {
    const SqlSelect = "SELECT * FROM user1";
    db.query(SqlSelect, (err,result) => {
        if (res.result === null) {
            res.send(false)
        }
        else {
            res.send(result)
        }
    })
})

App.post("/api/SelectRegister", (req , res) => {
    const name = req.body.name;
    const passw = req.body.passwd;
    const SqlSelect = "SELECT * FROM user1 where Nome = ? and Passw = ?";
    db.query(SqlSelect, [name, passw] , (err,result) => {
        if (result.length === 0) {
            console.log("nada encontrado")
            res.send(false)
        }else{
            console.log("encontrou")
            res.send(result)
        }
        
    })
})


App.post("/api/UpdateRegisters", (req,res) => {
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    const id = req.body.id;
    
    const SqlUpdate = "UPDATE `admins` SET `nome` = ?, `endereco` = ?,`telefone` = ? WHERE `admins`.`id` = ?";
    db.query(SqlUpdate,[nome,endereco,telefone,id], (err,result) =>{
        console.log(err)
    })
})

App.listen(3001, () => {
    console.log("rodando na 3001")
})