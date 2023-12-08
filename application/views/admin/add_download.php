<style>
    .form_change_pass {
        width: 800px;
        margin: auto;
    }

    .error {
        font-size: 14px;
        color: red;
    }

    .label,
    .name_flex {
        width: 100%;
    }

    .flex_input {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .input_fl {
        width: 49%;
    }

    .box_flex {
        display: flex;
        justify-content: space-between;
    }

    .box_vip {
        padding: 10px;
        background: #e4e4e4;
    }

    .add_hv {
        color: #2758dd;
        cursor: pointer;
        font-weight: 600;
    }

    .name_gr {
        font-size: 18px;
        font-weight: 600;
    }

    .box_relative {
        position: relative;
        margin-bottom: 30px !important;
    }

    .nav_blog_skill {
        position: absolute;
        display: none;
        max-height: 200px;
        max-width: 320px;
        right: calc(50% - 160px);
        z-index: 1;
    }

    .sl_skill {
        display: none;
    }

    .box_add_skill {
        display: flex;
        justify-content: space-between;
        gap: 0 20px;
        flex-wrap: wrap;
    }

    .sweet-alert {
        box-shadow: 0px 12px 22px rgb(0 0 0 / 44%);
    }

    .list_show_skill {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px 16px;
    }

    .this_skill {
        display: flex;
        justify-content: space-between;
        position: relative;
        width: calc(50% - 8px);
        align-items: center;
        border: 1px solid #ccc;
        padding-left: 3px;
        flex-wrap: wrap;
        height: 42px;
    }

    .this_skill label {
        width: 100%;
    }

    .this_skill img {
        position: absolute;
        background: red;
        right: -7px;
        border-radius: 50%;
        top: -7px;
        cursor: pointer;
        width: 17px;
    }

    .this_skill p {
        margin: 0;
    }

    .nav_p_input {
        position: absolute;
        right: 5px;
        font-size: 16px;
        top: calc(50% - 11px);
    }

    .this_skill input {
        padding: 10px 35px 10px 10px;
        padding-right: 35px;
        font-size: 16px;
        height: auto;
        text-align: right;
    }

    .close {
        font-size: 14px;
        background: red;
        padding: 5px;
        color: #fff;
        font-weight: 600;
        opacity: 1;
        cursor: pointer;
        text-shadow: unset;
    }

    .this_hv,
    .this_kn {
        padding: 5px;
        border: 5px solid #fff;
        margin-bottom: 10px;
    }

    .select2-selection__choice {
        padding: 8px 5px !important;
        font-size: 12px !important;
    }

    @media only screen and (max-width: 1024px) {
        .form_change_pass {
            width: 100%;
        }
    }
</style>
<link rel="stylesheet" href="/assets/css/sweetalert.css">
<form id="form" class="form_change_pass">
    <input type="hidden" id="id_pass" name="id" hidden value="<?= (isset($id) && $id > 0) ? $id : '' ?>" />
    <div class="form-group mb-3">
        <label class="label" for="name">Url bài viết</label>
        <input type="text" name="url_blog" id="url_blog" value="<?= (isset($pass)) ? base_url() . $pass['alias'] : ''; ?>" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">PassWord Download</label>
        <input type="text" name="password" value="<?= (isset($pass)) ? $pass['password'] : ''; ?>" class="form-control" />
    </div>
    <div class="form-group">
        <button type="submit" class="form-control btn btn-primary submit px-3"><?= (isset($id)) ? "Sửa" : "Thêm mới" ?></button>
    </div>
</form>
<script src="/assets/js/jquery.validate.min.js"></script>
<script src="/assets/js/sweetalert.min.js"></script>

<script>
    $("#url_blog").keypress(function(evt) {
        var num = String.fromCharCode(evt.which);
        if (num == " ") {
            evt.preventDefault();
        }
    });
    $("#form").validate({
        onclick: false,
        rules: {
            "url_blog": {
                required: true,
                // url: true
            },
            "password": {
                required: true,
            },
        },
        messages: {
            "url_blog": {
                required: "Không được để trống",
                // url: "Sai định dạng url"
            },
            "password": {
                required: "Không được để trống",
            },
        },
        submitHandler: function(form) {
            var data = new FormData($("#form")[0]);
            $.ajax({
                url: '/admin/ajax_down',
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
                            text: "Cập nhật thành công"
                        }, function() {
                            window.location.reload();
                        });
                    } else {
                        swal({
                            title: "Thất bại",
                            type: "error",
                            text: response.msg
                        });
                    }
                },
                error: function(xhr) {
                    alert('Thất bại');
                }
            });
            return false;
        }
    });
</script>