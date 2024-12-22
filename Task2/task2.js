'use strict'

const asyncMap = (array, callback) => {
    return new Promise((res, rej) => {
        const resultArray = [];

        for (const index in array) {
            const item = array[index]
            callback(item, (err, result) => {
                if (err){
                    rej(err)
                    return 0;
                } else {
                    resultArray[index] = result
                }

                if (resultArray.length === array.length){
                    res(resultArray)
                }
            });
        }
    });
};

const array = [1, 2, 3];
asyncMap(
    array,
    (data, cb) => {
        setTimeout(() => {
            cb(null, data * 2);
        }, 1000);
    }
).then((result) => {
    console.log("Promise then/catch:");
    console.log(result);
}).catch((err) => {
    console.log("Promise then/catch:");
    console.error(err);
});

(async () => {
    const result = await asyncMap(
        array,
        (data, cb) => {
            setTimeout(() => {
                cb(null, data * 2);
            }, 1000);
        }
    )

    console.log("async/await:");
    console.log(result)
})();