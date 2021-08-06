import qs from 'qs';
import md5 from 'md5'

const instance = axios.create({
	timeout: 30000,
	transformResponse: [function (data) {
		// Do whatever you want to transform the data
		return JSON.parse(data);
	}]
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
	// Do something before request is sent
	config.headers['Content-Type'] = 'application/json;charset=UTF-8';
	config.params = Object.assign({v: new Date().getTime()}, config.params);
	
	// 如果已经获取到了加密key，则后续请求需要加上对应的内容
	if(window.salt) {
		let timestamp = new Date().getTime();
		let signature = md5(`${window.UUID}${timestamp}${salt}${window.token || ''}`)
		config.headers = Object.assign({
			'x-token': window.token || '',
			'x-value':`${window.SERVICE_ID}-${window.SERVICE_ID},${window.UUID},${timestamp},1.0.0,${window.LANG_CODE}`,
			'signature': signature,
			// 'user-agent': `Mozilla/5.0 (MALLWIN; MALLWIN/1.0.0) Env/${ENV} (OBS;${navigator.platform};${navigator.language})`
		}, config.headers)
	}

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
	return response.data;
}, error => {
	// 网络错误
	if (error == "Error: 网络错误") {
		return Promise.reject(error.message)
	} else {
		return Promise.resolve({code: 0, msg: error})
	}
})

const httpRequest = {
    get(url, param, header) {
		return instance.get(url, {
			params: param,
			headers: header
		});
	},
    post(url, data, header) {
		return instance.post(url, data, {
			headers: header
		});
	},
    put(url, param, data, header) {
		return instance.put(url, data, {
			params: param,
			headers: header
		})
	},
    delete(url, header) {
		return instance.delete(url, {
			headers: header
		})
	},
    postForm(url, data, header) {
		return instance.post(url, data, {
			transformRequest: [function (data, headers) {
				if(header) {
					Object.assign(header, headers);
				}
				return qs.stringify(data);
			}]
		})
	}
}

export default httpRequest;
