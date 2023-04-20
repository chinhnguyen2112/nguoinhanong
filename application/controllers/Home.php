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
        $data['canonical'] = base_url();
        $where['type'] = 0;
        $data['blog'] = $this->Madmin->get_limit($where, 'blogs', 0, 19);
        $data['blog_update'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 ORDER BY updated_at DESC LIMIT 10");
        // list cate 1
        $name_cate_1 = $this->Madmin->query_sql_row("SELECT * FROM category  WHERE id = 1 ");
        $list_cate_1 = $this->Madmin->query_sql("SELECT * FROM blogs WHERE cate_parent = 1 AND type = 0 ORDER BY id DESC LIMIT 5");
        $data['list_cate_1'] = $list_cate_1;
        $data['name_cate_1'] = $name_cate_1;
        // list cate 2
        $name_cate_2 = $this->Madmin->query_sql_row("SELECT * FROM category WHERE id = 2");
        $list_cate_2 = $this->Madmin->query_sql("SELECT * FROM blogs WHERE cate_parent = 2 AND type = 0 ORDER BY id DESC LIMIT 5");
        $data['list_cate_2'] = $list_cate_2;
        $data['name_cate_2'] = $name_cate_2;
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
            $count = $this->Madmin->num_rows_or(['type' => 0], $count_or, 'blogs');
            pagination('/' . $chuyenmuc['alias'], $count, $limit);
            $chuyenmuc_parent = $this->Madmin->get_by(['id' => $chuyenmuc['parent']], 'category');
            $title_page = $chuyenmuc['name'];
            if ($chuyenmuc_parent != null) {
                $title_page = $chuyenmuc_parent['name'] . ' - ' . $chuyenmuc['name'];
            }
            $data['blog'] = $this->Madmin->get_limit_or(['type' => 0], $count_or, 'blogs', $start, $limit);
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
            $data['blog_same'] = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 AND chuyenmuc = {$blog['chuyenmuc']} AND id != {$blog['id']}  ORDER BY updated_at DESC LIMIT 4");
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
            $count = $this->Madmin->query_sql("SELECT blogs.*,category.name as name_cate,category.alias as alias_cate,category.image as img_cate FROM blogs INNER JOIN category ON category.id = blogs.chuyenmuc WHERE blogs.type = 0 AND ( $where )");
            pagination('/' . $tags['alias'], count($count), $limit);
            $data['blog'] = $this->Madmin->query_sql("SELECT * FROM blogs  WHERE blogs.type = 0 AND ( $where ) ORDER BY id DESC LIMIT $start,$limit");
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
        } else {
            redirect('/');
        }
        $data['index'] = 1;
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
    public function import_file()
    {
        $data['content'] = 'get_blog';
        $this->load->view('index', $data);
    }
    public function test()
    {
        $url_post = $this->input->post('url_blog');
        error_reporting(0);
        $headers = [
            'Try: Trying',
            'Content-Type: text/html',
        ];
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL =>  $url_post,
            CURLOPT_USERAGENT => 'XuanThuLab test cURL Request',
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_HTTPHEADER => $headers,
        ));
        $alias = str_replace('https://phunuplus.vn/', '', $url_post);
        $resp = curl_exec($curl);
        $data['data_content'] = $resp;
        $data['alias_url'] = str_replace('/', '', $alias);
        $data['content'] = 'get_content';
        $this->load->view('index', $data);
    }
    public function add_blog()
    {
        $url_cate = $this->input->post('url_cate');
        $url_cate_new = str_replace('https://phunuplus.vn/category/', '', $this->input->post('url_cate'));
        $alias_cate = str_replace('/', '', $url_cate_new);
        $text_cate = $this->input->post('text_cate');
        $url_cate_child = str_replace($url_cate, '', $this->input->post('url_cate_child'));
        $alias_cate_child = str_replace('/', '', $url_cate_child);
        $text_cate_child = $this->input->post('text_cate_child');
        $where_cate = [
            'alias' => $alias_cate,
            'parent' => 0
        ];
        $cate = $this->Madmin->get_by($where_cate, 'category');
        if ($cate != null) {
            $id_cate = $cate['id'];
        } else {
            $data_insert_cate = [
                'name' => $text_cate,
                'alias' => $alias_cate,
                'title' => $text_cate - " Phụ Nữ Plus"
            ];
            $id_cate = $this->Madmin->insert($data_insert_cate, 'category');
        }
        $where_cate_child = [
            'alias' => $alias_cate_child,
            'parent' => $id_cate
        ];
        $cate_child = $this->Madmin->get_by($where_cate_child, 'category');
        if ($cate_child != null) {
            $id_cate_child = $cate_child['id'];
        } else {
            $data_insert_cate_child = [
                'name' => $text_cate_child,
                'alias' => $alias_cate_child,
                'parent' => $id_cate,
                'title' => $text_cate_child - " Phụ Nữ Plus"
            ];
            $id_cate_child = $this->Madmin->insert($data_insert_cate_child, 'category');
        }
        $data['content'] = $this->input->post('content');
        $data['title'] = $this->input->post('h1');
        $data['alias'] = $this->input->post('alias');
        $data['chuyenmuc'] = $id_cate_child;
        $data['meta_title'] = $this->input->post('title');
        $data['meta_des']     = $this->input->post('des');
        $data['updated_at'] = strtotime($this->input->post('date'));
        $data['created_at'] = strtotime($this->input->post('date'));
        $insert_blog = $this->Madmin->insert($data, 'blogs');
        $response = [
            'status' => 1,
        ];
        echo json_encode($response);
    }
}
