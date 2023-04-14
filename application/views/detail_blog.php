<div class="widget_home">
    <div class="container_widget_about body_width">
        <div class="breadcrumb">
            <a href="/">Trang chủ</a>
            <span> / </span>
            <a class="link_breadcrumb" href="#"><?= $breadcrumb ?></a>
            <span> / </span>
            <span class="this_breadcrumb"><?= $blog['title'] ?></span>
        </div>
        <div class="box_data_blog">
            <div class="left_blog">
                <h1 class="title_h1"><?= $blog['title'] ?></h1>
                <div class="box_author">
                    <img src="/images/date.svg" alt="Ngày đăng">
                    <div class="text_author">
                        <p class="date_blog">Đăng ngày: <?= date('d-m-Y', $blog['created_at']) ?></p>
                    </div>
                </div>
            </div>
        </div>
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
                    <?= $blog['sapo'] ?>
                    <?= $blog['content'] ?>
                </div>
            </div>
        </div>
        <div class="line_blog"></div>
        <?php if ($blog_same != null) { ?>
        <div class="blog_same">
            <p class="title_blog_same">Tin liên quan</p>
            <div class="list_blog_same">
                <?php
                    foreach ($blog_same as $val) { ?>
                <div class="this_handbook ">
                    <a href="/<?= $val['alias'] ?>/">
                        <img class="img_blog_same" src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                        <div class="data_handbook">
                            <p class="title_handbook"><?= $val['title'] ?></p>
                            <div class="this_des_handbook"><?= $val['sapo'] ?></div>
                            <p class="date_post"><span><?= date('d-m-Y', $val['created_at']) ?><span></p>
                        </div>
                    </a>
                </div>
                <?php
                    } ?>
            </div>
        </div>
        <?php } ?>
    </div>
</div>