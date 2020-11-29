var layer = layui.layer
var form = layui.form


$(function() {

    //生成分类下拉框 
    initCateList()
    initEditor()

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面的按钮，绑定点击事件处理函数 隐藏原有的给自定义的的按钮添加点击事件 模拟上传文件的点击事件
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files
            // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
            // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 定义文章的发布状态 默认值 为已发布
    var art_state = '已发布'

    // 为存为草稿按钮，绑定点击事件处理函数 还变初始值
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    // 为表单绑定 submit 提交事件
    $('#form-pub').on('submit', function(e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault()
            //上传文件
            // 2. 基于 form 表单，快速创建一个 FormData 对象 获取表单数据
            //给formData添加 state 值
        var fd = new FormData(this)
            // 3. 将文章的发布状态，存到 fd 中 追加state 值
        fd.append('state', art_state)
            // console.log(fd);
            // 4. 将封面裁剪过后的图片，输出为一个文件对象

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })


    //  processData：处理数据
    // 默认情况下，processData 的值是 true，其代表以对象的形式上传的数据都会被转换为字符串的形式上传。而当上传文件的时候，则不需要把其转换为字符串，因此要改成false

    //  contentType：发送数据的格式
    // 和 contentType 有个类似的属性是 dataType ， 代表的是期望从后端收到的数据的格式，一般会有 json 、text……等
    // 而 contentType 则是与 dataType 相对应的，其代表的是 前端发送数据的格式

    // 默认值：application/x-www-form-urlencoded
    // 代表的是 ajax 的 data 是以字符串的形式 如 id=2019&password=123456
    // 使用这种传数据的格式，无法传输复杂的数据，比如多维数组、文件等

    // 有时候要注意，自己所传输的数据格式和ajax的contentType格式是否一致，如果不一致就要想办法对数据进行转换
    // 把contentType 改成 false 就会改掉之前默认的数据格式，在上传文件时就不会报错了。


    //定义文章发布方法
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'post',
            data: fd,
            processData: false,
            contentType: false,
            success(res) {
                console.log(res);
                location.href = '/article/art_list.html'
            }
        })
    }




})


function initCateList() {
    $.ajax({
        url: '/my/article/cates',
        method: 'get',
        success(res) {
            if (status == 0) {
                console.log(res);
            }
            let strCate = template('tpl-cate', res);
            $('[name=cate_id]').html(strCate);
            form.render();
        }

    })
}