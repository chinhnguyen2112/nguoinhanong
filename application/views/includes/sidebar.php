<link rel="stylesheet" href="/assets/css/sidebar.css">
<div class="sidebar_content">
    <div class="mail_box">
        <div class="form_mail">
            <div class="content_mail">
                <div class="mail_top">
                    <div class="logo_mail_box">
                        <img src="/images/logo.png" alt="logo">
                    </div>
                    <div class="content_mail_box">
                        <div class="item_cont">
                            <img src="/images/icon_vege01.png" alt="icon bách khoa a-z">
                            <p class="text_item_mail">Tổng Hợp Phương Pháp Trồng Cây</p>
                        </div>
                        <div class="item_cont">
                            <img src="/images/icon_vege02.png" alt="icon mã ưu đãi">
                            <p class="text_item_mail">Rau Sạch Theo Mùa</p>
                        </div>
                        <div class="item_cont">
                            <img src="/images/icon_vege03.png" alt="icon xu hướng">
                            <p class="text_item_mail">Canh Tác Ruộng Nương Hiệu Quả</p>
                        </div>
                    </div>
                    <div class="content_mail_nonpc">
                        <p>Xu hướng thịnh hành, bí quyết xịn xò và ưu đãi hấp dẫn đã sẵn sàng gửi đến bạn</p>
                    </div>
                </div>
                <div class="mail_bot">
                    <input class="input_mail" name="input_mail" id="input_mail" type="email" placeholder="Nhập Email của bạn">
                    <button class="submit_mail">Đăng Ký Ngay</button>
                </div>
            </div>
        </div>
    </div>
    <div class="hot_news">
        <div class="box_heading">
            <a href="#">
                <img src="/images/icons8-fire-30.png" alt="icon fire">
                Tin Mới Nóng
            </a>
        </div>
        <div class="box_content">
            <ul>
                <?php foreach ($blog_new as $key => $val) { ?>
                    <li class="item_hot_news">
                        <a href="/<?= $val['alias'] ?>"><?= $val['title'] ?></a>
                    </li>
                <?php } ?>
            </ul>
            <div class="see_more_news">
                <div class="btn_more">
                    <a href="/">Xem Thêm</a>
                </div>
            </div>
        </div>
    </div>
</div>