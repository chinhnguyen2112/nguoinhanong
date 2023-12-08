<div class="content">
    <div class="content_about body_width">
        <div class="train_content">
            <div class="top_blog">
                <div class="top_left">
                    <div class="breadcrumb">
                        <span class="span_tag">TAG</span>
                        <span class="this_breadcrumb"><?= $title_page ?></span>
                    </div>
                    <div class="blog_top">
                        <?php foreach ($blog as $key => $val) {
                            if ($key == 0) { ?>
                                <a class="linl_all_detail" title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
                                    <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                                    <div class="box_data_top">
                                        <p class="title_blog_top"><?= $val['title'] ?></p>
                                        <div class="sapo_blog_top"><?= $val['sapo'] ?></div>
                                    </div>
                                </a>
                        <?php }
                        } ?>
                    </div>
                    <div class="list_blog">
                        <?php foreach ($blog as $key => $val) {
                            if ($key > 0) { ?>
                                <div class="this_train">
                                    <a href="/<?= $val['alias'] ?>/">
                                        <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                                        <div class="box_right_data">
                                            <p class="title_blog"><?= $val['title'] ?></p>
                                            <p class="date_post"><span><?= date('d-m-Y', $val['created_at']) ?></span></p>
                                            <div class="des_blog"><?= $val['sapo'] ?></div>
                                        </div>
                                    </a>
                                </div>
                            <?php }
                        }
                        if ($blog != null) { ?>
                            <div class="load_more">
                                <div class="div_bgr_load div_bgr_load_2">
                                    <span>Hiển thị thêm tin</span>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <?php include('includes/sidebar.php') ?>
            </div>
        </div>
    </div>
</div>
<input id="chuyen_muc" value="<?= isset($tag_id) ? $tag_id : 0 ?>" hidden>
<input id="name_page" value="tag" hidden>