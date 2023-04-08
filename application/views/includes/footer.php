<?php $menu_cate_parent = chuyen_muc(['parent' => 0]);
$count_line = 0;
if (count($menu_cate_parent) > 2) {
    $count_line =  count($menu_cate_parent) - 2;
} ?>
<footer id="colophon" class="site-footer" role="contentinfo">
    <div class="footer-widgets body_width">
        <div class="box_logo_ft">
            <img class="logo_ft" src="/images/logo.png">
        </div>
        <div class="list_footer bg_mb ">
            <!-- <p class="title_ft">Giới thiệu</p> -->
            <div id="text-1" class="widget widget--footer widget_text">
                <p class="address_ft">Game Esports ở thời điểm hiện tại càng trở nên phổ biến & được xem như một trò chơi thể thao điện tử được Thế Giới công nhận. VnEsports nhận ra được tất cả Gamer đều muốn được có những thông tin tốt nhất về các thể loại game nên VnEsports đã thành lập ra một trang thông tin điện tử giúp cho Gamer có cơ hội được biết nhiều thông tin về các thể loại Esports nhiều hơn.</p>
            </div>
        </div>
        <div class="list_footer pd_mb mg_ft">
            <div id="text-1" class="widget widget--footer widget_text">
                <!-- <div class="textwidget">
                    <p>Danh mục</p>
                </div> -->
                <div class="fl_ft">
                    <div class="left_ft">
                        <?php foreach ($menu_cate_parent as $key =>  $val) {
                            if ($key < count($menu_cate_parent) / 2) { ?>
                                <p class="address_ft"><a href="/<?= $val['alias'] ?>/"><?= $val['name'] ?></a></p>
                        <?php }
                        } ?>
                    </div>
                    <div class="left_ft">
                        <?php foreach ($menu_cate_parent as $key => $val) {
                            if ($key >= count($menu_cate_parent) / 2) { ?>
                                <p class="address_ft"><a href="/<?= $val['alias'] ?>/"><?= $val['name'] ?></a></p>
                        <?php }
                        } ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="list_footer pd_mb list_footer_50">
            <div id="text-1" class="widget widget--footer widget_text">
                <!-- <div class="textwidget">
                    <p>Về chúng tôi</p>
                </div> -->
                <p class="address_ft"><a href="#">Giới thiệu</a></p>
                <p class="address_ft"><a href="#">Liên hệ</a></p>
                <p class="address_ft"><a href="#">Chính sách bảo mật</a></p>
                <p class="address_ft"><a href="#">Câu hỏi thường gặp</a></p>
            </div>
        </div>
        <div class="list_footer pd_mb mg_ft ">
            <div class="box_ft">
                <p class="title_down_ft">Tải ứng dụng</p>
                <p class="btn_down_ft p_down_ft"><img src="/images/favicon.png" alt="VnEsport"> VnEsport</p>
                <p class="btn_down_ft p_down_ft"><img src="/images/favicon.png" alt="VnEsport"> International</p>

                <p class="title_down_ft">Liên hệ</p>
                <p class="p_down_ft"><img src="/images/sms.svg" alt="VnEsport"> Tòa soạn</p>
                <p class="p_down_ft"><img src="/images/icon-eclick.svg" alt="VnEsport"> Quảng cáo</p>
                <p class="p_down_ft"><img src="/images/logo_vlight.svg" alt="VnEsport"> Hợp tác bản quyền</p>
            </div>
            <div class="box_ft">
                <p class="title_down_ft">Đường dây nóng</p>
                <p class="p_hotline"><span>083.888.0123</span> <span class="mini_hotline_ft">(Hà Nội)</span> </p>
                <p class="p_hotline"><span>082.233.3555</span> <span class="mini_hotline_ft">(Hà Nội)</span> </p>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class=" body_width">
            <div class="site-info">© Copyright 2022 VnEsports All Rights Reserved.</div>
        </div>
    </div>
</footer>