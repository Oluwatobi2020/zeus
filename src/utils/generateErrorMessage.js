export function generateErrorMessage(error) {
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data.message || "Bad Request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "Requested resource not found.";
      case 422:
        return data?.errors?.[0]?.message || "Validation failed.";
      case 500:
        return "Something went wrong on our end. Please try again later.";
      default:
        return data.message || "An unexpected error occurred.";
    }
  }

  if (error?.request) {
    return "Network error. Please check your internet connection.";
  }

  return error?.message || "An unknown error occurred.";
}
