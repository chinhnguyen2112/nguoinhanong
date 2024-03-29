<?php

use function PHPSTORM_META\type;

defined('BASEPATH') or exit('No direct script access allowed');
class Home extends CI_Controller {
    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     *	- or -
     * 		http://example.com/index.php/welcome/index
     *	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/userguide3/general/urls.html
     */
    public function __construct() {
        parent::__construct();
        $this->load->model(['Madmin']);
        $this->load->database();
        $this->load->helper(['url', 'func_helper']);
        $this->load->library(['pagination311', 'session']);
    }
    public function home() {
        $time = time();
        $data['canonical'] = base_url();
        $where = " type = 0 AND time_post <= ".time();
        $data['blog'] = $this->Madmin->get_limit($where, 'blogs', 0, 19);
        $data['blog_update'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 AND time_post <= $time ORDER BY updated_at DESC LIMIT 10");
        // list cate 1
        $name_cate_1 = $this->Madmin->query_sql_row("SELECT * FROM category  WHERE id = 1 ");
        $list_cate_1 = $this->Madmin->query_sql("SELECT * FROM blogs WHERE ( chuyenmuc = 1 OR cate_parent = 1 ) AND type = 0 AND time_post <= $time ORDER BY id DESC LIMIT 5");
        $data['list_cate_1'] = $list_cate_1;
        $data['name_cate_1'] = $name_cate_1;
        // list cate 2
        $name_cate_2 = $this->Madmin->query_sql_row("SELECT * FROM category WHERE id = 2");
        $list_cate_2 = $this->Madmin->query_sql("SELECT * FROM blogs WHERE ( chuyenmuc = 2 OR cate_parent = 2 ) AND type = 0 AND time_post <= $time ORDER BY id DESC LIMIT 5");
        $data['list_cate_2'] = $list_cate_2;
        $data['name_cate_2'] = $name_cate_2;
        // list cate 3
        $name_cate_3 = $this->Madmin->query_sql_row("SELECT * FROM category  WHERE id = 12 ");
        $list_cate_3 = $this->Madmin->query_sql("SELECT * FROM blogs WHERE ( chuyenmuc = 12 OR cate_parent = 12 ) AND type = 0 AND time_post <= $time ORDER BY id DESC LIMIT 5");
        $data['list_cate_3'] = $list_cate_3;
        $data['name_cate_3'] = $name_cate_3;
        $data['meta_title'] = 'Cổng thông tin xu hướng phát triển Nông Nghiệp 4.0';
        $data['meta_des'] = '10.11.2023 chúng tôi tiến hành triển khai dự án Người Nhà Nông hỗ trợ cho bà con nông dân nhiều kiến thức thực tế trong chiến lược phát triển nông nghiệp 4.0.';
        $data['content'] = 'home';
        $data['list_js'] = [
            'slick.min.js',
            'home.js',
        ];
        $data['list_css'] = [
            'slick.css',
            'slick-theme.css',
            'home.css'
        ];
        $data['index'] = 1;
        $this->load->view('index', $data);
    }
    public function chuyenmuc($alias) {
        $time = time();
        $alias = trim($alias);
        $data['canonical'] = base_url().$alias.'/';
        $time_now = time();
        $chuyenmuc = $this->Madmin->get_by(['alias' => $alias], 'category');
        if($chuyenmuc == null) {
            $page = $this->Madmin->query_sql_row("SELECT * FROM blogs WHERE type = 1 AND alias = '$alias' ");
            if($page == null) {
                $blog = $this->Madmin->query_sql_row("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE type = 0 AND time_post<= $time AND blogs.alias = '$alias' ");
                if($blog == null) {
                    $tags = $this->Madmin->get_by(['alias' => $alias], 'tags');
                }
            }
        }
        if(isset($chuyenmuc) && $chuyenmuc != null) { //chuyenmuc
            if($_SERVER['REQUEST_URI'] != '/'.$alias.'/') {
                redirect('/'.$alias.'/', 'location', 301);
            }
            $page = $this->uri->segment(3);
            if($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 18;
            $start = $limit * ($page - 1);
            $count_or['chuyenmuc'] = $chuyenmuc['id'];
            if($chuyenmuc['parent'] == 0) {
                $count_or['cate_parent'] = $chuyenmuc['id'];
            }
            $count = $this->Madmin->num_rows_or("type = 0 AND time_post <= $time_now", $count_or, 'blogs');
            pagination('/'.$chuyenmuc['alias'], $count, $limit);
            $chuyenmuc_parent = $this->Madmin->get_by(['id' => $chuyenmuc['parent']], 'category');
            $title_page = $chuyenmuc['name'];
            if($chuyenmuc_parent != null) {
                $title_page = $chuyenmuc_parent['name'].' - '.$chuyenmuc['name'];
            }
            $data['blog'] = $this->Madmin->get_limit_or("type = 0 AND time_post <= $time_now", $count_or, 'blogs', $start, $limit);
            $data['title_page'] = $title_page;
            $data['blog_new'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE  type = 0 AND time_post <= $time  ORDER BY id DESC LIMIT 5");
            $data['chuyenmuc'] = $chuyenmuc['id'];
            $data['meta_title'] = $chuyenmuc['meta_title'];
            $data['meta_des'] = $chuyenmuc['meta_des'];
            $data['meta_key'] = $chuyenmuc['name'];
            $data['content'] = 'chuyenmuc_blog';
            $data['list_js'] = [
                'chuyenmuc_blog.js',
            ];
            $data['list_css'] = [
                'chuyenmuc_blog.css',
            ];
            $data['index'] = 1;
        } else if(isset($blog) && $blog != null) { // blog
            if($_SERVER['REQUEST_URI'] != '/'.$alias.'/') {
                redirect('/'.$alias.'/', 'location', 301);
            }
            if(!admin() && $blog['time_post'] > $time_now) {
                redirect('/');
            }
            $download = $this->Madmin->get_by(['id_blog' => $blog['id']], 'download');
            if($download != null) {
                $data['download'] = $download;
            }
            $data['blog_same'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 AND time_post <= $time_now AND chuyenmuc = {$blog['chuyenmuc']} AND id != {$blog['id']}  ORDER BY updated_at DESC LIMIT 4");
            $data['blog_new'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE  id != {$blog['id']}  AND type = 0 AND time_post <= $time  ORDER BY id DESC LIMIT 5");
            $cate = $this->Madmin->query_sql_row("SELECT name,alias,parent FROM category  WHERE id = {$blog['chuyenmuc']} ");
            $data['cate'] = $cate;
            if($cate != null && $cate['parent'] > 0) {
                $cate_parent = $this->Madmin->query_sql_row("SELECT name,alias,parent FROM category  WHERE id = {$cate['parent']} ");
                $data['cate_parent'] = $cate_parent;
                if($cate != null && $cate_parent['parent'] > 0) {
                    $cate_parent_2 = $this->Madmin->query_sql_row("SELECT name,alias,parent  FROM category  WHERE id = {$cate_parent['parent']} ");
                    $data['cate_parent_2'] = $cate_parent_2;
                }
            }
            $data['blog'] = $blog;
            $data['content'] = 'detail_blog';
            $data['list_js'] = [
                'jquery.toc.min.js',
                'detail_blog.js',
            ];
            $data['list_css'] = [
                'detail_blog.css',
            ];
            $data['meta_title'] = $blog['meta_title'];
            $data['meta_des'] = $blog['meta_des'];
            $data['meta_key'] = $blog['meta_key'];
            $data['meta_img'] = $blog['image'];
            if($blog['time_post'] <= $time_now) {
                $data['index'] = 1;
            }
        } else if(isset($tags) && $tags != null) {
            return $this->tag($tags);
        } else if(isset($page) && $page != null) {
            return $this->page($page);
        } else {
            set_status_header(301);
            return $this->load->view('errors/html/error_404');
        }
        return $this->load->view('index', $data);
    }
    public function tag($tags) {
        $time = time();
        if($_SERVER['REQUEST_URI'] != '/'.$tags['alias'].'/') {
            redirect('/'.$tags['alias'].'/', 'location', 301);
        }
        $id_parent = $tags['id'];
        $list_tag = $this->Madmin->query_sql("SELECT *  FROM tags  WHERE parent = $id_parent ");
        $where = '  FIND_IN_SET('.$id_parent.',tag) ';
        foreach($list_tag as $key => $val) {
            $where .= ' OR FIND_IN_SET('.$val['id'].',tag) ';
        }
        $data['blog'] = $this->Madmin->query_sql("SELECT * FROM blogs  WHERE time_post <= $time  AND type = 0 AND ( $where ) ORDER BY id DESC LIMIT 0,18");
        $data['blog_new'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE  type = 0 AND time_post <= $time  ORDER BY id DESC LIMIT 5");
        $data['title_page'] = $tags['name'];
        $data['meta_title'] = $tags['meta_title'];
        $data['meta_des'] = $tags['meta_des'];
        $data['meta_key'] = $tags['meta_key'];
        $data['content_tag'] = $tags['content'];
        $data['tag_id'] = $tags['id'];
        $data['canonical'] = base_url().$tags['alias'].'/';
        $data['content'] = 'tag';
        $data['list_js'] = [
            'tag.js',
        ];
        $data['list_css'] = [
            'css_tag.css',
        ];
        $data['index'] = 1;
        return $this->load->view('index', $data);
    }
    public function detail_blog($alias) {
        $blog = $this->Madmin->query_sql_row("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE blogs.alias = '$alias' ");
        if($blog != null) {
            $data['blog_same'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE chuyenmuc = {$blog['chuyenmuc']} AND id != {$blog['id']}  ORDER BY updated_at DESC LIMIT 3");
            $cate = $this->Madmin->query_sql_row("SELECT *  FROM category  WHERE id = {$blog['chuyenmuc']} ");
            $title_page = $cate['name'];
            if($cate['parent'] > 0) {
                $cate_parent = $this->Madmin->query_sql_row("SELECT *  FROM category  WHERE id = {$cate['parent']} ");
                $title_page = $cate_parent['name'].' - '.$cate['name'];
            }
            $data['breadcrumb'] = $title_page;
            $data['blog'] = $blog;
            $data['content'] = 'detail_blog';
            $data['list_js'] = [
                'detail_blog.js',
            ];
            $data['list_css'] = [
                'detail_blog.css',
            ];
            $data['meta_title'] = $blog['meta_title'];
            $data['meta_des'] = $blog['meta_des'];
            $data['meta_key'] = $blog['meta_key'];
            $data['meta_img'] = $blog['image'];
            $this->load->view('index', $data);
        } else {
            redirect('/', 'location', 301);
        }
    }
    public function bxh() {
        if($_SERVER['REQUEST_URI'] != '/bang-xep-hang/') {
            redirect('/bang-xep-hang/');
        }
        $chuyenmuc = $this->Madmin->get_by(['alias' => 'bang-xep-hang'], 'category');
        $data['title_page'] = "Bảng xếp hạng";
        $data['meta_title'] = $chuyenmuc['meta_title'];
        $data['meta_des'] = $chuyenmuc['meta_des'];
        $data['meta_key'] = "Bảng xếp hạng";
        $data['canonical'] = base_url().'bang-xep-hang/';
        $data['content'] = 'blog/bxh';
        $data['list_js'] = [
            'bxh.js',
        ];
        $data['list_css'] = [
            'bxh.css',
        ];
        $data['index'] = 1;
        $this->load->view('index', $data);
    }
    public function test() {
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_URL, 'https://phunuplus.vn/status-giam-can/');
        // $result = curl_exec($ch);
        // curl_close($ch);

        // $obj = json_decode($result);
        // var_dump($obj);
        function file_get_contents_curl($url) {

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);

            $data = curl_exec($ch);
            curl_close($ch);

            return $data;
        }
        $getcv = 'https://phunuplus.vn/status-giam-can/';
        $html = file_get_contents($getcv);

        // var_dump($html);
        $data['data_content'] = $html;
        $data['content'] = 'get_content';
        $this->load->view('index', $data);
    }

    function page($page) {
        if($_SERVER['REQUEST_URI'] != '/'.$page['alias'].'/') {
            redirect('/'.$page['alias'].'/', 'location', 301);
        }
        $data['page'] = $page;
        $data['content'] = 'page';
        $data['list_css'] = [
            'page.css'
        ];
        $data['meta_title'] = $page['meta_title'];
        $data['meta_des'] = $page['meta_des'];
        $data['meta_key'] = $page['meta_key'];
        $data['meta_img'] = $page['image'];
        $data['index'] = 1;
        $this->load->view('index', $data);
    }
    // public function replace_blog()
    // {
    //     $blog =  $this->Madmin->get_list('', 'blogs');
    //     $search = [' white-space-collapse: preserve;', ' background-color: transparent;', 'font-size: 11pt;', 'font-family: Arial, sans-serif;', 'color: rgb(0, 0, 0);', 'font-variant-position: normal;', 'text-align: justify;', 'font-variant-position: normal;', 'font-variant-alternates: normal;', 'font-variant-east-asian: normal;', 'font-variant-numeric: normal;', 'vertical-align: baseline;', ' font-family: Arial;', 'white-space: pre-wrap;', 'line-height:1.7999999999999998;', 'margin-top:10pt;', 'margin-bottom:10pt;', 'text-align:center;', 'line-height: 1.8;', 'margin-top: 10pt;', 'margin-bottom: 10pt;', 'text-align:center', 'list-style-type: disc;', 'white-space: pre;', 'style=""'];
    //     $replace   = '';
    //     foreach ($blog as $val) {
    //         $result = str_replace($search, '', $val);
    //         $update = $this->Madmin->update(['id' => $val['id']], $result, 'blogs');
    //     }
    // }
}