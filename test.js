const a = {jeden: 1, dwa: 2, trzy: 3};
const b = {cztery: 4, piec: 5, szesc: 6};
// const arr = [a, b].map(el => el);
// const a1 = arr[0];
// const b1 = arr[1];
// const a1 = JSON.parse(JSON.stringify(a));
// const b1 = JSON.parse(JSON.stringify(b));
const a1 = Object.assign(Object.setPrototypeOf({}, a), a);
const b1 = Object.assign(b);
console.log(a, b);
console.log(a1, b1);
a1.jeden = 101;
a1.dwa = 202;
a1.trzy = 303;
b1.cztery = 404;
b1.piec = 505;
b1.szesc = 606;
console.log(a, b);
console.log(a1, b1);
