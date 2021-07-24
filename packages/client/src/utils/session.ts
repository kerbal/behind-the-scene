export const createSession = (data: object) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('userSession', JSON.stringify(data));
  }
};

export const storeRedirectUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('redirectUrl', JSON.stringify(url));
  }
};

export const getSession = () => {
  if (typeof window !== 'undefined') {
    const userSessionData: string = window.localStorage.getItem('userSession') || '';
    if (!userSessionData) {
      return {};
    }
    return JSON.parse(userSessionData);
  }
  return {};
};

export const getLoginStatus = () => {
  const currentSession = getSession();
  return Object.keys(currentSession)?.length !== 0;
};

export const getRedirectUrl = () => {
  if (typeof window !== 'undefined') {
    const redirectUrl: string = window.localStorage.getItem('redirectUrl') || '';
    if (!redirectUrl) {
      return '';
    }
    window.localStorage.removeItem('redirectUrl');
    return JSON.parse(redirectUrl);
  }
  return '';
};

export const deleteSession = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('userSession');
    window.localStorage.removeItem('token');
  }
};
