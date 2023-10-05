<div class="main_header ">
    <div class="header_bot body_width">
        <img src="/images/menu_mb.svg" alt="show menu" class="img_show_menu" onclick="show_menu(this,1)" />
        <a class="logo" href="/">
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
        <form class="search" id="search" method="get" action="/search">
            <input class="search_input" id="search_input" type="text" autocomplete="off" name="search" placeholder="Tìm kiếm..." />
            <a class="btn_search">
                <img class="img_search" src="/images/icon-search.png" />
            </a>
        </form>
        <div class="search_none_pc">
            <a id="btn" onclick="openList();">
                <img class="img_search" id="open" src="/images/icons8-search-white.png" />
                <img class="img_close" id="close" src="/images/icons8-close-30.png" />
            </a>
        </div>
        <div class="input_search_none_pc" id="input_search_none_pc">
            <form id="search" method="get" action="/search">
                <input class="search_input" id="search_input" type="text" autocomplete="off" name="search" placeholder="Tìm kiếm..." />
                <!-- <a class="btn_search">
                    <img class="img_search" src="/images/icon-search.png"/>
                </a> -->
            </form>
        </div>
    </div>
</div>

<style>
    /*.top_coming p {
         font-size: 30px;
        text-align: center;
        line-height: 3.5;
        color: #FFF;
    }

    .top_coming {
        background: url(/images/banner/bg-footer.png);
        margin-bottom: 20px;
        position: relative;
    }

    .left_coming {
        position: absolute;
        top: calc(100% + 60px);
        left: 100%;
        background: url(/images/banner/bg-footer.png);
        width: 100px;
        height: 400px;
    }

    .right_coming {
        position: absolute;
        top: calc(100% + 60px);
        right: 100%;
        background: url(/images/banner/bg-footer.png);
        width: 100px;
        height: 400px;
    }

    .left_coming p,
    .right_coming p {
        font-size: 20px;
        line-height: 1.5;
        padding: 10px;
        color: #fff;
        writing-mode: tb;
        margin: auto;
    }

    .bottom_coming {
        width: 100%;
        position: fixed;
        top: calc(100% - 100px);
        z-index: 11111111111111;
        left: 0;
    }

    .list_bot_coming {
        display: flex;
        max-width: 1280px;
        width: 100%;
        margin: auto;
        justify-content: center;
    }

    .bottom_coming p {
        font-size: 20px;
        color: #fff;
        text-align: center;
    }

    .this_bot {
        background: url(/images/banner/bg-footer.png);
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }

    .this_bot:first-child {
        border-right: 2px solid #fff;
    }

    .close {
        background: url(/images/banner/bg-footer.png);
        position: absolute;
        top: -31px;
        padding: 8px 15px;
        border-radius: 8px;
    }

    .close img {
        width: 20px;
    }

    .side_coming {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
    }

    .list_side_coming {
        max-width: 1180px;
        position: relative;
        width: 100%;
        margin: auto;
    }

    @media only screen and (max-width: 1366px) {
        .left_coming {
            left: calc(100% - 50px);
            top: 226px;
        }

        .right_coming {
            right: calc(100% - 50px);
            top: 226px;
        }

    } */

    /* .top_coming,
    .bottom_coming,
    .side_coming {
        display: none;
    } */
</style>
<div class="main_content">
    <!-- <div class="top_coming body_width">
        <p>COMING SOON</p>
    </div> -->