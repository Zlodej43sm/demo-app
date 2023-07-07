export const LOCAL_SAVE_TEST_RES = {
  DONE: {
    status: "DONE",
  },
  IN_PROGRESS: {
    id: "randomID",
    status: "IN_PROGRESS",
    done_at: new Date().toISOString(),
  },
  FAIL: {},
};

export const fakeRequest = async (
  res: any,
  delay?: number,
  isError?: boolean
): Promise<any> => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      isError ? reject(res) : resolve(res);
    }, delay ?? 300);
  });
  return data;
};
