// 基于jq的ajax请求发送之前 对数据进行预处理 
$.ajaxPrefilter(function(ajaxOpt) {
    // console.log(ajaxOpt);
    ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url
})