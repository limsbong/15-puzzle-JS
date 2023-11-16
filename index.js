const getRandomNumber = () => {
    let randomNumbers = [];
    while (randomNumbers.length !== 16) {
        const number = Math.floor(Math.random() * (16 - 0)) + 0;
        if (!randomNumbers.includes(number)) {
            randomNumbers.push(number);
        } else {
            continue;
        }
    }

    randomNumbers.forEach((cur, idx) => {
        if (cur === 0) {
            randomNumbers.splice(idx, 1, " ")
        }
    })
    return randomNumbers;
}

let cnt = 0;
const numbers = getRandomNumber();
const answerArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];

const printNumber = () => {
    const userTurnCntText = document.querySelector("#user-turn");
    const container = document.querySelector("#main-contain").children;
    numbers.forEach((cur, idx) => {
        container[idx].textContent = cur;
    })

    userTurnCntText.textContent = `${cnt} 번째`;
}

const isNumberSort = () => {
    for (let i = 0; i <= 15; i++) {
        if (answerArray[i] === numbers[i]) {
            continue;
        } else {
            return false;
        }
    }
    printNumber()
    return true;
}

const moveNumber = (userSelectNum) => {
    const userNumIdx = numbers.indexOf(userSelectNum);
    const emptyIdx = numbers.indexOf(" ");

    if (userNumIdx + 4 === emptyIdx || userNumIdx - 4 === emptyIdx) {
        swapNum(userNumIdx, emptyIdx);
        cnt++;
        printNumber()
    } else if (userNumIdx + 1 === emptyIdx || userNumIdx - 1 === emptyIdx) {
        swapNum(userNumIdx, emptyIdx);
        cnt++;
        printNumber()
    } else {
        alert("다른 숫자를 입력해주세요");
        main();
    }
}

const swapNum = (userNumIdx, emptyIdx) => {
    const temp = numbers[userNumIdx];
    numbers.splice(userNumIdx, 1, numbers[emptyIdx]);
    numbers.splice(emptyIdx, 1, temp);
}

const startGame = (event) => {
    let isAlive = false;
    const userSelectNum = Number(event.target.textContent);
    moveNumber(userSelectNum);

    isAlive = isNumberSort();
    if (isAlive) {
        const endModal = document.querySelector("#end-modal");
        const endText = document.querySelector("#sorted");
        endText.textContent = `${cnt}번 만에 정렬되었습니다!`
        endModal.style.display = "flex";
    }
}

const main = () => {
    printNumber();
    const containerSelect = document.querySelector("#main-contain");
    containerSelect.addEventListener("click", startGame);
}

main();
