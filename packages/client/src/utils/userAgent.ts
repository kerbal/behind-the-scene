import UAParser from 'ua-parser-js';

export const getBrowser = (uaString: string) => {
  const uaObject = new UAParser(uaString);
  const { name, version } = uaObject.getBrowser();
  const browserName = name?.toLowerCase();
  return {
    name: browserName,
    version,
    iconSrc: `https://cdnjs.cloudflare.com/ajax/libs/browser-logos/69.0.4/${browserName}/${browserName}_48x48.png`,
  };
};

export const getBrowserIcon = (browserName: string) => {
  const name = browserName.toLowerCase();
  return `https://cdnjs.cloudflare.com/ajax/libs/browser-logos/69.0.4/${name}/${name}_48x48.png`;
};

export const getOS = (uaString: string) => {
  const uaObject = new UAParser(uaString);
  return uaObject.getOS();
};

export const getDevice = (uaString: string) => {
  const uaObject = new UAParser(uaString);
  console.log(uaObject.getResult());
  return uaObject.getDevice();
};

export const getUAObject = (uaString: string) => {
  const uaObject = new UAParser(uaString);
  return uaObject;
};
