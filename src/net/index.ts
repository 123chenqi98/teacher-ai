import axios from "axios";
import {ElMessage} from "element-plus";

// 创建携带登录token的请求实例
const  requestsToken= axios.create({
    // 设置基础请求地址
    baseURL:'/api',
    //设置超时响应
    timeout: 30000, // 增加到30秒
});

// 创建携带token请求实例
const requests = axios.create({
    // 设置基础请求地址
    baseURL:'/api',
    //设置超时响应
    timeout: 30000, // 增加到30秒
})
// 设置请求的格式类型
requestsToken.defaults.headers.post['Content-Type'] = 'application/json';
requests.defaults.headers.post['Content-Type'] = 'application/json';

// 设置请求头携带cookie
requestsToken.defaults.headers.withCredentials = true;
requests.defaults.headers.withCredentials = true;

// 添加请求拦截器
requestsToken.interceptors.request.use(function (config) {
    //执行携带token的请求逻辑
    // 放行请求
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requestsToken.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 请求出错的默认提示
const defaultFailure = (message:any,code:bigint,url:string) =>{
    // 控制台打印错误信息
    console.warn(`请求体地址${url},状态码${code},错误信息${message}`)
    ElMessage({message:message,type:'warning'})
}
const defaultError = (err:any) => {
    console.error(err)
    ElMessage({message:"请求出现错误,请联系我们,提供您的宝贵意见",type:'error'})
}

// 携带token请求post
function tokenPost(url:string,data:any,success:any,failure:any=defaultFailure,error:any=defaultError){
    requestsToken.post(url,data).then((response)=>{
        // 响应成功时后回调
        if (response.data.code === 200){
            // 请求成功回调
            success(response.data)
        }
        else {
            // 响应失败时回调
            failure(response.data)
        }
    }).catch(error)
}
// 携带token请求get
function tokenGet(url:string,success:any,failure:any=defaultFailure,error:any=defaultError){
    requestsToken.get(url).then((response)=>{
        if (response.data.code === 200){
            // 响应成功时回调
            success(response.data)
        }else {
            // 响应失败时回调
            failure(response.data)
        }
    }).catch(error)
}

// 不携带token请求post
function requestPost(url:string,data:any,success:any,failure:any=defaultFailure,error:any=defaultError){
    requests.post(url,data).then((response)=>{
        if (response.data.code === 200){
            // 响应成功时回调
            success(response.data)
        }else {
            // 响应失败时回调
            failure(response.data)
        }
    }).catch( error)
}
// 不携带token请求get
function requestGet(url:string,success:any,failure:any=defaultFailure,error:any=defaultError){
    requests.get(url).then((response)=>{
        if (response.data.code === 200){
            // 响应成功时回调
            success(response.data)
        }else {
            // 响应失败时回调
            failure(response.data)
        }
    }).catch( error)
}

export {
    tokenPost,
    tokenGet,
    requestPost,
    requestGet
}



