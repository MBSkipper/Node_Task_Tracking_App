const express = require('express') 
const router = express.Router() 

const {
    getTasks, 
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/task')

/*GET API*/
router.get('/', getTasks) 

/*POST API*/
router.post('/', createTask) 

/*PATCH API*/
router.patch('/:id', updateTask) 

/**DELETE API */
router.delete('/:id', deleteTask) 


module.exports = router

/*
NOTES
Line 1 - const express = require('express') //gives access to express
Line 2 - const router = express.Router() //gives access to express router method
Lines 4 - 8 - imported modules
Line 10 - router.get('/', getTasks) // this effectively means localhost:3000/tasks because tasks is named as the main route in index.js line 18
Line 16 - router.patch('/:id', createTask) - only '/:id' is required rather than '/tasks/:id' because '/' already refers to tasks - see line 10 above and refer to API's required  notes on lines 55 - 59 of index.js

*/