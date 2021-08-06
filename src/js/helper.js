/**
 * url 查询参数
 * @param {string} name 键名
 * @param {string} mode 路由模式 history => 正常模式 hash => hash模式
 */
export function getQueryString(name, mode = 'hash') {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var hashReg = /(\?.*)/;
    var queryString = window.location.search;
    if (mode === 'hash') {
        var matches = hashReg.exec(window.location.hash);
        queryString = matches ? matches[1] : ''
    }
	var r = queryString.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/**
 * 是不是APP
 */
export function isApp() {
    let fromAPP = getQueryString('fromApp');
	return fromAPP == 1;
}

export function getSystem() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('XiaoMi') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iphone') > -1 || u.indexOf('iPhone') > -1; //ios终端
	var isBaiduBrowser = u.indexOf('baidubrowser') > -1;
	var isQQBrowser = u.indexOf('MQQBrowser') > -1;
	var isUCBrowser = u.indexOf('UCBrowser') > -1;
	var isChrome = u.indexOf('Chrome') > -1;
	var isOPPO = u.indexOf('OPM') > -1;

	return {
		isAndroid: isAndroid,
		isiOS: isiOS,
		isBaiduBrowser,
		isQQBrowser,
		isUCBrowser,
		isChrome,
		isOPPO
	}
}

/**
 * 获取唯一标识码
 * @param {*} paltform 
 */
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    // var uuid = s.join("");
    var setid = s.join("");
    var uuid = setid;
    return uuid;
}

// 将秒数转为时间格式
export function SecondsTommss(val) {
    var totalSeconds = parseInt(val);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    seconds = Math.round(seconds * 100) / 100;
    var result = "";
    if (hours > 0) {
        var _hours = parseInt((hours < 10 ? "0" + hours : hours)) * 60;
        // result = (hours < 10 ? "0" + hours : hours);
        minutes = _hours + minutes;
        result = (minutes < 10 ? "0" + minutes : minutes);
    } else {
        result = (minutes < 10 ? "0" + minutes : minutes);
    }

    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
};

export function getCurDateWeek() {
    let nowDate = new Date();
    let nowDay = nowDate.getDay();
    let startDate = 0,
        endDate = 0;

    if (nowDay > 1) {
        startDate = nowDate.getTime() - (1000 * 60 * 60 * 24 * (nowDay - 1));
        endDate = startDate + (1000 * 60 * 60 * 24 * 6);
    } else if (nowDay == 1) {
        startDate = nowDate.getTime();
        endDate = startDate + (1000 * 60 * 60 * 24 * 6);
    } else {
        startDate = nowDate.getTime() - (1000 * 60 * 60 * 24 * 6);
        endDate = nowDate.getTime();
    }

    return {
        startDate: new Date(startDate).format('yyyy-MM-dd'),
        endDate: new Date(endDate).format('yyyy-MM-dd')
    }
}

export function visibilityChange() {
    var hidden, state, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
        state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
        state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
        state = "webkitVisibilityState";
    }

    return {
        hidden,
        state,
        visibilityChange
    }
}

/**
 * arraybuffer 转换为 string
 * @param {*} ab 
 */
export function arrayBufferToStr(ab) {
    return new Promise((resolve, reject) => {
        let b = new Blob([ab]);
        let r = new FileReader();
        r.readAsText(b, 'utf-8');
        r.onload = f => {
            if(f){
                resolve(f);
            } else {
                reject(new Error('read error'))
            }
        }
    })
}

/**
 * string 转 arrayBuffer
 * @param {*} str 
 */
export function strToArrayBuffer(str) {
    return new Promise((resolve, reject) => {
        var b = new Blob([str]);
        var r = new FileReader();
        r.readAsArrayBuffer(b);
        r.onload = f => {
            if(f){
                resolve(f);
            } else {
                reject(new Error('read error'))
            }
        }
    })
}

/**
 * 设备GPU信息
 */
export function deviceGPUInfo() {
    var canvas = document.createElement('canvas'),
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl'),
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
}


// 判断一个数是否是素数
export function isPrinme(num) {
    if (num <= 3) {
        return num > 1
    } else {
        let sq = Math.sqrt(num)
        for (let i = 2; i <= sq; i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
}

/**
 * 获取字符串中下标为素数/质数的字符集合
 * @param {String} str
 */
 export function prinme(str) {
    return str ? str.split('').filter((v, i) => isPrinme(i)).join('') : ''
}
