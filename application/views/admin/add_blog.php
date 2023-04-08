<link rel="stylesheet" href="/assets/css/select2.min.css">
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
    <input type="hidden" id="id_blog" name="id" hidden value="<?= (isset($id) && $id > 0) ? $id : '' ?>" />
    <div class="form-group mb-3" style="text-align: center;">
        <label for="image">
            <img src="/<?= (isset($blog) && $blog['image'] != '') ? $blog['image'] : 'images/avt.png' ?>" style="cursor:pointer" id="mainImage" width="300px" height="200px" alt=" ảnh sản phẩm">
        </label>
        <p>Ảnh đại diện</p>
        <input type="file" style="width: 0;" accept="image/png, image/jpeg" onchange="document.getElementById('mainImage').src = window.URL.createObjectURL(this.files[0])" id="image" name="image">
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">H1 (50 > 70 kí tự)</label>
        <input type="text" name="title" value="<?= (isset($blog)) ? $blog['title'] : ''; ?>" class="form-control" />
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Keyword</label>
        <input type="text" name="meta_key" id="meta_key" value="<?= (isset($blog)) ? $blog['meta_key'] : ''; ?>" oninput="show_alias(this.value)" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Đường dẫn thân thiện</label>
        <input type="text" name="alias" value="<?= (isset($blog)) ? $blog['alias'] : ''; ?>" id="alias" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Chuyên mục</label>
        <select name="category" id="category" class="form-control">
            <?php
            $chuyenmuc = chuyen_muc(['level !=' => 1]);
            foreach ($chuyenmuc as $key => $val) {
                $name = $val['name'];
                if ($val['parent'] > 0) {
                    $cate_parent = chuyen_muc(['id' => $val['parent']]);
                    $name = $cate_parent[0]['name'] . ' - ' . $val['name'];
                } ?>
                <option <?= (isset($blog) &&  $blog['chuyenmuc'] == $val['id']) ? 'selected' : '' ?> value="<?= $val['id'] ?>"><?= $name ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">tag</label>
        <select name="tag[]" id="tag" class="form-control select2" multiple>
            <?php
            $tag = tag();
            $tag_blog = explode(',', $blog['tag']);
            foreach ($tag as $key => $val) {
                $name = $val['name'];
            ?>
                <option <?= (isset($blog) &&  in_array($val['id'], $tag_blog)) ? 'selected' : '' ?> value="<?= $val['id'] ?>"><?= $name ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Meta Title (50 > 60 kí tụ)</label>
        <input type="text" name="meta_title" value="<?= (isset($blog)) ? $blog['meta_title'] : ''; ?>" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Meta Description</label>
        <textarea style=" height:150px" name="meta_des" id="meta_des" class="form-control"><?= (isset($blog) && $blog['meta_des'] != '') ? $blog['meta_des'] : '' ?></textarea>
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Sapo</label>
        <textarea name="sapo" id="sapo"><?= (isset($blog) && $blog['sapo'] != '') ? $blog['sapo'] : '' ?></textarea>
    </div>
    <div class="form-group mb-3">
        <label class="label" for="name">Nội dung</label>
        <textarea name="content" id="editor"><?= (isset($blog) && $blog['content'] != '') ? $blog['content'] : '' ?></textarea>
    </div>
    <div class="form-group">
        <button type="submit" class="form-control btn btn-primary submit px-3"><?= (isset($id)) ? "Sửa" : "Thêm mới" ?></button>
    </div>
</form>
<script src="/assets/js/jquery.validate.min.js"></script>
<script src="/assets/js/select2.min.js"></script>
<script src="/assets/js/sweetalert.min.js"></script>
<script src="/ckeditor/ckeditor.js"></script>
<script defer type="text/javascript">
    CKEDITOR.replace('editor');
    CKEDITOR.replace('sapo');
</script>
<script>
    $('.select2').select2({
        placeholder: 'Chọn tag',
        'height': '100%'
    });

    function get_alias(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, ' ');
        str = str.replace(/\s+/g, '-');
        str = str.toLowerCase();
        return str;
    }

    function show_alias(str) {
        var alias = get_alias(str);
        $("#alias").val(alias);
    }
    var check_avt = ($('#id_blog').val() > 0) ? false : true;
    $("#form").validate({
        onclick: false,
        rules: {
            "image": {
                required: check_avt,
            },
            "title": {
                required: true,
            },
            "meta_title": {
                required: true,
            },
            "meta_key": {
                required: true,
            },
            "category": {
                required: true,
            },
            "meta_des": {
                required: true,
            },
        },
        messages: {
            "image": {
                required: 'chưa chọn ảnh đại diện',
            },
            "title": {
                required: "Chưa nhập H1 bài viết",
            },
            "meta_title": {
                required: "Chưa nhập title bài viết",
            },
            "meta_key": {
                required: "Chưa nhập keyword bài viết",
            },
            "category": {
                required: "Chưa chọn chuyên mục bài viết",
            },
            "meta_des": {
                required: "Chưa nhập description",
            },
        },
        submitHandler: function(form) {
            var data = new FormData($("#form")[0]);
            data.append("content", CKEDITOR.instances.editor.getData());
            data.append("sapo", CKEDITOR.instances.sapo.getData());
            $.ajax({
                url: '/ajax_add_blog',
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
                    } else if (response.status == 2) {
                        swal({
                            title: "Thất bại",
                            type: "error",
                            text: "URL bài viết đã tồn tại"
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
            return false;
        }
    });
    // $("#category").change(function(e) {
    //     var id_error = $(this).val();
    //     $.ajax({
    //         type: "post",
    //         url: "/Error_ctr/get_error",
    //         data: {
    //             "id": id_error
    //         },
    //         success: function(data) {
    //             data = JSON.parse(data.replace('gi', ''));
    //             if (data.length > 0) {
    //                 var i = 0;
    //                 var html = "<option value=''></option>";
    //                 for (i = 0; i < data.length; i++) {
    //                     html = html + `<option value="` + data[i].id + `">` + data[i].name + `</option>`;
    //                 }
    //                 $('#ls_error').html(html);
    //             }
    //         }
    //     });
    // });
</script>