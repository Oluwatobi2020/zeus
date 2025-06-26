import axios from "axios";

export function generateErrorMessages(err) {
  let errorMessage =
    "Hmm... something unexpected just happened 🤔. Could you please prompt me again? Thank you! – Zeus";

  if (axios.isAxiosError(err)) {
    if (err.response) {
      const status = err.response.status;

      if (status === 401) {
        errorMessage =
          "Oops! You're not authorized to do that. Please log in and try again.";
      } else if (status === 403) {
        errorMessage = "Looks like you don’t have permission for this action.";
      } else if (status === 404) {
        errorMessage =
          "Hmm... I couldn’t find that conversation. 🧐 Want to try again?";
      } else if (status >= 500) {
        errorMessage =
          "Uh-oh! Something's up on our side. Let’s try again shortly. ⚙️";
      } else if (err.response.data?.message) {
        errorMessage = err.response.data.message + " – Zeus";
      }
    } else if (err.request) {
      errorMessage =
        "I'm having trouble reaching the server 🌐. Please check your connection and try again.";
    }
  }

  return errorMessage;
}
