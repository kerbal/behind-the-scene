import axios from 'axios';
const platform = require('platform');

const API = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/api/projects/errors' :
  'https://bts-backend.herokuapp.com/api/projects/errors';

class BTS {
  static init({ key }: { key: string }) {
    window.addEventListener('error', (event) => this.onError(key, event));
  }

  static onError (key: string, event: ErrorEvent) {
    const dataObj = {
      apiKey: key,
      name: event.error.name,
      message: event.message,
      source: event.filename,
      colNo: event.colno,
      lineNo: event.lineno,
      stack: event.error.stack,
      browserName: platform.name,
      browserVersion: platform.description.split('on')[0]?.split(' ')[1] || 'unknow',
      osName: platform.os.family,
      osVersion: platform.os.version || 'unknow',
      deviceName: 'unknow',
      deviceModel: 'unknow',
    }
    axios.post(API, dataObj);
  }
}

(window as any).BTS = BTS;