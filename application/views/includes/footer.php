<?php $menu_cate_parent = chuyen_muc(['parent' => 0]);
$count_line = 0;
if (count($menu_cate_parent) > 2) {
    $count_line =  count($menu_cate_parent) - 2;
} ?>
<footer id="colophon" class="site-footer" role="contentinfo">
    <div class="footer-widgets body_width">
        <div class="content_footer">
            <div class="ft_left">
                <img class="logo_ft" src="/images/logo.png" alt="logo footer">
                <div class="widget">
                    <p class="title_widget">Người Nhà Nông - Kênh chia sẻ kiến thức về nông nghiệp</p>
                    <div class="contact_infor">
                        <ul>
                            <li>
                                <img src="/images/icon_address.png" alt="icon address">
                                <p>Số 123 Nguyễn Trãi, Thanh Xuân, Hà Nội.</p>
                            </li>
                            <li>
                                <img src="/images/icon_website.png" alt="icon website">
                                <p>nguoinhanong.vn</p>
                            </li>
                            <li>
                                <img src="/images/icon_mail.png" alt="icon email">
                                <p>info@nguoinhanong.vn</p>
                            </li>
                            <li>
                                <img src="/images/icon_fb.png" alt="icon facebook">
                                <p>Fb.com/nguoinhanong.vn</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="ft_right">
                <div class="r_01">
                    <p class="title_r">CHUYÊN MỤC</p>
                    <div class="list_links">
                        <?php $menu_cate_parent = chuyen_muc(['parent' => 0]);
                        foreach ($menu_cate_parent as $val) {
                            $menu_cate = chuyen_muc(['parent' => $val['id']]); ?>
                            <div class="item_link_ft">
                                <span>
                                    <a href="/<?= $val['alias'] ?>/">
                                        <img src="/images/icon_arrow_ft.png" alt="icon arrow footer">
                                        <?= $val['name'] ?>
                                    </a>
                                </span>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="r_02">
                    <p class="title_r">ĐĂNG KÝ NHẬN TIN</p>
                    <form class="form_email" id="newsletter">
                        <p><strong>Đăng ký nhận bản tin</strong> , bài viết tư vấn câp nhật hằng ngày.</p>
                        <input class="input_text" type="email" name="email" placeholder="Email Address" required>
                        <input class="btn_submit_form" value="SIGN UP" type="submit">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class="content_copy body_width">
            <div class="site-info"> © 2022 Người Nhà Nông</div>
            <div class="list_link_bottom">
                <ul>
                    <li>
                        <a href="/gioi-thieu/">Giới thiệu</a>
                    </li>
                    <li>
                        <a href="/lien-he/">Liên hệ</a>
                    </li>
                    <li>
                        <a href="/chinh-sach-bao-mat/">Chính sách</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>