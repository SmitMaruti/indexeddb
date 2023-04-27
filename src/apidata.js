const all = [
    { name: "x", age: 1, rating: 4 },
    { name: "y", age: 1, rating: 5 },
    { name: "z", age: 2, rating: 4 },
];

const you = [{ name: "m", age: 1, rating: 5 }];
const assigned = [{ name: "m", age: 1, rating: 5 }];
const unassgigned = [{ name: "n", age: 1, rating: 3 }];

export const getData = (format = "all") => {
    return new Promise((resolve) => {
        setTimeout(() => {
            switch (format) {
                case "all":
                    resolve(all);
                    break;
                case "you":
                    resolve(you);
                    break;
                case "assigned":
                    resolve(assigned);
                    break;
                case "unassgigned":
                    resolve(unassgigned);
                    break;
            }
        }, 3000);
    });
};
