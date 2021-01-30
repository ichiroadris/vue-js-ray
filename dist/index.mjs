import axios from 'axios';
import uuid from 'uuid';
import StackTrace from 'stacktrace-js';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var ColorPayload = (color => ({
  type: 'color',
  content: {
    color
  }
}));

var HidePayload = (() => ({
  type: 'hide',
  content: []
}));

var LogPayload = ((...values) => {
  return {
    type: 'log',
    content: {
      values
    }
  };
});

var NewScreenPayload = (name => ({
  type: 'new_screen',
  content: {
    name
  }
}));

var RemovePayload = (() => ({
  type: 'remove',
  content: []
}));

var SizePayload = (size => ({
  type: 'size',
  content: {
    size
  }
}));

var NotifyPayload = (value => ({
  type: 'notify',
  content: {
    value
  }
}));

var CustomPayload = ((content, label) => ({
  type: 'custom',
  content: {
    content,
    label
  }
}));

class Ray {
  constructor(host = '127.0.0.1', port = 23517) {
    this.uuid = uuid.v4();
    this.client = axios.create({
      baseURL: `http://${host}:${port}/`
    });
  }

  newScreen(name = '') {
    this.sendRequest(NewScreenPayload(name));
    return this;
  }

  clearScreen() {
    return this.newScreen();
  }

  color(color) {
    this.sendRequest(ColorPayload(color));
    return this;
  }

  size(size) {
    this.sendRequest(SizePayload(size));
    return this;
  }

  remove() {
    this.sendRequest(RemovePayload());
    return this;
  }

  hide() {
    this.sendRequest(HidePayload());
    return this;
  }

  notify(text) {
    this.sendRequest(NotifyPayload(text));
    return this;
  }

  die() {
    process.exit();
  }

  showWhen(boolOrFunc) {
    if (typeof boolOrFunc == 'function') boolOrFunc = boolOrFunc();
    if (!boolOrFunc) this.remove();
    return this;
  }

  showIf(boolOrFunc) {
    return this.showWhen(boolOrFunc);
  }

  removeWhen(boolOrFunc) {
    if (typeof boolOrFunc == 'function') boolOrFunc = boolOrFunc();
    if (boolOrFunc) this.remove();
    return this;
  }

  removeIf(boolOrFunc) {
    return this.removeWhen(boolOrFunc);
  }

  ban() {
    return this.send('🕶');
  }

  charles() {
    return this.send('🎶 🎹 🎷 🕺');
  }

  send(...values) {
    if (values.length == 0) return this;
    this.sendRequest(LogPayload(...values));
    return this;
  }

  pass(value) {
    this.send(value);
    return value;
  }

  sendCustom(content, label = '') {
    this.sendRequest(CustomPayload(content, label));
    return this;
  }

  getOrigin() {
    const st = StackTrace.getSync();
    return st.find(({
      fileName
    }) => !fileName.includes('js-ray/dist/index'));
  }

  sendRequest(...payloads) {
    const origin = this.getOrigin();
    const requestPayload = {
      uuid: this.uuid,
      payloads: payloads.map(payload => {
        payload.origin = {
          file: origin.fileName || 'unknown.js',
          line_number: origin.lineNumber || 1
        };
        return payload;
      }),
      meta: []
    };
    this.client.post('/', requestPayload);
  }

}

_defineProperty(Ray, "client", void 0);

const ray = (...args) => new Ray().send(...args);

var index = {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$ray', {
      value: ray
    });
  }
};

export default index;
//# sourceMappingURL=index.mjs.map
