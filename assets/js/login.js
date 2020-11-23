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
    //监听注册表单提交事件  提交之后就会传输数据字符串
let baseUrl = "http://ajax.frontend.itheima.net"
$('#regForm').on('submit', submitData);

function submitData(e) {

    e.preventDefault();
    let datastr = $(this).serialize();
    $.ajax({
        url: baseUrl + '/api/reguser',
        method: 'post',
        data: datastr,
        success(res) {
            if (res.status != 0) return layui.layer.msg(res.message);
            // console.log(res.message);
            layui.layer.msg(res.message);
            $('#regForm')[0].reset();
            $('#link_login').click();
        }
    })

}