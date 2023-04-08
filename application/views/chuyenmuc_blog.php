<div class="content">
    <div class="content_about body_width">
        <div class="banner_blog">
            <div class="breadcrumb">
                <a href="/">Trang chủ</a>
                <span> / </span>
                <span class="this_breadcrumb"><?= $title_page ?></span>
            </div>
            <div class="banner_all">
                <div class="this_nanner_all"><img src="/images/banner1.gif" alt="banner"></div>
                <div class="this_nanner_all"><img src="/images/banner2.gif" alt="banner"></div>
            </div>
        </div>
        <?php if (isset($content_tag) && $content_tag != '') { ?>
            <div class="blog_content">
                <div class="right_detail">
                    <div class="mucluc_blog" id="mucluc_blog">
                        <p class="title_mucluc" id="title_mucluc">Mục lục</p>
                        <ul class="list_mucluc" id="list_mucluc">

                        </ul>
                    </div>
                </div>
                <div class="left_detail">
                    <div class="content_blog" id="content_blog">
                        <?= $content_tag ?>
                    </div>
                </div>
            </div>
        <?php } ?>
        <div class="train_content">
            <div class="left_blog">
                <div class="blog_top">
                    <?php foreach ($blog as $key => $val) {
                        if ($key == 0) { ?>
                            <a class="linl_all_detail" title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
                                <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                                <div class="fl_date">
                                    <p class="date_post"><?= date('d-m-Y', $val['created_at']) ?></p>
                                </div>
                                <p class="title_blog_top"><?= $val['title'] ?></p>
                            </a>
                    <?php }
                    } ?>
                </div>
            </div>
            <div class="right_blog">
                <?php foreach ($blog as $key => $val) {
                    if ($key < 4 && $key > 0) { ?>
                        <div class="this_train_right">
                            <a class="linl_all_detail" title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
                                <p class="title_blog"><?= $val['title'] ?></p>
                                <div class="des_blog"><?= $val['sapo'] ?></div>
                            </a>
                        </div>
                <?php }
                } ?>
            </div>
            <div class="list_blog">
                <?php foreach ($blog as $key => $val) {
                    if ($key > 4) { ?>
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
                } ?>
            </div>
        </div>
    </div>
</div>