'use strict'

const controller = new AbortController();
const signal = controller.signal;

const asyncMap = (array, callback, signal) => {
    return new Promise((res, rej) => {
        const resultArray = [];
        let stopped = false;

        for (const index in array) {
            const item = array[index]
            callback(item, (err, result) => {
                if (err){
                    if (stopped) return 1;
                    stopped = true;
                    rej(err)
                } else {
                    resultArray[index] = result
                }

                if (resultArray.length === array.length){
                    res(resultArray)
                }
            });
        }

        signal.addEventListener("abort", () => {
            rej(new Error("Operation was aborted"));
        });
    });
};

const array = [1, 2, 3];

asyncMap(
    array,
    (data, cb) => {
        setTimeout(() => {
            cb(null, data * 2);
        }, 1000);
    },
    signal
).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

setTimeout(() => {
    controller.abort()
}, 100)
