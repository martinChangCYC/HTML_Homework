// 創建計算機按鈕
const creatCalculator = () => {
    // 設定計算機按鈕 (須為正方形，如4x4)
    const calculatorBtns = [
        [1, 2, 3, '+'],
        [4, 5, 6, '-'],
        [7, 8, 9, '*'],
        [0, '.', '=', '÷'],
    ];

    // 將計算機按鈕轉換成HTML元素
    let calculatorBtnEl = '';
    calculatorBtns.forEach((thisLine, lineIndex) => {
        let btnEl = '';
        thisLine.forEach((btn, btnIndex) => {
            // 單顆按鈕 EX: [1]
            const equal = (btn == '=') ? ' equal' : '';
            const thisBtnEl = `<button class="btn${equal}" data-value="${btn}" onclick="keyCount(this)">${btn}</button>`;
            btnEl = `${btnEl}${thisBtnEl}`;
        });

        // 每行的按鈕群 EX: [1, 2, 3, '+']
        const btnGroupEl = `<div class="btn-group">${btnEl}</div>`;
        calculatorBtnEl = `${calculatorBtnEl}${btnGroupEl}`;
    });

    // 新增至HTML內
    $('#calculator').append(calculatorBtnEl);
};

// 檢查計算式格式
const checkCount = (count) => {
    const ref = /^[0-9\.\+\-\÷\*]*$/;
    return ref.test(count);
};

// 計算機按鈕觸法處理
const keyCount = (e) => {
    $('#count').focus();
    $('#warning_text').removeClass('show');
    // 取按鈕值 EX: 1, 2, 3, +, =
    const val = $(e).attr('data-value');
    const count = $('#count').val();

    // '='鍵執行計算，其他則添加至計算式
    if (val === '=') {
        doCount(count);
    } else {
        // 檢查格式
        if (checkCount(val)) {
            $('#count').val(count + val);
        }
    }
};

// 計算
const doCount = (count) => {
    // 檢查格式
    if (checkCount(count)) {
        count = count.replace('÷', '/');
        const result = eval(count);
        $('#count').val(result);
    } else {
        $('#warning_text').addClass('show');
    }
};

creatCalculator(); // 創建計算機按鈕