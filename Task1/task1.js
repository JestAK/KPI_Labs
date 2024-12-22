asyncMap = (array, callback) => {
    const result = [];

    for (const index in array) {
        setTimeout(() => {
            console.log(index)
            result[index] = callback(array[index])

            if (result.length === array.length){
                console.log(result)
            }
        }, 0)
    }
};

const array = ["John", "Bob", "Duke", "Frank"];

asyncMap(array, (name) => {
    return `Hello ${name}`
});

