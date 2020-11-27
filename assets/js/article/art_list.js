$(function() {
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    //美化时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var m = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())
        return `${y}-${m}-${h}-${d} ${m}:${s}`
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //获取文章列表
    initTable();
    //初始化文章分类
    initCate();

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'get',
            data: q,
            success(res) {
                // console.log(res);
                //     if (res.status !== 0) {
                //         console.log(res);
                //         return layui.layer.msg(res.message)
                //     }
                //     layui.layer.msg(res.message)
                // }
                //使用模板来渲染页面
                let strHtml = template('tpl-table', res);
                $('tbody').html(strHtml);
                renderPage(res.total)

            }
        })
    }

    //初始化文章分类
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success(res) {
                console.log(res);
                //使用模板来渲染页面
                let strHtml = template('tpl-cate', res);
                $('[name=cate_id]').html(strHtml);
                layui.form.render();
            }
        })
    }

    //为筛选表单添加submit 事件

    $('#form-search').on('submit', function(e) {
            e.preventDefault();
            //获取表单中的值

            q.cate_id = $('[name=cate_id]').val();
            q.state = $('[name=state]').val();

            initTable()
        })
        //定义渲染分页的方法
        //jump 函数调用机制 1 laypage。render 会执行首次调用，点击页码触发 3 切换页面容量调用
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox', //分页容器
            count: total, //总数条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 3, 4], //页容量选项
            jump(obj, first) { //点击页码事件
                q.pagenum = obj.curr;
                //把最新的条目数给到q 
                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function() {
        //获取删除按钮的个数
        // console.log(1);
        // 获取删除按钮的个数 之对于最后一页的优化 点击删除之后根据删除按钮的个数判断数据行数如果等于1就让q.pange 减一
        var len = $('.btn-delete').length
        console.log(len)
            // 获取到文章的 id
        var id = $(this).attr('data-id')
            // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                        // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                        // 如果没有剩余的数据了,则让页码值 -1 之后,
                        // 再重新调用 initTable 方法
                        // 4
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index)
        })
    })


})