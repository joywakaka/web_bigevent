$(function() {
    initArtCateList();
    //加载文章列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //添加按钮
    let indexAdd = null;
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
        })
        // 通过代理给form-add 表单绑定submit事件
    $('body').on('submit', "#form-add", function(e) {
            e.preventDefault();
            // console.log(e);
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message);
                    }
                    initArtCateList();
                    layui.layer.msg(res.message);
                    // 根据索引删除弹出层
                    layer.close(indexAdd)
                }
            })
        })
        //通过代理 绑定 编辑的点击事件
    var indexEdit = null;
    $('tbody').on('click', ".btn-edit", function() {
        // console.log(1);
        // let id = $(this).attr('data-id');
        //弹出修改的弹出层
        indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html()
            })
            // let id = $(this).attr('data-id');
        let id = this.dataset.id
            //查询数据
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'get',
            success(res) {
                layui.form.val('form-edit', res.data)
            }
        })

    })

    //通过代理 绑定 删除的点击事件
    $('tbody').on('click', ".btn-delete", function() {
        // console.log(1);
        // let id = $(this).attr('data-id');
        let id = this.dataset.id;
        // console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'get',
                success(res) {
                    if (status !== 0) {
                        return layui.layer.msg(res.message);
                    }
                    initArtCateList();
                    layui.layer.msg(res.message);

                }

            })
        })
    })

})