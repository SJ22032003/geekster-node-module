const exArr = [
  { name: 'Alice', age: 25, id: 1 },
  { name: 'Eve', age: 45, id: 5 },
  { name: 'Bob', age: 30, id: 2 },
  { name: 'Charlie', age: 35, id: 3 },
  { name: 'David', age: 40, id: 4 },
];

const dataNormalise = {};

exArr.forEach((item) => {
  dataNormalise[item.id] = item;
});

const getNameById = (id) => {
  console.log(dataNormalise[id].name);
};

getNameById(2) // Charlie