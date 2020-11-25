// 在dom树加载完成后开始执行
$(function() {
    getUserInfo();
    $("#btnLogout").on('click', logout);
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        //选择第一个字母 并大写
        var first = name[0].toUpperCase();
        $('.text-avatar').text(first).show();
    }
}

function logout() {
    layui.layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function(index) {
        //删除localStorage中的token 值
        localStorage.removeItem('token');
        // 跳转到login.html
        location.href = '/login.html';
        layer.close(index);

    })
}