<div class="widget_home">
    <div class="container_widget_about body_width">
        <div class="main_content_blog">
            <div class="blog_content">
                <div class="breadcrumb">
                    <span>
                        <img src="/images/icons/icons8-home-20.png" alt="icon home small">
                    </span>
                    <span>
                        <img src="/images/icons/icons8-arrow-right-10.png" alt="icon arrow right">
                    </span>
                    <?php if (isset($cate_1) && $cate_1 != null) { ?>
                        <a class="link_breadcrumb" href="/<?= $cate_1['alias'] ?>/"><?= $cate_1['name'] ?></a>
                        <span>
                            <img src="/images/icons/icons8-arrow-right-10.png" src="icon arrow right">
                        </span>
                    <?php }
                    if (isset($cate) && $cate != null) { ?>
                        <a class="link_breadcrumb" href="/<?= $cate['alias'] ?>/"><?= $cate['name'] ?></a>

                    <?php } ?>
                </div>
                <div class="box_data_blog">
                    <div class="left_blog">
                        <h1 class="title_h1"><?= $blog['title'] ?></h1>
                        <div class="box_author">
                            <div class="box_date">
                                <p class="date_blog"><?= replace_date($blog['created_at']) ?></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sapo_top"> <?= $blog['sapo'] ?></div>
                <div class="right_detail">
                    <div class="mucluc_blog" id="mucluc_blog">
                        <div class="box_title_ml">
                            <p class="title_mucluc" id="title_mucluc"><img class="img_ml" src="/images/icons/mucluc.png" alt="mục lục"> Mục lục</p>
                            <img src="/images/icon_arrow_bold.webp" class="img_show_ml" alt="mục lục">
                        </div>
                        <ul class="list_mucluc" id="list_mucluc">

                        </ul>
                    </div>
                </div>
                <div class="left_detail">
                    <div class="content_blog" id="content_blog">
                        <?= $blog['content'] ?>
                    </div>
                </div>
                <?php if (isset($author) && $author != null) { ?>
                    <div class="text_author">
                        <a class="name_author" href="/<?= $author['alias'] ?>/"><?= $author['name'] ?></a>
                    </div>
                <?php } ?>
                <?php
                if ($blog['tag'] != '') {
                    $tag = explode(',', $blog['tag']); ?>
                    <div class="box_tag">
                        <p class="title_tag"><img src="/images/icons/icon-chu-de.svg" alt="Chủ đề"> Chủ đề:</p>
                        <?php foreach ($tag as $key_tag => $val) {
                            $this_tag = tag(['id' => $val]);
                            echo '<a href="/' . $this_tag[0]['alias'] . '/" class="this_tag">' . $this_tag[0]['name'] . '</a>';
                        } ?>
                    </div>
                <?php } ?>
                <div class="sidebar_mid">
                    <?php include('includes/sidebar.php') ?>
                </div>

                <?php if ($blog_same != null) { ?>
                    <div class="blog_same">
                        <div class="list_blog_same">
                            <?php
                            foreach ($blog_same as $val) { ?>
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
                            <?php
                            } ?>
                        </div>
                    </div>
                <?php } ?>
            </div>
            <div class="sidebar_bot">
                <?php include('includes/sidebar.php') ?>
            </div>
        </div>
    </div>
</div>