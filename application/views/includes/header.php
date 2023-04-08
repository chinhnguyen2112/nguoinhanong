<div class="main_header ">
    <div class="header_bot body_width">
        <a href="/">
            <img src="/images/logo.png" alt="logo" class="img_logo_bot_header"></a>
        <div class="header_menu">
            <div class="list_menu">
                <div class="this_menu">
                    <span><a href="/">Trang chủ</a></span>
                </div>
                <?php $menu_cate_parent = chuyen_muc(['parent' => 0]);
                foreach ($menu_cate_parent as $val) {
                    $menu_cate = chuyen_muc(['parent' => $val['id']]); ?>
                    <div class="this_menu">
                        <span><a href="/<?= $val['alias'] ?>/"><?= $val['name'] ?></a></span>
                        <?php if ($menu_cate != null) { ?>
                            <div class="menu_con">
                                <?php foreach ($menu_cate as $val1) { ?>
                                    <p><a href="/<?= $val1['alias'] ?>/"><?= $val1['name'] ?></a></p>
                                <?php } ?>
                            </div>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
        </div>
        <img src="/images/menu_mb.svg" alt="show menu" class="img_show_menu" onclick="show_menu(this,1)">
    </div>
</div>
<div class="main_content">