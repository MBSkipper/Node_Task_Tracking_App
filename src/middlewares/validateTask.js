const validateTask = ( req, res, next) => {
    const { text } = req.body

    if(!text || text.length < 3) {
        return res.status(400).json({
            status: 'FAILED',
            message: 'Text must have at least 3 characters'
        })
    }

    next()
}

module.exports = validateTask

