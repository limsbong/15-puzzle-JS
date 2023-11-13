const getRandomNumber = () => {
    let numbers = [];
    while (numbers.length !== 8) {
        let randomNumber = Math.floor(Math.random() * (9 - 1)) + 1;
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        } else {
            continue;
        }
    }
    return numbers;
}

let userTurn = 0;
let numbers = getRandomNumber();

const printNumber = () => {
    console.log("간단 숫자 퍼즐");
    console.log(`Turn ${userTurn}`);
    console.log(numbers);
    console.log("교활할 두 숫자를 입력하세요.");
    userTurn++;
}

const isNumberSort = () => {
    for (let i = 1; i <= 8; i++) {
        if (i === numbers[i - 1]) {
            continue;
        } else {
            main()
        }
    }
    return true;
}

const valueCheck = (input) => {
    input.forEach((cur) => {
        if (input.length === 1 || cur > 8 || isNaN(cur)) {
            alert("잘 못 입력하였습니다. 다시 입력해주세요.")
            main()
        } else {
            return input;
        }
    })
}

const main = () => {
    let isAlive = false;
    while (!isAlive) {
        printNumber();
        let input = prompt("두 숫자를 입력하세요 (예: 1,2)").split(",");
        console.log(input);
        valueCheck(input);
        let firstNum = parseInt(input[0]);
        let secondNum = parseInt(input[1]);
        let firstNumIdx = numbers.indexOf(firstNum);
        let secondNumIdx = numbers.indexOf(secondNum);
        let temp = numbers[firstNumIdx];
        numbers.splice(firstNumIdx, 1, numbers[secondNumIdx]);
        numbers.splice(secondNumIdx, 1, temp);
        isAlive = isNumberSort();
    }
    printNumber();
    alert("정렬되었습니다.");
}

main()

