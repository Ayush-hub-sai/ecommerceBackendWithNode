// utils/errorHandler.js

const handleError = (res, error, customMessage = '') => {
    if (error.name === 'ValidationError') {
        // Handle validation error
        const errors = Object.keys(error.errors).map(field => ({
            field,
            message: error.errors[field].message
        }));
        return res.status(400).send({
            status: false,
            message: customMessage || 'Validation error occurred.',
            errors
        });
    }

    // General error response
    return res.status(500).send({
        status: false,
        message: customMessage || 'An internal server error occurred.',
        error: error.message
    });
};

module.exports = handleError;
