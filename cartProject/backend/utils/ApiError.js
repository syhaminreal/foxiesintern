class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [], // Fixed parameter name from error to errors
        stack = "" // Fixed typo from statck to stack
    ) {
        super(message)
        this.statusCode = statusCode // Fixed typo in property name from stausCode to statusCode
        this.data = null
        this.message = message
        this.success = false // Fixed typo from suceess to success
        this.errors = errors // Fixed recursion issue and assigned parameter errors to this.errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
