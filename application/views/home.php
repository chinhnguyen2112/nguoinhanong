<div class="homeContent body_width">
    <div class="container_widget ">
        <div class="right_home">
            <div class="blog_top">
                <a class="linl_all_detail" title="<?= $blog[0]['title'] ?>" href="/<?= $blog[0]['alias'] ?>/">
                    <img src="/<?= $blog[0]['image'] ?>" alt="<?= $blog[0]['title'] ?>">
                    <div class="fl_date">
                        <p class="date_post"><?php $cate = chuyen_muc(['id' => $blog[0]['chuyenmuc']]);
                                  echo $cate[0]['name']; ?></p>
                        <p class="date_post"><?= date('d-m-Y', $blog[0]['created_at']) ?></p>
                    </div>
                    <p class="title_blog_top"><?= $blog[0]['title'] ?></p>
                </a>
            </div>
            <div class="list_blog_home">
                <!-- <p class="title_left_home none_pc">TIN MỚI NHẤT</p> -->
                <?php foreach ($blog as $key => $val) {
                if ($key > 0) { ?>
                <div class="this_content_right">
                    <a class="item_blog_home linl_all_detail link_fl" title="<?= $val['title'] ?>"
                        href="/<?= $val['alias'] ?>/">
                        <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                        <div class="box_content_blog">
                            <div class="fl_date">
                                <p class="date_post"><?php $cate = chuyen_muc(['id' => $val['chuyenmuc']]);
                                          echo $cate[0]['name']; ?></p>
                                <p class="date_post date_blog_home"><?= date('d-m-Y', $val['created_at']) ?></p>
                            </div>
                            <p class="title_blog_left"><?= $val['title'] ?></p>
                            <span class="des_post"><?= $val['sapo'] ?></span>
                        </div>
                    </a>
                </div>
                <?php }
                } ?>
            </div>
            <div class="list_cate_home">
                <div class="title_cate">
                    <span class="title_cate_top"><?= $name_cate_1['cate_name_1'] ?></span>
                </div>
                <div class="content_cate">
                    <?php foreach ($list_cate_1 as $key => $val) {
                        if ($key == 0) { ?>
                    <div class="left_content">
                        <div class="cont_thumb">
                            <a href="/<?= $val['alias'] ?>/">
                                <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>" />
                            </a>
                            <span class="link_cate">
                                <a href="/<?= $name_cate_1['cate_alias_1'] ?>"><?= $name_cate_1['cate_name_1'] ?></a>
                            </span>
                        </div>
                        <div class="big_item">
                            <div class="big_title">
                                <a href="/<?= $val['alias'] ?>/"><?= $val['title'] ?></a>
                            </div>
                            <a href="/<?= $val['alias'] ?>/">
                                <div class="big_infor">
                                    <p class="big_created"><?= date('d-m-Y', $val['created_at']) ?></p>
                                </div>
                                <div class="big_content">
                                    <p class="big_sapo"><?= $val['sapo'] ?></p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="right_content">
                        <?php } else if($key > 0) { ?>
                        <a class="small_item" href="/<?= $val['alias'] ?>/">
                            <div class="small_img">
                                <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>" />
                            </div>
                            <div class="small_content">
                                <div class="small_title">
                                    <p><?= $val['title'] ?></p>
                                </div>
                                <div class="small_date">
                                    <i class="fa fa-clock-o"><?= date('d-m-Y', $val['created_at']) ?></i>
                                </div>
                            </div>
                        </a>
                        <?php }
                        } ?>
                    </div>
                </div>
            </div>
            <div class="list_cate_home">
                <div class="title_cate">
                    <span class="title_cate_top"><?= $name_cate_2['cate_name_2'] ?></span>
                </div>
                <div class="content_cate">
                    <?php foreach ($list_cate_2 as $key => $val) {
                    if ($key == 0) { ?>
                    <div class="left_content">
                        <div class="cont_thumb">
                            <a href="/<?= $val['alias'] ?>/">
                                <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>" />
                            </a>
                            <span class="link_cate">
                                <a href="/<?= $name_cate_2['cate_alias_2'] ?>"><?= $name_cate_2['cate_name_2'] ?></a>
                            </span>
                        </div>
                        <div class="big_item">
                            <div class="big_title">
                                <a href="/<?= $val['alias'] ?>/"><?= $val['title'] ?></a>
                            </div>
                            <a href="/<?= $val['alias'] ?>/">
                                <div class="big_infor">
                                    <p class="big_created"><?= date('d-m-Y', $val['created_at']) ?></p>
                                </div>
                                <div class="big_content">
                                    <p class="big_sapo"><?= $val['sapo'] ?></p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="right_content">
                        <?php } else if($key > 0) { ?>
                        <a class="small_item" href="/<?= $val['alias'] ?>/">
                            <div class="small_img">
                                <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>" />
                            </div>
                            <div class="small_content">
                                <div class="small_title">
                                    <p><?= $val['title'] ?></p>
                                </div>
                                <div class="small_date">
                                    <i class="fa fa-clock-o"><?= date('d-m-Y', $val['created_at']) ?></i>
                                </div>
                            </div>
                        </a>
                        <?php }
                        } ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="left_home">
            <div class="content_left">
                <p class="title_left_home">TIN NỔI BẬT</p>
                <?php foreach ($blog as $key => $val) {
                if ($key < 6) { ?>
                <div class="this_content_left">
                    <a class="linl_all_detail link_fl link_fl_left " title="<?= $val['title'] ?>"
                        href="/<?= $val['alias'] ?>/">
                        <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                        <div class="box_content_blog box_content_blog_left">
                            <p class="date_post"><?php $cate = chuyen_muc(['id' => $val['chuyenmuc']]);
                                            echo $cate[0]['name']; ?></p>
                            <p class="title_blog"><?= $val['title'] ?></p>
                        </div>
                    </a>
                </div>
                <!-- <div class="left_line">
                    <div class="line_home"></div>
                  </div> -->
                <?php }
                  } ?>
            </div>
        </div>
    </div>
</div>