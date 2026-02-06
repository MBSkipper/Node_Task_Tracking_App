let TASKS = [
    {
        id: 1,
        text: 'Select the lunch menu',
        completed: true
    },
    {
        id: 2,
        text: 'Shop for ingredients',
        completed: false
    },
    {
        id: 3,
        text: 'Send out lunch invitations',
        completed: true
    },
    {
        id: 4,
        text: 'Cook the starter and main course',
        completed: false
    },
    {
        id: 5,
        text: 'Cook the dessert and freeze it',
        completed: false
    },
    {
        id: 6,
        text: 'Defrost the dessert',
        completed: false
    },
    {
        id: 7,
        text: 'Host the lunch',
        completed: false
    },
    {
        id: 8,
        text: 'Clear up',
        completed: false
    },
    {
        id: 9,
        text: 'Set up tables and chairs',
        completed: false
    }
]

let taskCounter = 10

/**GET - gets a list of tasks */
const getTasks = (req, res) => {

    /*filtering */
    const { searchText, completed } = req.query
    
    let tasks = [...TASKS]
    if(searchText) {
        const search = String(searchText).toLowerCase()
        tasks = tasks.filter(t => String(t.text).toLowerCase().includes(search))
    }

     if(completed != undefined) {
        let completedBoolean = completed == 'false' ? false : true
        tasks = tasks.filter(t => t.completed == completedBoolean)
     }

    /*response */
    res.json({
        status: 'Success',
        data: tasks
    })
}

/**POST creates a new task*/
const createTask = (req, res) => {
    
    const { text } = req.body 

    const newTask = {
        id: taskCounter++, 
        text,
        completed: false 
    }
    TASKS.push(newTask)

     res.json({           
        status: 'SUCCESS',
        message: 'Task added successfully!'
     })
}
/**PATCH - updates a task */
const updateTask = (req, res) => {
    const { id } = req.params //ensure params is plural!!
    const { text, completed } = req.body 

    let existingTask = TASKS.find(t => t.id == id)
    if(!existingTask) {
        return res.status(404).json({
            status: 'FAILED',
            message: 'Task not found'
        })
    }

    if (text) {
        existingTask.text = text
    }

    if(completed != undefined) {
        existingTask.completed = completed == 'false' ? false : true
    }

     res.json({           
        status: 'SUCCESS',
        message: 'Task updated successfully!'
     })
}

/**DELETE - deletes a task*/
const deleteTask = (req, res) => {
    const { id } = req.params //ensure params is plural!!

    let existingTask = TASKS.find(t => t.id == id)
    if(!existingTask) {
        return res.status(404).json({
            status: 'FAILED',
            message: 'Task not found'
        })
    } 

    TASKS = TASKS.filter(t => t.id != id)

     res.json({           
        status: 'SUCCESS',
        message: 'Task deleted successfully!'
     })
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}

/*
NOTES 
ARRAY AND COUNTER
Line 1 - /* DATA ARRAY - In app data provided in an array as no database is attached. Note it is declared with 'let' so that Postman requests will work.  Normally data would be provided in a database and attached in a Model file within the src file.  This model file would be accessible in index.js as well as route and controller files
Line 49 - let taskCounter = 10 - initial value = 10 as there are already 9 tasks in the tasks array

GET API + Search filters
Line 55 - 66  - this is the filtering function for search text or completed
            const { searchText, completed } = req.query
    
                let tasks = [...TASKS]
                if(searchText) {
                const search = String(searchText).toLowerCase()
                tasks = tasks.filter(t => String(t.text).toLowerCase().includes(search))
    }

this code enables the database to be filtered, so if no searchText is provided there is no filtering, but if it is (line58) then in line 59 the search term is made a string and lower case so that capitals do not matter. In line 60 tasks is filtered to those tasks with the searchText (Line 60).  
Line 57 - let tasks = [...TASKS] - creates a local copy of TASKS (use of spread operator here is important because an array is non-primitive data) which is then filtered so that the original TASKS array is not altered by the search filter.
Line 63 - 66 this is the search filter for completed tasks.  
Line 64 - turns a string into a boolean
Line 65 - filters the tasks that match the selected boolean
Line 69 - 72 this is the json response element of the GET request which will begin with (line 70) status: SUCCESS followed by (line 71) the data for tasks


POST API
Lines 75 - 91 comprise the POST API
Line 78 - const { text } = req.body //request - this gets a list of tasks
Line 80 - 85 - const newTask = {
        id: taskCounter++, //increments onwards from 9 existing tasks plus any new ones added
        text,
        completed: false //default value
Line 85 - TASKS.push(newTask) pushes the newly created task into the TASKS array

Line 87 - 90 - res.json({           //response to client
        status: 'SUCCESS',
        message: 'Task added successfully!'
     })

PATCH API
Line 94 - const { id } = req.params - this destructured variable has access to the id via req.params.  Ensure params is plural or this will not work
Line 95 - const { text, completed } = req.body  - the variables text and completed are required from the body of each document
Line 97 - let existingTask = TASKS.find(t => t.id == id) finds id for const id on line 94.  The == will enable type convertion from number to string as this is not strict equality.  Eg it will check for say, string '5' against numerical 5 in the data array.  An alternative would be to write code as let existingTask = TASKS.find(t => t.id === Number(id)
Line 98 - 101 If the task is not found the status code 404 is sent along with the json() response message
Line 105 - 106 - checks that there is no falsy value ie null, undefined, or '' and then ensures the existing text field is replaced with the updated text field

Line 109 - 110 - here completed is a boolean value, so to avoid the default false value being misinterpreted, this is a hard check to ensure the value is not undefined, so whatever is the value of completed given then enable the value to be updated.  Also there is a check to ensure that the string 'false' is converted to boolean false.Remember a non empty string is always true so even string "false" would be interpreted as true.

DELETE API
Line 123 - 128 - checks that there is no falsy value for the id ie the id does not exist - it it does not exist the error message is shown

Line 131 - this filters out the task with the id that you want removed and presents an array that excludes it

EXPORTS
Lines 139 - 144 - note that we are using common module JS system below for exporting modules

*/

