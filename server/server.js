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
    response.json({
        name: request.session.username,
        isAdmin: request.session.isAdmin,
    })
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
            request.session.isAdmin = user.isAdmin
            response.json(user)
        }
    }
})

app.get('/api/users', async (request, response) => {
    try {
        if (!request.session.isAdmin) response.json([])
        const users = await db.User.findAll({
            attributes: {
                include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("Profiles.id")), "profilesCount"]]
            },
            include: [{
                model: db.Profile, attributes: []
            }],
            group: ['User.id'],
        })
        response.json(users)
    } catch (error) {
        response.json({ ...error })
    }
})

app.get('/api/users/:id/profiles', async (request, response) => {
    if (!request.session.isAdmin) response.json({ success: false })

    try {
        const user = await db.User.findOne({
            where: { id: parseInt(request.params.id) },
            include: [{ model: db.Profile }],
        })
        response.json(user)
    } catch (error) {
        response.json({ ...error })
    }
})

app.post('/api/users', async (request, response) => {
    try {
        const user = await db.User.create(request.body)
        if (request.body.logIn) {
            request.session.username = request.body.name
            request.session.isAdmin = request.body.isAdmin
        }
        response.json(user)
    } catch (error) {
        response.json({ ...error })
    }
})

app.put('/api/users/:id', async (request, response) => {
    if (!request.session.isAdmin) response.json({ success: false })
    try {
        const user = await db.User.findOne(
            { where: { id: request.params.id } },
        )
        if (user === null) response.json({ success: false })
        await user.update(request.body)
        // Log out the user if they change themself
        if (user.name === request.session.username) {
            request.session.destroy()
            response.json({ logOut: true })
        } else response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.delete('/api/users/:id', async (request, response) => {
    if (!request.session.isAdmin) response.json({ success: false })
    try {
        const user = await db.User.findOne({
            where: { id: request.params.id }
        })
        const username = user?.name
        await user.destroy()
        // If a user deletes themself we need to log them out
        if (username === request.session.username) {
            request.session.destroy()
            response.json({ logOut: true })
        } else response.json({ success: true })
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
    if (!request.session.username) response.json({ success: false })
    try {
        const { userId, ...profileData } = request.body
        const queryParams = userId ? { id: userId } : { name: request.session.username }
        const user = await db.User.findOne({
            where: queryParams,
        })
        if (
            user === null ||
            // Only admins are allowed to create profiles for other users
            ((request.session.username !== user.name) && !request.session.isAdmin)
        ) response.json({ success: false })
        await db.Profile.create({ ...profileData, UserId: user.id })
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.put('/api/profiles/:id', async (request, response) => {
    if (!request.session.username) response.json({ success: false })
    const queryParams = request.session.isAdmin ? {} : {
        include: [{
            model: db.User,
            where: { name: request.session.username }
        }]
    }
    try {
        await db.Profile.update(
            request.body,
            {
                ...queryParams,
                where: {
                    id: request.params.id
                }
            }
        )
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.delete('/api/profiles/:id', async (request, response) => {
    const queryParams = request.session.isAdmin ? {} : {
        include: [{
            model: db.User,
            where: { name: request.session.username }
        }]
    }
    try {
        await db.Profile.destroy({
            ...queryParams,
            where: {
                id: request.params.id,
            },
        })
        response.json({ success: true })
    } catch (error) {
        response.json({ ...error })
    }
})

app.get('/api/dashboard', async (request, response) => {
    if (!request.session.isAdmin) response.json({ success: false })
    try {
        const userCount = await db.User.count()
        const profileCount = await db.Profile.count({ where: { UserId: { [Op.ne]: null } } })
        const adultBirthdate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        const adultrofileCount = await db.Profile.count({
            where: {
                birthdate: {
                    [Op.lte]: adultBirthdate,
                },
                UserId: { [Op.ne]: null },
            },
        })
        response.json({
            userCount: userCount,
            profileCount: profileCount,
            adultrofileCount: adultrofileCount
        })
    } catch (error) {
        response.json({ ...error })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
