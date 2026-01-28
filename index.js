const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({
        status: 'OK. App is running',
        now: new Date()
    })
})

app.listen(3000, () => {
    console.log('task manager app is ready to use on http://localhost3000')
})