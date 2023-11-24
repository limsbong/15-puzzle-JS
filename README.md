# 15-puzzle-JS
- 15 숫자 퍼즐 구현하기
---------------------

## 실행화면
https://github.com/limsbong/15-puzzle-JS/assets/126482821/e69ac67c-97b2-4049-ab20-a4670dde4571

---------------------
## Content
1. 랜덤 숫자 배열 불러오기
2. 랜덤 숫자 그리기
3. 유저가 선택한 숫자 불러오기, boolean 값을 통해 게임 상태 확인
4. 숫자 바꾸기

---------------------
## 1. 랜덤 숫자 배열 불러오기
- randomNumbers이라는 빈 배열을 만들고 0 ~ 15까지 랜덤 숫자를 하나씩 불러와 배열에 push하기로 했다.
- Math.floor(Math.random() * (16 - 0)) + 0; 0 ~ 15까지의 범위를 지정한다음 while문을 통해 randomNumbers의 length가 16이 되면 멈추도록 설정했다.
```
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
```

- 0을 빈 텍스트라고 생각하고, 랜덤 숫자를 삽입한 randomNumbers 배열에 forEach를 통해 cur를 하나씩 돌면서 cur이 0 이면 0을 빼고 " " 빈텍스트를 넣었다.
- randomNumbers를 리턴해 numbers라는 변수에 넣어주어 다른 함수에서 사용할 수 있도록 하였다. 
```
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
const numbers = getRandomNumber();
```

---------------------
## 2. 랜덤 숫자 그리기
```
<div id="main-contain">
  <div class="contain container0" id="0"></div>
  <div class="contain container1" id="1"></div>
  <div class="contain container2" id="2"></div>
  <div class="contain container3" id="3"></div>
  <div class="contain container4" id="4"></div>
  <div class="contain container5" id="5"></div>
  <div class="contain container6" id="6"></div>
  <div class="contain container7" id="7"></div>
  <div class="contain container8" id="8"></div>
  <div class="contain container9" id="9"></div>
  <div class="contain container10" id="10"></div>
  <div class="contain container11" id="11"></div>
  <div class="contain container12" id="12"></div>
  <div class="contain container13" id="13"></div>
  <div class="contain container14" id="14"></div>
  <div class="contain container15" id="15"></div>
</div>

<div id="user-turn-container">
  <div id="user-turn"></div>
</div>
```

```
let cnt = 0;

const printNumber = () => {
    const userTurnCntText = document.querySelector("#user-turn");
    const container = document.querySelector("#main-contain").children;
    numbers.forEach((cur, idx) => {
        container[idx].textContent = cur;
    })

    userTurnCntText.textContent = `${cnt} 번째`;
}
```
- children을 사용해 main-contain의 자식요소를 모두 불러와 textContent를 바꾸기로 하였다. 
- 랜덤 숫자가 들어있는 numbers 배열에 forEach를 통해 numbers의 값을 순서대로 main-contain의 자식요소에 넣어줬다.
- printNumber 함수를 실행하면 숫자가 화면에 그려진다.

---------------------
## 3. 유저가 선택한 숫자 불러오기, boolean 값을 통해 게임 상태 확인
```
const main = () => {
    printNumber();
    const containerSelect = document.querySelector("#main-contain");
    containerSelect.addEventListener("click", startGame);
}

main();
```
```
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
```
```
const answerArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];

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
```

- let isAlive 값을 통해 숫자가 정렬되었는지 boolean 값으로 확인한다.
- answerArray이라는 숫자가 정렬되어있는 정답 배열을 만들어 numbers와 비교해 숫자가 정렬되었는지 확인하였다.
- 숫자가 정렬 되었다면 isAlive에 true를 넘겨주고, endModal의 디스플레이 값을 none에서 flex로 바꾸어 숫자가 정렬되었음을 알려준다.

https://github.com/limsbong/15-puzzle-JS/assets/126482821/398ac025-f86a-4a1c-a1fd-f777e28f892c

- 화면의 숫자 박스를 클릭하면 starGame가 실행되고, event를 인수로 넘겨주어 event.target.textContent를 통해 클릭한 박스의 text를 불러온다.
- textContent는 문자열을 반환하기 때문에 Number을 사용해 숫자로 바꿔주었다.
- 유저가 클릭한 숫자 박스의 주위가 빈값(" ")인지 확인하는 함수인 moveNumber(userSelectNum)를 실행하고 인수로는 유저가 선택한 값을 넘겨주었다.

---------------------
## 4. 숫자 바꾸기
```
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
```

```
const swapNum = (userNumIdx, emptyIdx) => {
    const temp = numbers[userNumIdx];
    numbers.splice(userNumIdx, 1, numbers[emptyIdx]);
    numbers.splice(emptyIdx, 1, temp);
}
```
- 유저가 선택한 값을 넘겨주어 numbers의 index값으로 주위가 비어있는지(" ") 확인한다.
- 유저가 선택한 값 index의 +4, -4, +1, -1을 확인해 비어있는 값이(" ")있으면 swapNum함수를 통해 위치를 바꿔주고 아니면 alert창을 띄워 다른 숫자를 선택하도록 하였다.
