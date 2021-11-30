const db = require('./sequelize/models')
const { Op } = require("sequelize")
const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, '/../build')))
app.use(express.json())

app.get('/api/users', async (request, response) => {
    const users = await db.User.findAll()
    response.json(users)
})

app.post('/api/users', async (request, response) => {
    try {
        await db.User.create(request.body)
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.delete('/api/users', async (request, response) => {
    try {
        await db.User.destroy({
            where: {
                id: { [Op.or]: request.body.ids }
            }
        })
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
