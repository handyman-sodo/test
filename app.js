const http = require('http')
const express = require('express')
const cors = require('cors')
const { DataSource } = require('typeorm')
const mysql = require('mysql')

const app = express()
app.use(cors())
app.use(express.json)

const serverData = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    database: 'test'
})
// 환영 인사
app.get('/', (req, res) => {
    try {
        res.status(200).json({ 'message': "welcome" })
    } catch (error) {
        console.log(error)
    }
})

app.post('/signUp', async (req, res) => {
    try {
        const { name, email, password } = res.body

        if (password === undefined || email === undefined) {
            const error = new Error("공란있어요")
            error.statusCode = 400
            throw error
        }

        if (password.length < 8) {
            const error = new Error("8자 이상!")
            error.statusCode = 400
            throw error
        }

        const alreadyHas = await res.serverData.query(`
        SELECT email FROM users LIKE "${email}";
        `)

        if (email.length == !0) {
            const error = new Error("중복중복")
            error.statusCode = 400
            throw error
        }

        if (email.includes('@') == false) {
            const error = new Error("@안들어감")
            error.statusCode = 400
            throw error
        }

        const newbie = await res.serverData.query(`
        INSERT INTO users
        (name, email, password) VALUES 
        ('${name}','${email}','${password}') 
        `)
        return res.status(201).json({ 'message': "석세수~" })
    } catch (error) {
        console.log(error)
    }
})

