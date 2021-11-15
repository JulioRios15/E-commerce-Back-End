
const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).json({
    status: 'error',
    errorMessage: errorMessage,
    e: e?.toString(),
});

const sendSuccessResponse = (res, code, message = 'Successful', data) => res.status(code).json({
    status: 'success',
    message,
    data
});

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
}