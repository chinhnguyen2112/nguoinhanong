<div class="content">
    <div class="content_about body_width">
        <div class="banner_blog">
            <div class="breadcrumb">
                <a href="/">Trang chủ</a>
                <span> / </span>
                <span class="this_breadcrumb"><?= $title_page ?></span>
            </div>
        </div>
        <div class="train_content">
            <div class="top_blog">
                <div class="top_left">
                    <div class="left_blog">
                        <div class="blog_top">
                            <?php foreach ($blog as $key => $val) {
                                if ($key == 0) { ?>
                                    <a class="linl_all_detail" title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
                                        <div class="blog_top_content blog_top_left">
                                            <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                                        </div>
                                        <div class="blog_top_content blog_top_right">
                                            <p class="title_blog_top"><?= $val['title'] ?></p>
                                            <div class="sapo_blog"><?= $val['sapo'] ?>

                                            </div>
                                        </div>
                                    </a>
                            <?php }
                            } ?>
                        </div>
                    </div>
                    <div class="list_blog">
                        <?php foreach ($blog as $key => $val) {
                            if ($key > 0) { ?>
                                <div class="this_train">
                                    <a title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
                                        <p class="title_blog only_mobile"><?= $val['title'] ?></p>
                                    </a>
                                    <a href="/<?= $val['alias'] ?>/">
                                        <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                                        <div class="box_right_data">
                                            <p class="title_blog"><?= $val['title'] ?></p>
                                            <div class="fl_date">
                                                <p class="cate_post"><?php $cate = chuyen_muc(['id' => $val['chuyenmuc']]);
                                                                        echo $cate[0]['name']; ?></p>
                                                <span class="dot_item"></span>
                                                <p class="date_post"><?= date('d-m-Y', $val['created_at']) ?></p>
                                            </div>
                                            <div class="des_blog"><?= $val['sapo'] ?>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                        <?php }
                        } ?>
                        <div class="load_more">
                            <button class="btn_see_more">
                                <span>Hiển thị thêm tin</span>
                                <i class="icon_arrow_down"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <?php include('includes/sidebar.php') ?>
            </div>
        </div>
    </div>
</div>
<input id="chuyen_muc" value="<?= isset($chuyenmuc) ? $chuyenmuc : '' ?>" hidden>