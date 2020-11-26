$(function() {
    var form = layui.form;
    form.verify({
            //密码的统一格式
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //新旧密码比较不能相同
            samePwd: function(value) {
                if (value === $('[name=oldPwd').val()) {
                    return '新旧密码不能相同!'
                }
            },
            // 确认密码要和新密码相同
            rePwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次的密码不一致!'
                }
            }
        })
        // 为表单添加提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success(res) {
                layui.layer.msg(res.message);
                if (res.status != 0) return;
                layui.layer.msg('密码修改成功请重新登录!', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    localStorage.removeItem('token');
                    window.top.location = '/login.html';
                });

            }
        })
    })



})