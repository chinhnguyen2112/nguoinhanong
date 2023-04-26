<?php

use function PHPSTORM_META\type;

defined('BASEPATH') or exit('No direct script access allowed');
class Home extends CI_Controller
{
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
    public function __construct()
    {
        parent::__construct();
        $this->load->model(['Madmin']);
        $this->load->database();
        $this->load->helper(['url', 'func_helper']);
        $this->load->library(['pagination311', 'session']);
    }
    public function home()
    {
        $time = time();
        $data['canonical'] = base_url();
        $where = " type = 0 AND time_post <= " . time();
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
        $data['meta_title'] = 'Người Nhà Nông: Đồng hành cùng bà con nông dân phát triển';
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
    public function chuyenmuc($alias)
    {
        $alias = trim($alias);
        $data['canonical'] = base_url() . $alias . '/';
        $time_now = time();
        $chuyenmuc = $this->Madmin->get_by(['alias' => $alias], 'category');
        $blog = $this->Madmin->query_sql_row("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE blogs.alias = '$alias' ");
        $tags = $this->Madmin->get_by(['alias' => $alias], 'tags');
        if ($chuyenmuc != null) { //chuyenmuc
            if ($_SERVER['REQUEST_URI'] != '/' . $alias . '/') {
                redirect('/' . $alias . '/');
            }
            $page = $this->uri->segment(3);
            if ($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 18;
            $start = $limit * ($page - 1);
            $count_or['chuyenmuc'] = $chuyenmuc['id'];
            if ($chuyenmuc['parent'] == 0) {
                $count_or['cate_parent'] = $chuyenmuc['id'];
            }
            $count = $this->Madmin->num_rows_or("type = 0 AND time_post <= $time_now", $count_or, 'blogs');
            pagination('/' . $chuyenmuc['alias'], $count, $limit);
            $chuyenmuc_parent = $this->Madmin->get_by(['id' => $chuyenmuc['parent']], 'category');
            $title_page = $chuyenmuc['name'];
            if ($chuyenmuc_parent != null) {
                $title_page = $chuyenmuc_parent['name'] . ' - ' . $chuyenmuc['name'];
            }
            $data['blog'] = $this->Madmin->get_limit_or("type = 0 AND time_post <= $time_now", $count_or, 'blogs', $start, $limit);
            $data['title_page'] = $title_page;
            $data['chuyenmuc'] = $chuyenmuc;
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
        } else if ($blog != null) { // blog
            if ($_SERVER['REQUEST_URI'] != '/' . $alias . '/') {
                redirect('/' . $alias . '/');
            }
            if (!admin() && $blog['time_post'] > $time_now) {
                redirect('/');
            }
            $data['blog_same'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 AND time_post <= $time_now AND chuyenmuc = {$blog['chuyenmuc']} AND id != {$blog['id']}  ORDER BY updated_at DESC LIMIT 4");
            $cate = $this->Madmin->query_sql_row("SELECT *  FROM category  WHERE id = {$blog['chuyenmuc']} ");
            $title_page = $cate['name'];
            if ($cate['parent'] > 0) {
                $cate_parent = $this->Madmin->query_sql_row("SELECT *  FROM category  WHERE id = {$cate['parent']} ");
                $title_page = $cate_parent['name'] . ' - ' . $cate['name'];
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
            if ($blog['time_post'] <= $time_now) {
                $data['index'] = 1;
            }
        } else if ($tags != null) {
            if ($_SERVER['REQUEST_URI'] != '/' . $alias . '/') {
                redirect('/' . $alias . '/');
            }
            $id_parent = $tags['id'];
            $list_tag = $this->Madmin->query_sql("SELECT *  FROM tags  WHERE parent = $id_parent ");
            $where = '  FIND_IN_SET(tag,' . $id_parent . ') ';
            foreach ($list_tag as $key => $val) {
                if ($key == 0) {
                    $where .= ' OR ( FIND_IN_SET(tag,' . $val['id'] . ') ';
                } else if ($key == count($list_tag) - 1) {
                    $where .= ' OR FIND_IN_SET(tag,' . $val['id'] . ')  )';
                } else {
                    $where .= ' OR FIND_IN_SET(tag,' . $val['id'] . ') ';
                }
            }
            $page = $this->uri->segment(3);
            if ($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 18;
            $start = $limit * ($page - 1);
            $count = $this->Madmin->query_sql("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE blogs.type= 0 AND time_post <= $time_now AND ( $where )");
            pagination('/' . $tags['alias'], count($count), $limit);
            $data['blog'] = $this->Madmin->query_sql("SELECT * FROM blogs  WHERE type= 0 AND time_post <= $time_now AND ( $where ) ORDER BY id DESC LIMIT $start,$limit");
            $data['title_page'] = $tags['name'];
            $data['meta_title'] = $tags['meta_title'];
            $data['meta_des'] = $tags['meta_des'];
            $data['meta_key'] = $tags['meta_key'];
            $data['content_tag'] = $tags['content'];
            $data['canonical'] = base_url() . $alias . '/';
            $data['content'] = 'chuyenmuc_blog';
            $data['list_js'] = [
                'chuyenmuc_blog.js',
            ];
            $data['list_css'] = [
                'chuyenmuc_blog.css',
            ];
            $data['index'] = 1;
        } else {
            redirect('/');
        }
        $this->load->view('index', $data);
    }
    public function tag($alias1, $alias2)
    {
        $alias1 = trim($alias1);
        $alias2 = trim($alias2);
        $tags_parent = $this->Madmin->get_by(['alias' => $alias1, 'parent' => 0], 'tags');
        $tags = $this->Madmin->get_by(['alias' => $alias2, 'parent >' => 0], 'tags');
        if ($tags['parent'] == $tags_parent['id']) {
            if ($_SERVER['REQUEST_URI'] != '/' . $alias1 . '/' . $alias2 . '/') {
                redirect('/' . $alias1 . '/' . $alias2 . '/');
            }
            $id_tag = $tags['id'];
            $page = $this->uri->segment(3);
            if ($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 18;
            $start = $limit * ($page - 1);
            $count = $this->Madmin->query_sql("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE FIND_IN_SET($id_tag,tag) ");
            pagination('/' . $tags['alias'], count($count), $limit);
            $data['blog'] = $this->Madmin->query_sql("SELECT * FROM blogs  WHERE FIND_IN_SET($id_tag,tag) ORDER BY id DESC LIMIT $start,$limit");
            $data['title_page'] = $tags['name'];
            $data['meta_title'] = $tags['meta_title'];
            $data['meta_des'] = $tags['meta_des'];
            $data['meta_key'] = $tags['meta_key'];
            $data['content_tag'] = $tags['content'];
            $data['canonical'] = base_url() . $alias1 . '/' . $alias2 . '/';
            $data['content'] = 'chuyenmuc_blog';
            $data['list_js'] = [
                'chuyenmuc_blog.js',
            ];
            $data['list_css'] = [
                'chuyenmuc_blog.css',
            ];
        } else {
            redirect('/');
        }
        $data['index'] = 1;
        $this->load->view('index', $data);
    }
    public function detail_blog($alias)
    {
        $blog = $this->Madmin->query_sql_row("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE blogs.alias = '$alias' ");
        if ($blog != null) {
            $data['blog_same'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE chuyenmuc = {$blog['chuyenmuc']} AND id != {$blog['id']}  ORDER BY updated_at DESC LIMIT 3");
            $cate = $this->Madmin->query_sql_row("SELECT *  FROM category  WHERE id = {$blog['chuyenmuc']} ");
            $title_page = $cate['name'];
            if ($cate['parent'] > 0) {
                $cate_parent = $this->Madmin->query_sql_row("SELECT *  FROM category  WHERE id = {$cate['parent']} ");
                $title_page = $cate_parent['name'] . ' - ' . $cate['name'];
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
            redirect('/');
        }
    }
    public function bxh()
    {
        if ($_SERVER['REQUEST_URI'] != '/bang-xep-hang/') {
            redirect('/bang-xep-hang/');
        }
        $chuyenmuc = $this->Madmin->get_by(['alias' => 'bang-xep-hang'], 'category');
        $data['title_page'] = "Bảng xếp hạng";
        $data['meta_title'] = $chuyenmuc['meta_title'];
        $data['meta_des'] = $chuyenmuc['meta_des'];
        $data['meta_key'] = "Bảng xếp hạng";
        $data['canonical'] = base_url() . 'bang-xep-hang/';
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
    public function test()
    {
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_URL, 'https://phunuplus.vn/status-giam-can/');
        // $result = curl_exec($ch);
        // curl_close($ch);

        // $obj = json_decode($result);
        // var_dump($obj);
        function file_get_contents_curl($url)
        {

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
}
