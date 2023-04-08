<div class="homeContent body_width">
  <div class="banner_all">
    <div class="this_nanner_all"><img src="/images/banner1.gif" alt="banner"></div>
    <div class="this_nanner_all"><img src="/images/banner2.gif" alt="banner"></div>
  </div>
  <div class="container_widget ">
    <?php if ($blog != null) { ?>
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
                <a class="linl_all_detail link_fl" title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
                  <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
                  <div class="box_content_blog">
                    <div class="fl_date">
                      <p class="date_post"><?php $cate = chuyen_muc(['id' => $val['chuyenmuc']]);
                                            echo $cate[0]['name']; ?></p>
                      <p class="date_post"><?= date('d-m-Y', $val['created_at']) ?></p>
                    </div>
                    <p class="title_blog"><?= $val['title'] ?></p>
                    <span class="des_post"><?= $val['sapo'] ?></span>
                  </div>
                </a>
              </div>
              <div class="line_home"></div>
          <?php }
          } ?>
        </div>
        <div class="load_more"></div>
      </div>
    <?php } ?>
    <div class="left_home">
      <div class="slick_banner">
        <img class="img_banner_slick" src="/images/banner/pic1.jpg" alt="banner">
        <img class="img_banner_slick" src="/images/banner/pic2.jpg" alt="banner">
        <img class="img_banner_slick" src="/images/banner/pic3.jpg" alt="banner">
        <img class="img_banner_slick" src="/images/banner/pic4.jpg" alt="banner">
      </div>
      <div class="content_left">
        <p class="title_left_home">TIN NỔI BẬT</p>
        <?php foreach ($blog as $key => $val) { ?>
          <div class="this_content_left">
            <a class="linl_all_detail link_fl link_fl_left " title="<?= $val['title'] ?>" href="/<?= $val['alias'] ?>/">
              <img src="/<?= $val['image'] ?>" alt="<?= $val['title'] ?>">
              <div class="box_content_blog box_content_blog_left">
                <p class="date_post"><?php $cate = chuyen_muc(['id' => $val['chuyenmuc']]);
                                      echo $cate[0]['name']; ?></p>
                <p class="title_blog title_blog_left"><?= $val['title'] ?></p>
              </div>
            </a>
          </div>
          <div class="left_line">
            <div class="line_home"></div>
          </div>
        <?php } ?>
      </div>
      <img class="img_qc_bot" src="/images/banner/pic1.jpg" alt="banner">
    </div>
  </div>
</div>