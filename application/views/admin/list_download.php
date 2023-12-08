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
        padding: 5px 10px;
        text-decoration: unset !important;
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
        margin-bottom: 5px;
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
        padding: 5px 5px;
        color: #fff;
        cursor: pointer;
        height: -webkit-fill-available;
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

    .btn-group {
        align-items: center;
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
                            <a rel="nofollow" class="a_excel" href="/admin/add_down/">Thêm mới</a>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 50px;">STT</th>
                                        <th>Bài viết</th>
                                        <th>Xem tin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($list as $key  => $val) { ?>
                                        <tr>
                                            <td class="text-center"><?= $key; ?></td>
                                            <td><?= ($val['id_blog'] == 1) ? 'Trang chủ' : base_url() . $val['alias'] . '/' ?></td>
                                            <td><a href="<?= ($val['id_blog'] == 1) ? base_url() : base_url() . $val['alias'] . '/' ?>" target="_blank">Xem bài viết</a></td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <a href="/admin/add_down?id=<?= $val['id']; ?>" target="_blank">
                                                        <button style="font-size: 16px;" class="btn btn-xs btn-default" type="button" data-toggle="tooltip" title="Sửa tài khoản"><i class="fa fa-pencil"></i> Sửa</button>
                                                    </a>
                                                    <?php if (check_admin() == 1 || check_admin() == 2) { ?>
                                                        <span class="delete_job" onclick="del_blog(<?= $val['id']; ?>)">Xóa</span>
                                                    <?php } ?>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<link rel="stylesheet" href="/assets/css/sweetalert.css">
<script src="/assets/js/sweetalert.min.js"></script>
<script>
    function filter_ds() {
        var url_search = $('#url_search').val();
        var url = '/admin/list_down?&url_search=' + url_search;
        window.location.href = url;
    }

    function del_blog(id) {
        if (confirm('Bạn chắc chắn muốn xóa?')) {
            var data = new FormData($("#form")[0]);
            data.append("id", id);
            data.append("table", "download");
            $.ajax({
                url: '/admin/del_blog',
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                data: data,
                success: function(response) {
                    if (response.status == 1) {
                        swal({
                            title: "Thành Công",
                            type: "success",
                            text: "Xóa thành công"
                        }, function() {
                            window.location.reload();
                        });
                    } else {
                        swal({
                            title: "Thất bại",
                            type: "error",
                            text: "Cập nhật thất bại"
                        });
                    }
                },
                error: function(xhr) {
                    alert('Thất bại');
                }
            });
        }
    }
</script>