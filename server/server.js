const db = require('./sequelize/models')
const { Op } = require("sequelize")
const express = require('express')
const path = require('path')
const session = require("express-session")

const SequelizeStore = require("connect-session-sequelize")(session.Store)
var sequelizeStore = new SequelizeStore({
    db: db.sequelize,
})

const app = express()
app.use(express.static(path.join(__dirname, '/../build')))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_STORE_SECRET,
    store: sequelizeStore,
    resave: false,
    proxy: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: true,
    rolling: true,
}))
sequelizeStore.sync()

app.get('/api/session', async (request, response) => {
    response.json({ username: request.session.username })
})

app.post('/api/session', async (request, response) => {
    if (request.body.logOut) {
        request.session.destroy()
        response.json({ success: true })
    } else {
        const user = await db.User.findOne({
            where: { email: request.body.email },
        })
        if (user === null) {
            response.json({ error: "No such user." })
        } else if (request.body.password !== user.password) {
            response.json({ error: "Incorrect password." })
        } else {
            request.session.username = user.name
            response.json({ username: user.name })
        }
    }
})

app.get('/api/users', async (request, response) => {
    const users = await db.User.findAll()
    response.json(users)
})

app.post('/api/users', async (request, response) => {
    try {
        await db.User.create(request.body)
        if (request.body.logIn) {
            request.session.username = request.body.name
        }
        response.json({ username: request.body.name })
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

app.get('/api/profiles', async (request, response) => {
    if (!request.session.username) response.json([])
    try {
        const user = await db.User.findOne({
            where: { name: request.session.username },
            include: db.Profile
        })
        response.json(user.Profiles)
    } catch (error) {
        response.json([])
    }
})

app.post('/api/profiles', async (request, response) => {
    console.log(request.body)
    if (!request.session.username) response.json({ success: false })
    try {
        const user = await db.User.findOne({
            where: { name: request.session.username },
        })
        await db.Profile.create({ ...request.body, UserId: user.id })
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.put('/api/profiles/:id', async (request, response) => {
    if (!request.session.username) response.json({ success: false })
    try {
        const user = await db.User.findOne({
            where: { name: request.session.username },
        })
        await db.Profile.update(
            { ...request.body, UserId: user.id },
            { where: { id: request.params.id } }
        )
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.delete('/api/profiles/:id', async (request, response) => {
    try {
        await db.Profile.destroy({
            where: { id: request.params.id }
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
