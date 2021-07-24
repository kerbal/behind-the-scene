export const queryParser = <T>(query: string): T => {
  const vars = query.split('&');
  const obj: T = {} as T;
  for (let pair of vars) {
    const [key, value] = pair.split('=');
    obj[decodeURIComponent(key)] = value;
  }
  return obj;
};
