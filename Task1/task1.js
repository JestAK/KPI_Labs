'use strict'

const asyncMap = (array, callback, handler) => {
    const resultArray = [];
    let stopped = false;

    for (const index in array) {
        const item = array[index]
        callback(item, (err, result) => {
            if (err){
                if (stopped) return 1;
                stopped = true;
                handler (err, null);
            } else {
                resultArray[index] = result
            }

            if (resultArray.length === array.length){
                handler(null, resultArray)
            }
        });
    }
};

const array = [1, 2, 3];

asyncMap(
    array,
    (data, cb) => {
        setTimeout(() => {
            cb(null, data * 2);
        }, 1000);
    },
    (err, result) => {
        console.log(err, result);
    },
);

