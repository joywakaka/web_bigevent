$(function() {
    var form = layui.form
    form.verify({
        nickname: [/^\S{6,8}$/, '昵称必须在6-12个字符']
    });

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success(res) {
                //   console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.form.val('formUserInfo', res.data)
            }
        })
    }


    $('#btnReset').on('click', function(e) {
            //阻止表单的重置行为 
            e.preventDefault();
            initUserInfo();
        })
        // 提交修改表单数据
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: $(this).serialize(),
            success(res) {
                layui.layer.msg(res.message);
                if (res.status !== 0) {
                    return
                }

                //通过window.parent 或 windowt.op 调用父页面的方法
                window.parent.getUserInfo();

            }
        })
    })



})