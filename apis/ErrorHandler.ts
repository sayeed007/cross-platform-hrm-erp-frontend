export const resolveApiError = (error) => {
    if (error?.response?.data?.message) {
        // Request made and server responded with an error message
        return [false, error.response.data.message, error.response.status];
    } else if (error.response) {
        // Request made and server responded without an error message
        return [false, "An unexpected error occurred!", error.response.status];
    } else if (error.request) {
        // The request was made but no response was received
        return [false, "Network Error! Check your internet connection.", null];
    } else {
        // Something happened in setting up the request that triggered an Error
        return [false, error.message ?? 'Something went wrong. Please try again!', null];
    }
};
