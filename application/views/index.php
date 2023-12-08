<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <?php if (isset($index) && $index == 1) { ?>
    <meta name="robots" content="index,follow">
  <?php } else { ?>
    <meta name="robots" content="noindex,nofollow">
  <?php } ?>
  <title><?= isset($meta_title) ? $meta_title : 'Người nhà nông' ?></title>
  <meta content="<?= isset($meta_des) ? $meta_des : 'Người nhà nông' ?>" name="description">
  <meta content="<?= isset($meta_title) ? $meta_title : 'Người nhà nông' ?>" name="msvalidate.01">
  <meta name="keywords" content="<?= isset($meta_key) ? $meta_key : 'Người nhà nông' ?>">
  <link rel="canonical" href="<?= (isset($canonical)) ? $canonical : "" ?>">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?= (isset($canonical)) ? $canonical : "" ?>">
  <meta property="og:title" content="<?= isset($meta_title) ? $meta_title : 'Người nhà nông' ?>">
  <meta property="og:site_name" content="Người Nhà Nông">
  <meta property="og:description" content="<?= isset($meta_des) ? $meta_des : 'Người nhà nông' ?>">
  <meta property="og:image:secure_url" content="<?= base_url() ?><?= (isset($meta_img) ? $meta_img : 'images/logo.png') ?>">
  <meta property="og:image" content="<?= base_url() ?><?= (isset($meta_img) ? $meta_img : 'images/logo.png') ?>">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:description" content="<?= isset($meta_des) ? $meta_des : 'Người nhà nông' ?>">
  <meta name="twitter:title" content="<?= isset($meta_title) ? $meta_title : 'Người nhà nông' ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link rel="shortcut icon" href="<?= base_url() ?>images/favicon.png">
  <link data-n-head="ssr" rel="icon" type="image/x-icon" href="<?= base_url() ?>images/favicon.png">
  <link rel="stylesheet" href="/assets/css/font.css">
  <link rel="stylesheet" href="/assets/css/reset.css">
  <link rel="stylesheet" href="/assets/css/header.css">
  <link rel="stylesheet" href="/assets/css/footer.css">
  <script src="/assets/js/jquery.min.js"></script>

  <?php if (isset($list_css)) {
    foreach ($list_css as $css) { ?>
      <link rel="stylesheet" href="/assets/css/<?= $css ?>">
  <?php  }
  } ?>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LRH6DE6XT1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-LRH6DE6XT1');
  </script>
  <!-- Meta Pixel Code -->
  <script>
    ! function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '327353239770086');
    fbq('track', 'PageView');
  </script>
  <noscript><img style="display:none" src="https://www.facebook.com/tr?id=327353239770086&ev=PageView&noscript=1"></noscript>
  <!-- End Meta Pixel Code -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Người Nhà Nông",
      "alternateName": "Người Nhà Nông",
      "url": "https://nguoinhanong.vn/",
      "logo": "https://nguoinhanong.vn/images/logo.png",
      "sameAs": [
        "https://nguoinhanong.vn/",
        "https://twitter.com/nguoinhanongvn",
        "https://www.youtube.com/@nguoinhanongvn",
        "https://www.pinterest.com/nguoinhanongvn/",
        "https://soundcloud.com/nguoinhanongvn85",
        "https://nguoinhanongvn.tumblr.com/"
      ]
    }
  </script>

</head>

<body>
  <?php
  $this->load->view("includes/header");


  if (isset($content)) {
    $this->load->view($content);
  }

  $this->load->view("includes/footer");

  if (isset($list_js)) {
    foreach ($list_js as $js) { ?>
      <script src="/assets/js/<?= $js ?>"></script>
  <?php  }
  } ?>
  <script src="/assets/js/header.js"></script>
</body>

</html>