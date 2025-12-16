let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

export const addRequestToQueue = (
  resolve: (token: string) => void,
  reject: (err: unknown) => void
) => {
  failedQueue.push({ resolve, reject });
};

export const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token as string);
  });

  failedQueue = [];
};
