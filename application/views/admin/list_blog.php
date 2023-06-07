<style>
    * {

        font-family: "Poppins", sans-serif;

    }

    .white_text {
        border-radius: 5px;
        width: max-content;
        height: 100%;
        border: none;
        background: linear-gradient(95.83deg, #8AC02C 68.93%, #398100 113.08%);

        color: #fff;

    }

    .a_excel {
        border-radius: 5px;
        border: none;
        background: linear-gradient(95.83deg, #8AC02C 68.93%, #398100 113.08%);

        color: #fff;

    }

    .box_search_forrm {
        margin: 10px auto;
        padding: 10px;

        max-width: 100%;

    }

    .box_search_forrm p {
        text-align: center;

        font-size: 25px;

    }

    .box_search_forrm input,
    .box_search_forrm select {
        width: calc((100% - 100px)/5);
        height: 35px;
        margin: 0 5px 5px 0;
        padding: 0 5px;

        color: #5f5f5f;

    }

    input:focus {

        border: 1px solid;

    }

    .box_search_forrm button {
        border-radius: 5px;
        width: 80px;
        height: 35px;
        border: none;
        background: linear-gradient(95.83deg, #8AC02C 68.93%, #398100 113.08%);

        color: #fff;

    }

    .box_search_forrm .key_search {

        padding-left: 5px;

    }

    .change_content_ul {
        display: flex;
        justify-content: space-between;

        padding: 0;

    }

    .change_content_li {
        position: relative;
        text-align: center;
        background: #844fc1;
        width: 100%;
        height: 60px;
        font-weight: 700;
        font-size: 18px;
        line-height: 29px;
        text-transform: uppercase;
        color: #ffffff;
        justify-content: center;
        display: flex;

        align-items: center;

    }

    .change_content_li:hover {
        cursor: pointer;

        background: #ff2b2b;

    }

    .edit_job a,
    .edit_job {
        background: #6fc700;
        padding: 3px 5px;
        color: #fff !important;
        cursor: pointer;

        text-decoration: auto !important;

    }

    .del_job,

    .delete_job,
    .del_list {
        background: red;
        padding: 3px 5px;
        color: #fff;

        cursor: pointer;

    }

    .link_add a {
        background: #6fc700;
        padding: 3px 5px;
        color: #fff;

        cursor: pointer;

    }

    .input-group select,
    .input-group input {
        width: 100%;
        height: 100%;

        border: 1px solid #ccc !important;

    }

    .list_tag {
        width: 300px;
        display: flex;
        flex-wrap: wrap;

        gap: 5px;

    }

    @media only screen and (max-width: 540px) {

        .box_search_forrm input,
        .box_search_forrm select {
            width: 100%;

        }

        .change_content_li {
            /* width: 107.67px; */
            height: 40px;
            font-size: 12px;
            line-height: 18px;
            font-weight: 400;

        }

        .change_content_li:last-child {
            margin-right: 0;

        }

        .card .card-body {
            padding: 10px;

        }

    }

    @media only screen and (max-width: 375px) {
        .change_content_li {
            font-size: 10px;

        }

    }
</style>

<?php $CI = &get_instance();  ?>

<div class="change_content">
    <ul class="change_content_ul">

        <li class="change_content_li" data-active="1">Danh sách bài viết</li>

    </ul>
    <div class="main_change">
        <div class="doing">
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="box_search_forrm">
                            <p>Bộ lọc</p>
                            <input id="key_search" class="key_search" placeholder="Nhập từ khóa..." value="<?= $this->input->get('key_search') ?>" />
                            <select name="" id="cate">
                                <option value="">Chọn chuyên mục</option>
                                <?php $list_cate = chuyen_muc(['parent' => 0]);
                                foreach ($list_cate as $val) {  ?>
                                    <option <?= ($this->input->get('cate') == $val['id']) ? 'selected' : '' ?> value="<?= $val['id'] ?>"><?= $val['name'] ?></option>
                                <?php } ?>
                            </select>
                            <select name="" id="child_cate">
                                <option value="">Chọn chuyên con</option>
                                <?php $list_cate = chuyen_muc(['parent' => $this->input->get('cate')]);
                                foreach ($list_cate as $val) {  ?>
                                    <option <?= ($this->input->get('child_cate') == $val['id']) ? 'selected' : '' ?> value="<?= $val['id'] ?>"><?= $val['name'] ?></option>
                                <?php } ?>
                            </select>
                            <button class="filter_btn" onclick="filter_ds()"><span>Lọc</span></button>
                        </div>
                        <div class="table-responsive">
                            <span>Có: <b><?= number_format($count_list) ?></b> kết quả</span>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 50px;">STT</th>
                                        <th class="text-center" style="width: 50px;">ID</th>
                                        <th>Tiêu đề</th>
                                        <th>Xem tin</th>
                                        <th>Chuyên mục</th>
                                        <th style="width:300px">URL</th>
                                        <th style="width:50px">Type</th>
                                        <th>Ngày đăng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($list as $key  => $val) {
                                    ?>
                                        <tr>
                                            <td class="text-center"><?= $key; ?></td>
                                            <td class="text-center"><?= $val['id']; ?></td>
                                            <td><?= $val['title'] ?></td>
                                            <td><a href="/<?= $val['alias'] ?>" target="_blank">Xem tin</a></td>

                                            <td>

                                                <?php
                                                $chuyenmuc = chuyen_muc(['id' => $val['chuyenmuc']]);
                                                // foreach ($chuyenmuc as $val1) {
                                                //     if ($val1['id'] == $val['chuyenmuc']) {
                                                echo '<a href="/' . $chuyenmuc[0]['alias'] . '" target="_blank">' . $chuyenmuc[0]['name'] . '</a>';
                                                //     }
                                                // }
                                                ?>
                                            </td>
                                            <td style="width:300px"><?= 'https://nguoinhanong.vn/' . $val['alias'] . '/' ?></td>
                                            <td style="width:50px">
                                                <!-- <span><?= $val['type']  ?></span> -->
                                                <span>
                                                    <?php
                                                    if ($val['type'] == '0') {
                                                        echo 'Blog';
                                                    } else {
                                                        echo 'Page';
                                                    }
                                                    ?>
                                                </span>
                                            </td>
                                            <td><?= date('d-m-Y', $val['created_at']) ?></td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <a href="/add_blog?id=<?= $val['id']; ?>" target="_blank">
                                                        <button style="font-size: 16px;" class="btn btn-xs btn-default" type="button" data-toggle="tooltip" title="Sửa tài khoản"><i class="fa fa-pencil"></i> Sửa</button>

                                                    </a>

                                                </div>
                                            </td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                        <?php echo $this->pagination->create_links() ?>
                    </div>
                </div>
            </div>

        </div>
    </div>



</div>

<script>
    function filter_ds() {
        var key_search = $('#key_search').val();
        var cate = $('#cate').val();
        var child_cate = $('#child_cate').val();
        var url = '/admin/list_blog?key_search=' + key_search + '&cate=' + cate + '&child_cate=' + child_cate;

        window.location.href = url;

    }
    $('#cate').change(function() {
        var id_cate = $(this).val();
        $.ajax({
            type: "post",
            url: "/Admin/ajax_child_cate",
            data: {
                "id": id_cate
            },
            success: function(data) {
                data = JSON.parse(data.replace('gi', ''));
                if (data.length > 0) {
                    var i = 0;
                    var html = "<option value=''>Chọn chuyên mục con</option>";
                    for (i = 0; i < data.length; i++) {
                        html = html + `<option value="` + data[i].id + `">` + data[i].name + `</option>`;
                    }
                    $('#child_cate').html(html);
                }
            }

        });

    })
</script>