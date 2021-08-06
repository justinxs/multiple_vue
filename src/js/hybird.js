import Events from './events'
import { getSystem } from './helper';

let nativeObj = null
class Hybird extends Events {
    constructor() {
        super()
        this.platform = getSystem()
    }
    get nativeObj() {
        if (!nativeObj){
            if (typeof mallwin === 'object') {
                nativeObj = mallwin;
            } else if (typeof maxlive === 'object') {
                nativeObj = maxlive;
            }
            nativeObj = this.platform.isAndroid ? nativeObj : window.webkit.messageHandlers
        }

        return nativeObj
    }
    set nativeObj(val) {
        nativeObj = val
    }

    callWeb(action, data) {
        this.emit(action, JSON.parse(data))
    }

	/**
	 * 返回APP
	 */
	back() {
		if(this.platform.isAndroid) {
			this.nativeObj.back();
		} else {
			this.nativeObj.back.postMessage('');
		}
	}

	/**
	 * 打开浏览器
	 * @param {*} url 
	 * @param {*} title 
	 */
	openBrowser(url) {
		if(this.platform.isAndroid) {
			this.nativeObj.openBrowser(url);
		} else {
			this.nativeObj.openBrowser.postMessage({url});
		}
	}

	/**
	 * 打开webview
	 * @param {*} url 
	 * @param {*} title 
	 */
	openWebview(url, title = '') {
		if(this.platform.isAndroid) {
			this.nativeObj.openWebview(url, title);
		} else {
			this.nativeObj.openWebview.postMessage({url, title});
		}
    }
    
    /**
     * 打开聊天室房间
     * @param {*} roomId
     */
    openRoom (roomId) {
        if (this.platform.isAndroid) {
            this.nativeObj.openRoom(roomId);
        } else {
            this.nativeObj.openRoom.postMessage({roomId});
        }
    }

    /**
     * 打开比赛房间
     * @param {*} roomId
	 * @param {*} scheduleId 
     */
    openMatchRoom(roomId, scheduleId) {
        if (this.platform.isAndroid) {
            this.nativeObj.openMatchRoom(roomId, scheduleId);
        } else {
            this.nativeObj.openMatchRoom.postMessage({roomId, scheduleId});
        }
    }

	/**
	 * 打开app支付
	 * @param {*} type 充值类型 1: apple pay 2: google pay
	 * @param {*} orderNo 充值订单号
	 * @param {*} pId 产品id
     * @param {String} callback 成功回调函数全局名称
	 */
	openPay({type, orderNo, pId, callback}) {
		if(this.platform.isAndroid) {
			this.nativeObj.openPay(JSON.stringify({type, orderNo, pId, callback}));
		} else {
			this.nativeObj.openPay.postMessage({type, orderNo, pId, callback});
		}
	}

	/**
	 * 获取状态栏高度
	 * @param {*} 回调函数名称，调用的时候需要返回对应的状态栏高度
	 */
	getStatusBarHeight(callback) {
		if(this.platform.isAndroid) {
			return this.nativeObj.getStatusBarHeight();
		} else {
			this.nativeObj.getStatusBarHeight.postMessage({callback});
		}
    }
    
	/**
	 * 打开绑定手机框
	 */
	openBindPhone(state=false) {
		if(this.platform.isAndroid) {
			return this.nativeObj.openBindPhone(state);
		} else {
			this.nativeObj.openBindPhone.postMessage({state});
		}
	}
	
	/**
	 * 打开登陆页面
	 */
	openLogin() {
		if(this.platform.isAndroid) {
			return this.nativeObj.openLogin();
		} else {
			this.nativeObj.openLogin.postMessage({});
		}
	}

	/**
	 * 打开个人信息主页
	 * @param {*} id 
	 * @returns 
	 */
	openPersonal(id) {
		if(this.platform.isAndroid) {
			return this.nativeObj.openPersonal(id);
		} else {
			this.nativeObj.openPersonal.postMessage({id});
		}
	}

	/**
	 * 打开模块
	 * @param {*} actionPath 
	 * @returns 
	 */
	openActionPath(actionPath) {
		if(this.platform.isAndroid) {
			return this.nativeObj.openActionPath(actionPath);
		} else {
			this.nativeObj.openPersonal.postMessage({actionPath});
		}
	}
}

const hybird = new Hybird()
window.callWeb = hybird.callWeb

export default hybird