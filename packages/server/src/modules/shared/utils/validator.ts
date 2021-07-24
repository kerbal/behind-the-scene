export const isEmail = (str: string): boolean => {
  if (!str) return false;
  let re: RegExp = /.+@.+\..+/;
  return re.test(str);
};
