//在进行ajax 的异步请求时 会先调用ajaxPrefilter 这个函数 在这个函数中我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发送ajax 异步请求之前先拼接 请求的url地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    };

    //为全局统一挂载 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.statyanzhengus === 1 && res.responseJSON.message === '身份验证失败') {
            //强制清空token
            localStorage.removeItem('token')
            location.href = '/login.html'
        }

    }


})