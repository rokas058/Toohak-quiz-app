type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
};

// Create a deferred object that will eventually hold a function returning the token
export const deferred: Deferred<() => unknown> = (() => {
  let resolve!: (value: () => unknown) => void;

  const promise = new Promise<() => unknown>((res) => {
    resolve = res;
  });

  return { promise, resolve };
})();

// Consumers can call this to get the access token (once it's available)
export const getAccessToken = async (): Promise<unknown> => {
  const getToken = await deferred.promise;
  return getToken();
};
