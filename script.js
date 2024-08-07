let number_1 = document.getElementById("number_1");
let number_1_1 = document.getElementById("number_1_1");
let number_1_2 = document.getElementById("number_1_2");
let number_2_1 = document.getElementById("number_2_1");
let number_2_2 = document.getElementById("number_2_2");
let number_2_3 = document.getElementById("number_2_3");
let number_3 = document.getElementById("number_3");
let numbers;
let twoNumber;

function myDisplay() {
    let dataNumber = localStorage.getItem('number');
    numbers = JSON.parse(dataNumber);
    if (numbers != null) {
        number_1.innerHTML = numbers[0];
        number_1_1.innerHTML = numbers[1];
        number_1_2.innerHTML = numbers[2];
        number_2_1.innerHTML = numbers[3];
        number_2_2.innerHTML = numbers[4];
        number_2_3.innerHTML = numbers[5];
        twoNumber = localStorage.getItem('num');
        number_3.innerHTML = twoNumber;
    }
}

function generateUniqueRandomNumbers(count, min, max) {
    let numbers = new Set();
    while (numbers.size < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(num);
    }
    return Array.from(numbers);
}

function formatNumber(num) {
    return num.toString().padStart(3, '0');
}

function generateNumbers() {
    let uniqueNumbers = generateUniqueRandomNumbers(5, 0, 999);

    let num1 = uniqueNumbers[0];

    let num2 = num1 - 1;
    let num3 = num1 + 1;

    uniqueNumbers[1] = num2;
    uniqueNumbers[2] = num3;

    while (uniqueNumbers.length < 6 || uniqueNumbers.length !== new Set(uniqueNumbers).size) {
        uniqueNumbers = generateUniqueRandomNumbers(6, 1, 999);
        num1 = uniqueNumbers[0];
        num2 = num1 - 1;
        num3 = num1 + 1;
        uniqueNumbers[1] = num2;
        uniqueNumbers[2] = num3;
    }
    return uniqueNumbers.map(formatNumber);
}

function randomNumber() {
    numbers = generateNumbers();
    number_1.innerHTML = numbers[0];
    number_1_1.innerHTML = numbers[1];
    number_1_2.innerHTML = numbers[2];
    number_2_1.innerHTML = numbers[3];
    number_2_2.innerHTML = numbers[4];
    number_2_3.innerHTML = numbers[5];
    twoNumber = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    number_3.innerHTML = twoNumber;
    localStorage.setItem('number', JSON.stringify(numbers));
    localStorage.setItem('num', twoNumber);
}

function checkGuess() {

    const userNumber = document.getElementById('userNumber').value;
    const display = document.getElementById('display');
    let twoNum = userNumber.substring(1);
    if (numbers != null) {
        if (userNumber.length >= 3) {
            if (userNumber === numbers[0]) {
                display.innerHTML = userNumber + ' ถูกรางวัลที่ 1';
                display.style.setProperty('display', 'flex', 'important');
                if (twoNum === twoNumber) {
                    display.innerHTML += ' และถูกรางวัลเลขท้าย 2 ตัว';
                }
            } else if (userNumber === numbers[1] || userNumber === numbers[2]) {
                display.innerHTML = userNumber + ' ถูกรางวัลเลขใกล้เคียงรางวัลที่ 1';
                display.style.setProperty('display', 'flex', 'important');
                if (twoNum === twoNumber) {
                    display.innerHTML += ' และถูกรางวัลเลขท้าย 2 ตัว';
                }
            } else if (userNumber === numbers[3] || userNumber === numbers[4] || userNumber === numbers[5]) {
                display.innerHTML = userNumber + ' ถูกรางวัลที่ 2';
                display.style.setProperty('display', 'flex', 'important');
                if (twoNum === twoNumber) {
                    display.innerHTML += ' และถูกรางวัลเลขท้าย 2 ตัว';
                }
            } else if (twoNum === twoNumber) {
                display.innerHTML = 'ถูกรางวัลเลขท้าย 2 ตัว';
                display.style.setProperty('display', 'flex', 'important');
            } else {
                display.innerHTML = 'เสียใจด้วย คุณไม่ถูกรางวัล'
                display.style.setProperty('display', 'flex', 'important');
            }
        } else {
            display.innerHTML = 'กรุณากรอกตัวเลขให้ครบถ้วน'
            display.style.setProperty('display', 'flex', 'important');
        }
    } else {
        alert('กรุณากดปุ่ม "ดำเนินการสุ่มรางวัล" ');
    }

}

myDisplay();
