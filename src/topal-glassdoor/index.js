import React, { useEffect } from "react";

// Create a function to get change in 15 minutes

const TopalGlassdoor = () => {
  const getChange = (actualTotal, customerGivenAmount) => {
    const moneyDiff = customerGivenAmount - actualTotal;
    // denominations
    // 1 cent penny
    // 5 cents nickle
    // 10 cents dime
    // 25 cents quarter
    // 1 dollar
    // 5 dollars
    // 10 dollars
    // 20 dollars
    // 100 dollars

    const denominationMap = new Map();
    denominationMap.set(0.01, "Penny");
    denominationMap.set(0.05, "Nickle");
    denominationMap.set(0.1, "Dime");
    denominationMap.set(0.25, "Quarter");
    denominationMap.set(1, "1 Dollar");
    denominationMap.set(5, "5 Dollars");
    denominationMap.set(10, "10 Dollars");
    denominationMap.set(20, "20 Dollars");
    denominationMap.set(100, "100 Dollars");

    const denominationsArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let results = [];

    if (moneyDiff > 0) {
      let copyMoneyDiff = moneyDiff;
      let denominationsArrIndex = 8;
      while (copyMoneyDiff > 0) {
        console.log(copyMoneyDiff);
        const divideBy = denominationsArr[denominationsArrIndex];
        if (divideBy <= copyMoneyDiff) {
          const quotient = Math.floor(copyMoneyDiff / divideBy);
          if (quotient > 0) {
            const bill = denominationMap.get(divideBy);
            results.push(`${quotient} x ${bill}`);
            copyMoneyDiff = copyMoneyDiff % divideBy;
            copyMoneyDiff = copyMoneyDiff.toFixed(2);
            console.log(copyMoneyDiff % divideBy);
          }
        }
        denominationsArrIndex = denominationsArrIndex - 1;
      }
    }
    console.log(results);
  };

  useEffect(() => {
    //getChange(20, 8273.93);
  }, []);

  return <div>topal glassdoor</div>;
};

export default TopalGlassdoor;
