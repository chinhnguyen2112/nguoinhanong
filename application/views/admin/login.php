<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>OHS Admin</title>
    <!-- base:css -->
    <link rel="stylesheet" href="/assets/css/admin/vendors/typicons/typicons.css">
    <link rel="stylesheet" href="/assets/css/admin/vendors/css/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="/assets/css/admin/vertical-layout-light/style.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="/images/favicon.png" />
</head>

<body>
    <style>
        .error {
            color: red;
            font-size: 14px;
        }
    </style>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div class="brand-logo" style="text-align: center;">
                                <img src="/images/logo.png" alt="logo">
                            </div>
                            <h4>Xin chào Admin</h4>
                            <h6 class="font-weight-light">Đăng nhập để tiếp tục.</h6>
                            <form id="frm_login" class="pt-3">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" name="user" id="user" placeholder="Username">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg" name="pass" id="pass" placeholder="Password">
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" id="btn_login">Đăng nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <link rel="stylesheet" href="/assets/css/sweetalert.css">
    <script src="/assets/js/jquery.min.js"></script>
    <script src="/assets/js/jquery.validate.min.js"></script>
    <!-- base:js -->
    <!-- endinject -->
    <!-- inject:js -->
    <script src="/assets/js/admin/template.js"></script>
    <script src="/assets/js/admin/settings.js"></script>
    <!-- endinject -->
    <script src="/assets/js/sweetalert.min.js"></script>
    <script>
        $('#frm_login').validate({
            onclick: false,
            rules: {
                user: {
                    required: true,
                },
                pass: {
                    required: true,
                },
            },
            messages: {
                user: {
                    required: "Vui lòng nhập tên tài khoản",
                },
                pass: {
                    required: "Vui lòng nhập mật khẩu",
                },
            },
            submitHandler: function() {
                var formData = new FormData($('#frm_login')[0]);
                $.ajax({
                    url: "/login_admin",
                    type: "POST",
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    data: formData,
                    success: function(data) {
                        if (data.status == 1) {
                            window.location.href = '/admin/';
                        } else {
                            swal({
                                title: "Thất bại",
                                type: "error",
                                text: 'Sai tên tài khoản hoặc mật khẩu'
                            });
                        }
                    }
                })
            }
        });
    </script>
</body>

</html>