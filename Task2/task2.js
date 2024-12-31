'use strict';

const asyncMap = (array, fnc) => {
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
    }
).then((result) => {
    console.log("Promise then/catch:");
    console.log(result);
}).catch((err) => {
    console.log("Promise then/catch:");
    console.log(err);
});

(async () => {
    try {
        const result = await asyncMap(
            array,
            (data) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(data * 2);
                    }, 1000);
                });
            }
        );

        console.log("async/await:");
        console.log(result);
    } catch (err) {
        console.log("async/await:");
        console.log(err);
    }
})();
