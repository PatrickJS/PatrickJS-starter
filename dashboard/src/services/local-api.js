
export function subscribe (fn, defaultData = {}) {
  try {
    window.api.receive("fromMain", fn);
  } catch(e) {}
  return fn(defaultData);
}

export function send(data) {
  window.api.send("toMain", data);
}

