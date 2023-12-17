export const errorHandler = (error) => {
    if (error.data) {
        return error.data.error.Message
    }

    return error.status
}