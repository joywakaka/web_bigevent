$(function() {
    //点击去注册链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
})

$(function() {
        //点击去登录
        $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
    })
    //从layui获取form对象

layui.form.verify({
        //自定义pwd 规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        ////通过形参拿到的是确认密码的值
        repwd: function(pwd2) {
            var pwd1 = $('.reg-box [name=password').val();
            //判断两次密码是否一致
            if (pwd1 != pwd2) return '两次输入的密码不一致哈'
        }

    })
    // 登录跳转部分
    // let baseUrl = "http://ajax.frontend.itheima.net";



$('#regForm').on('submit', submitData);
$('#form_login').on('submit', function(e) {
        e.preventDefault();
        let dataStr = $(this).serialize();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: dataStr,
            success(res) {
                if (res.status != 0) return layui.layer.msg(res.message);
                layui.layer.msg(res.message, {
                    icon: 6,
                    time: 1500,

                }, function() {
                    // 将登录成功的token保存到本地存储
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html'
                })
            }
        })
    })
    //监听注册表单提交事件  提交之后就会传输数据字符串
function submitData(e) {
    e.preventDefault();
    let datastr = $(this).serialize();
    $.ajax({
        url: '/api/reguser',
        method: 'post',
        data: datastr,
        success(res) {
            if (res.status != 0) return layui.layer.msg(res.message);
            // console.log(res.message);
            layui.layer.msg(res.message);
            let uname = $('.reg-box [name=username]').val().trim();
            $('.login-box [name=username').val(uname);
            let upwd = $('.reg-box [name=password]').val().trim();
            $('.login-box [name=password').val(upwd);
            // 清空注册表单
            $('#regForm')[0].reset();
            // 切换到登录idv
            $('#link_login').click();
        }
    })

}