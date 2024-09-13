export default class Form {
  constructor() {
    this.ready = new Promise((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });

    const ret = fetch("http://t.weather.sojson.com/api/weather/city/101030100")
      .then((resp) => {
        this.readyResolve(resp);
      })
      .catch((errors) => {
        this.readyReject(errors);
      });
    // console.log('Ret:', ret);
  }

  embed() {
    return new Promise((resolve) => {
      let attempts = 0;
      const wait = setInterval(() => {
        attempts++;
        const t = Date.now();
        if (t % 5 == 0 || attempts > 10) {
          resolve(this.ready);
          clearInterval(wait);
        }
      }, 10);
    });
  }
}

const createForm = () => {
  return (new Form()).ready;
};

const createFormAsync = () => {
  return new Promise((resolve) => {
    resolve((new Form()).ready);
  });
};

export { createForm, createFormAsync };