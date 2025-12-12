export const withCatch = <T>(
  promise: Promise<{ data: T }>,
  label: string
): Promise<T> =>
  promise
    .then((r) => r.data)
    .catch((err) => {
      console.error(`${label} error:`, err);
      throw err;
    });
