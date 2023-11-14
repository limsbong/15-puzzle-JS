const getRandomNumber = () => {
    let randomNumbers = [];
    while (randomNumbers.length !== 16) {
        let number = Math.floor(Math.random() * (16 - 0)) + 0;
        if (!randomNumbers.includes(number)) {
            randomNumbers.push(number);
        } else {
            continue;
        }
    }
    
    randomNumbers.forEach((cur, idx) => {
        if (cur === 0) {
            randomNumbers.splice(idx, 1, " ")
        } else if (cur < 10) {
            randomNumbers.slice(idx, 1, " " + cur)
        }
    })
    return randomNumbers;
}

let userTurn = 0;
const numbers = getRandomNumber();

const printNumber = () => {
    console.log("재미있는 15 퍼즐!");
    console.log(`Turn: ${userTurn}`);
    for (let i = 0; i < 13; i += 4) {
        console.log(`[${numbers[i]}][${numbers[i + 1]}][${numbers[i + 2]}][${numbers[i + 3]}]`);
    }
    console.log("숫자를 입력하세요.");
    userTurn++;
}

const isNumberSort = () => {
    for (let i = 1; i <= 15; i++) {
        if (i === numbers[i - 1]) {
            continue;
        } else {
            main()
        }
    }
    return true;
}

const valueCheck = (input) => {
    if (input > 15 || isNaN(input)) {
        alert("잘 못 입력하였습니다. 다시 입력해주세요.")
        main()
    } else {
        return true;
    }
}

const moveNumber = (number) => {
    const userNumIdx = numbers.indexOf(number);
    const emptyIdx = numbers.indexOf(" ");
    
    if (userNumIdx + 4 === emptyIdx || userNumIdx - 4 === emptyIdx) {
        swapNum(userNumIdx, emptyIdx);
    } else if (userNumIdx + 1 === emptyIdx || userNumIdx - 1 === emptyIdx) {
        swapNum(userNumIdx, emptyIdx);
    } else {
        alert("다른 숫자를 입력해주세요");
        main();
    }
}

const swapNum = (userNumIdx, emptyIdx) => {
    const temp = numbers[userNumIdx];
    numbers.splice(userNumIdx, 1, numbers[emptyIdx]);
    numbers.splice(emptyIdx, 1, temp);
    
    return true;
}

const main = () => {
    let isAlive = false;
    while (!isAlive) {
        printNumber();
        
    //     const input = prompt("숫자를 입력해주세요 (예: 1)");
    //     const number = parseInt(input);
        
    //     valueCheck(number);
        
    //     moveNumber(number);
        
    //     isAlive = isNumberSort();
    }
    printNumber();
    alert("정렬되었습니다.");
}

// main();
