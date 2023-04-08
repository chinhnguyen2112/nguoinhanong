<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="robots" content="noodp,noindex,nofollow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>404 Page Not Found</title>
	<link rel="stylesheet" href="/assets/css/font.css">
	<style type="text/css">
		/* ::selection {
			background-color: #E13300;
			color: white;
		}

		::-moz-selection {
			background-color: #E13300;
			color: white;
		}

		body {
			background-color: #fff;
			margin: 40px;
			font: 13px/20px normal Helvetica, Arial, sans-serif;
			color: #4F5155;
		}

		a {
			color: #003399;
			background-color: transparent;
			font-weight: normal;
		}

		h1 {
			color: #444;
			background-color: transparent;
			border-bottom: 1px solid #D0D0D0;
			font-size: 19px;
			font-weight: normal;
			margin: 0 0 14px 0;
			padding: 14px 15px 10px 15px;
		}

		code {
			font-family: Consolas, Monaco, Courier New, Courier, monospace;
			font-size: 12px;
			background-color: #f9f9f9;
			border: 1px solid #D0D0D0;
			color: #002166;
			display: block;
			margin: 14px 0 14px 0;
			padding: 12px 10px 12px 10px;
		}

		#container {
			margin: 10px;
			border: 1px solid #D0D0D0;
			box-shadow: 0 0 8px #D0D0D0;
		}

		p {
			margin: 12px 15px 12px 15px;
		} */
		body {
			font-family: helvetica, arial, sans-serif !important;
			height: 100vh;
			margin: unset;
		}

		.body_404 {
			display: flex;
			flex-direction: column;
			height: 100vh;
			justify-content: center;
		}

		.box_text p {
			margin: auto;
			font-size: 24px;
			margin-bottom: 40px;
			text-align: center;
		}

		.btn_404 {
			text-align: center;
		}

		.btn_404 a {
			font-family: helvetica, arial, sans-serif !important;
			color: #fff;
			align-items: center;
			font-size: 18px;
			padding: 13.5px 14px;
			text-decoration: unset;
			background: #2758DD;
			border-radius: 4px;
		}

		.div_img {
			width: 100%;
			text-align: center;
		}

		.div_img img {
			width: 320px;
			margin-top: -80px;
			margin-bottom: 30px;
		}

		@media only screen and (max-width: 520px) {
			.div_img img {
				/* margin: 60px auto 50px; */
			}

			.btn_404 a {
				padding: 10px 25px;
			}
		}
	</style>
</head>

<body>
	<!-- <div id="container">
		<h1><?php echo $heading; ?></h1>
		<?php echo $message; ?>
	</div> -->
	<div class="body_404">
		<div class="div_img">
			<img src="/images/404.svg" alt="404">
		</div>
		<div class="box_text">
			<p>Không tìm thấy đường dẫn này</p>
		</div>
		<div class="btn_404">
			<a href="/">Trở về trang chủ</a>
		</div>
	</div>
</body>

</html>