<button type="submit" class="get_cnt">submit</button>
<div class="content_get">
    <?= $data_content ?>
</div>
<script>
    $('.get_cnt').click(function() {
        var data_content = $('.content-inner').html();
        var data_title = $('title').text();
        console.log('Des:' + $('.content_get').find("meta[property='og:description']").attr('content'));
        console.log('Des:' + $('.content_get').find("meta[property='article:published_time']").attr('content'));
        console.log('H1:' + $('.content_get').find("H1").text());
        console.log('Title: ' + data_title);
        console.log(data_content)
    })
</script>