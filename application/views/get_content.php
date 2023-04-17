<button type="submit" class="get_cnt">submit</button>
<span class="alias_url"><?= $alias_url ?></span>
<div class="content_get">
    <?= $data_content ?></div>
<script>
    // console.clear()
    // $('.get_cnt').click();
    $('.get_cnt').click(function() {
        var text_cate_child = $('#breadcrumbs').find('.breadcrumb_last_link').find('a').text();
        var url_cate_child = $('#breadcrumbs').find('.breadcrumb_last_link').find('a').attr('href');
        var url_cate = $('#breadcrumbs').find('span').eq(1).find('a').attr('href');
        var text_cate = $('#breadcrumbs').find('span').eq(1).find('a').html();
        var data_content = $('.content-inner').html();
        var data_title = $('title').text();
        var des = $('.content_get').find("meta[property='og:description']").attr('content');
        var date = $('.content_get').find("meta[property='article:published_time']").attr('content');
        var h1 = $('.content_get').find("H1").text();
        var alias = $('.alias_url').text();
        var form_data = new FormData();
        form_data.append("content", data_content);
        form_data.append("title", data_title);
        form_data.append("des", des);
        form_data.append("date", date);
        form_data.append("h1", h1);
        form_data.append("alias", alias);
        form_data.append("url_cate", url_cate);
        form_data.append("text_cate", text_cate);
        form_data.append("url_cate_child", url_cate_child);
        form_data.append("text_cate_child", text_cate_child);
        $.ajax({
            url: "/Home/add_blog",
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            data: form_data,
            success: function(data) {
                if (data.status == 0) {
                    alert('Thất bại rồi')
                } else if (data.status == 1) {
                    alert('Thành công');
                    window.location.href = "/Home/import_file";
                }
            },
            error: function() {
                alert("error");
            },
        });
    })
    // $(document).ready(function() {

    //     setInterval(swapImages(), 5000);

    //     function swapImages() {

    //         var data_content = $('.content-inner').html();
    //         var data_title = $('title').text();
    //         console.log('Des:' + $('.content_get').find("meta[property='og:description']").attr('content'));
    //         console.log('Date:' + $('.content_get').find("meta[property='article:published_time']").attr('content'));
    //         console.log('H1:' + $('.content_get').find("H1").text());
    //         console.log('Title: ' + data_title);
    //         console.log(data_content)
    //     }
    // });
</script>
<style>
    /* .main_header,
    .site-footer {
        display: none;
    } */
</style>