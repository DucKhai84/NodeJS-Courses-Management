function success(data, message = 'Thành công') {
    return {
        success: true,
        message,
        data
    };
}

function error(message = 'Có lỗi xảy ra', statusCode = 500) {
    return {
        success: false,
        message,
        statusCode
    };
}

module.exports = {
    success,
    error
};
