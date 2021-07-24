export const generator = (counter: number) : string => {
  const apiKey = new Date().getTime() * 100000 + counter;
  return apiKey.toString();
}