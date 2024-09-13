function p1(value) {
  return new Promise((resolve, reject) => {
    if (value === 0) {
      resolve("p1 resolve");
    } else {
      reject("p1 reject");
    }
  });
}

function p2(value) {
  return new Promise((resolve, reject) => {
    if (value === 0) {
      resolve("p2 resolve");
    } else {
      reject("p2 reject");
    }
  });
}

function p3(value) {
  return new Promise((resolve, reject) => {
    if (value === 0) {
      resolve(p1(value));
    } else {
      resolve(p2(value));
    }
  });
}

function testPromise() {
  const value = 0;
  p3(value)
    .then(ret => console.log(ret))
    .then(ret => console.log(ret))
    .catch(errors => console.log(errors));
}

testPromise();