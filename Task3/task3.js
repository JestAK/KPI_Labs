'use strict'

const controller = new AbortController();
const signal = controller.signal;

const asyncMap = (array, fnc, signal) => {
    const promiseArray = [];

    for (const item of array) {
        promiseArray.push(new Promise((res, rej) => {
            try {
                fnc(item).then((result) => {res(result)});
            } catch (err) {
                rej(err);
            }
        }));
    }

    return new Promise((res, rej) => {
        Promise.all(promiseArray).then((result) => {
            res(result);
        }).catch((err) => {
            rej(err);
        });

        signal.addEventListener("abort", () => {
            rej(new Error("Operation was aborted"));
        });
    });
};

const array = [1, 2, 3];

asyncMap(
    array,
    (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data * 2);
            }, 1000);
        });
    },
    signal
).then((result) => {
    console.log("Promise then/catch:");
    console.log(result);
}).catch((err) => {
    console.log("Promise then/catch:");
    console.log(err);
});

setTimeout(() => {
    controller.abort()
}, 100)
