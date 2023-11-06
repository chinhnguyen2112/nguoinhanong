<div class="main_header ">
    <div class="header_bot body_width">
        <img src="/images/menu_mb.svg" alt="show menu" class="img_show_menu" onclick="show_menu(this,1)">
        <a class="logo" href="/">
            <img src="/images/logo.png" alt="logo" class="img_logo_bot_header"></a>
        <div class="header_menu">
            <div class="list_menu">
                <!-- <div class="this_menu">
                    <span><a href="/">Trang chủ</a></span>
                </div> -->
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
        <form class="search" method="get" action="/search">
            <input class="search_input" type="text" autocomplete="off" name="search" placeholder="Tìm kiếm...">
            <a class="btn_search">
                <img class="img_search" src="/images/icon-search.png" alt="Tìm kiếm">
            </a>
        </form>
        <div class="search_none_pc">
            <a id="btn" onclick="openList();">
                <img class="img_search" id="open" src="/images/icons8-search-white.png" alt="danh sách">
                <img class="img_close" id="close" src="/images/icons8-close-30.png" alt="danh sách">
            </a>
        </div>
        <div class="input_search_none_pc" id="input_search_none_pc">
            <form id="search" method="get" action="/search">
                <input class="search_input" type="text" autocomplete="off" name="search" placeholder="Tìm kiếm...">
                <!-- <a class="btn_search">
                    <img class="img_search" src="/images/icon-search.png">
                </a> -->
            </form>
        </div>
    </div>
</div>

<div class="main_content">