// YT影片嵌入及設定
function onYouTubeIframeAPIReady() {
    var player;
    player = new YT.Player('video', {
        videoId: '6HukltTp8fc', // YouTube 影片ID
        // width: 560,          // 播放器寬度 (px)
        // height: 316,         // 播放器高度 (px)
        playerVars: {
            autoplay: 1,        // 在讀取時自動播放影片
            mute: 1,            // 是否靜音 (靜音才能自動播放)
            controls: 0,        // 在播放器顯示暫停／播放按鈕
            showinfo: 0,        // 隱藏影片標題
            modestbranding: 1,  // 隱藏YouTube Logo
            loop: 1,            // 讓影片循環播放
            fs: 0,              // 隱藏全螢幕按鈕
            cc_load_policty: 0, // 隱藏字幕
            iv_load_policy: 3,  // 隱藏影片註解
            autohide: 1,        // 當播放影片時隱藏影片控制列
            rel: 0,             // 
        },
        events: {
            onReady: function (e) {
                e.target.mute();
            }
        }
    });
}

// 創建各個查詢下拉選項
const createOption = () => {
    const theater = [
        '影城A',
        '影城B',
        '影城C',
        // '影城D',
        // '影城E',
    ];

    const movie = [
        '玩具總動員4',
        'MIB星際戰警：跨國行動',
        'X戰警：黑鳳凰',
        // '哥吉拉 II 怪獸之王',
        // '阿拉丁',
    ];

    // 重置的起始星期 EX: 3 (星期三), if today 星期四, 選項為 四, 五, 六, 日, 一, 二
    const changeDay = 3; // 星期三
    // 創建可選日期
    const date = createDate(changeDay);

    const time = [
        '07:00',
        '10:00',
        '13:00',
        '16:00',
        // '19:00',
        // '22:00',
    ];

    const options = [theater, movie, date, time];

    // 將全部選項添加至HTML
    options.forEach((thisSelect, index) => {
        let optionsEl = '';
        thisSelect.forEach((thisOption) => {
            // 設置選項
            const thisOptionEl = `<option>${thisOption}</option>`;
            optionsEl = `${optionsEl}${thisOptionEl}`;
        });

        // 依分類id添加至對應HTML
        let tagetId = '';
        switch (index) {
            case 0: tagetId = '#theater'; break;
            case 1: tagetId = '#movie'; break;
            case 2: tagetId = '#date'; break;
            case 3: tagetId = '#time'; break;
            default: break;
        }
        $(tagetId).append(optionsEl);
    });
};

// 創建可選日期
const createDate = (dayIndex) => {
    // let d = new Date("2019-06-15"); // 測試
    let d = new Date();
    const today = d.getDay();
    // 重置的起始星期 EX: 3 (星期三), if today 星期四, 選項為 四, 五, 六, 日, 一, 二
    const changeDay = dayIndex;
    const diffDay = today - changeDay;
    // 今天與起始的差異星期天數，如果為正數取本星期剩餘天數，否則取到起始日期的剩餘天數
    const dayLength = (diffDay >= 0) ? (7 - diffDay) : Math.abs(diffDay);

    let dateArray = [];
    // 創建目標日期
    let targetDay = d;
    for (let index = 0; index < dayLength; index++) {
        const dateText = index == 0 ? '今天' : setDateText(targetDay);
        dateArray.push(dateText);
        // 目標日期+一天
        targetDay.setDate(targetDay.getDate() + 1);
    }

    return dateArray;
};

// 日期轉換為文字樣式 EX: 2019-06-15 (六)
const setDateText = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');
    const weekday = ['日', '一', '二', '三', '四', '五', '六'];
    const day = weekday[d.getDay()];

    // 日期文字 EX: 2019-06-15 (六)
    const dateText = `${year}-${month}-${date} (${day})`;
    return dateText;
};

createOption(); // 創建各個查詢下拉選項