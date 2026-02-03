const express = require('express') //gives access to express
const router = express.Router() //gives access to express router method

const {
    getTasks, 
    createTask
} = require('../controllers/task')

/*GET API*/
router.get('/', getTasks) // do not name the route here it is named in index.js in this code:  app.use('/tasks', taskRoutes)

/*POST API*/
router.post('/', createTask) 

module.exports = router