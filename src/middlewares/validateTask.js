const validateTask = ( req, res, next) => {
    const { text } = req.body

    if(!text || text.length < 3) {
        return res.status(400).json({
            status: 'FAILED',
            message: 'Text must contain at least 3 characters'
        })
    }
    next()
}

module.exports = validateTask


/*
NOTES
General - important to know which route to attach the middleware to. This middleware function is only attached to the POST and PATCH routes in routes/task.js.  Other middleware that applies to the whole app would be attached in index.js using app.use() as shown in line 20 there ie app.use('/tasks', taskRoutes) 

Lines 1-11 - this is a validate task function that ensures that text of at least 3 characters is included in the request.  It is imported into routes/task

Line 10 - IMPORTANT must ensure that next() is called after the function to ensure that the computer moves on to the next process so for example in ../routes/task.js the POST API       
    ie router.post('/', validateTask, createTask) 
will move from validateTask function onto the createTask handler, similarly in the PATCH API




*/

