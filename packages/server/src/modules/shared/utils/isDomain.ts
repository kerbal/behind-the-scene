// export const isDomain = (domain: string): boolean => {
//   if (!domain) return false;
//   let re1: RegExp = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/i;
//   let re2: RegExp = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i
//   return re1.test(domain) || re2.test(domain);
// };

export const isDomain = (domain: string): boolean => {
  return true;
};
