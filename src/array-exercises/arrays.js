let people = ["Greg", "Mary", "Devon", "James"];

// Using a loop, iterate through this array and console.log all of the people.

const logEveryone = () => {
  for (let person of people) {
    console.log(person);
  }
};

// Remove Greg from the array
const removeGregFromArray = () => {
  const gregIndex = people.findIndex((person) => person === "Greg");
  people.splice(gregIndex, 1);
  console.log(people);
};

// Write the command to add "Matt" to the front of the array.
const addMatt = () => {
  people.unshift("Matt");
  console.log(people);
};

//Write the command to add your name to the end of the array.
const addMyName = () => {
  people.push("Ibrahim");
  console.log(people);
};

//Using a loop, iterate through this array and after console.log-ing "Mary", exit from the loop.
const exitAfterMary = () => {
  for (let person of people) {
    if (person === "Mary") {
      break;
    } else {
      console.log(person);
    }
  }
};

//Write the command to make a copy of the array using slice. The copy should NOT include "Mary" or "Matt".
// const makeCopyWithSlice = () => {
//   const maryIndex = people.findIndex((person) => person === 'Mary')
//   const mattIndex = people.findIndex((person) => person === 'Matt')
//   let first = maryIndex
//   let second = mattIndex
//   if (maryIndex > mattIndex) {
//     first = mattIndex
//     second = maryIndex
//   }
//   const zeroToFirst = people.slice(0, first)
//   const firstToSecond = people.slice(first, second)
//   const secondToEnd = people.slice(second, people.length-1)

//   console.log(filteredArr);
// };

const practiceWithSlice = () => {
  // does not modify original array
  const sliced = people.slice(0, 2);
  console.log(people);
  console.log(sliced);
};

const practiceWithSplice = () => {
  // splice modifies the original array so be careful
  const removeFirst2 = people.splice(0, 2);
  console.log(removeFirst2);
  console.log(people);
};

//logEveryone();
//removeGregFromArray();
//addMatt();
//addMyName();
//exitAfterMary();
//makeCopyWithSlice();
//practiceWithSlice();
practiceWithSplice();
