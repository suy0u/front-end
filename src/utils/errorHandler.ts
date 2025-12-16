export function handleApiError(err: unknown): string {
  const error = err as { status?: number; message?: string };

  switch (error?.status) {
    case 400:
      return "Bad request.";
    case 401:
      return "Invalid credentials.";
    case 403:
      return "Access denied.";
    case 404:
      return "Not found error.";
    case 409:
      return "Conflict error.";
    case 422:
      return "Validation error.";
    case 500:
      return "Server error, please try again later.";

    default:
      return "Unexpected error, please try again.";
  }
}
