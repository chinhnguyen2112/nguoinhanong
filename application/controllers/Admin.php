<?php
error_reporting(1);
defined('BASEPATH') or exit('No direct script access allowed');
class Admin extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Madmin');
        $this->load->database();
        $this->load->helper(['url', 'func_helper', 'images']);
        $this->load->library(['session', 'pagination311', 'upload']);
    }
    public function admin()
    {
        if (admin()) {
            $data = [];
            // $data['content'] = '/admin/main';
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function logout()
    {
        unset($_SESSION['admin']);
        header('Location: /');
    }
    public function view_login()
    {
        if (!admin()) {
            $this->load->view('admin/login');
        } else {
            redirect('/admin/');
        }
    }
    public function login_admin()
    {
        $user = $this->input->post('user');
        $pass = md5($this->input->post('pass'));
        $check_admin = $this->Madmin->get_by(['username' => $user, 'password' => $pass], 'admin');
        if ($check_admin != null) {
            $this->session->set_userdata('admin', $check_admin);
            $response = [
                'status' => 1,
                'msg' => 'Đăng nhập thành công'
            ];
        } else {
            $response = [
                'status' => 2,
                'msg' => 'Thất bại'
            ];
        }
        echo json_encode($response);
    }
    public function view_add_blog()
    {
        if (admin()) {

            $data['content'] = '/admin/add_blog';
            $data['time_post'] = time();
            if ($this->input->get('id') > 0) {
                $data['id'] = $id = $this->input->get('id');
                $blog = $this->Madmin->get_by(['id' => $id], 'blogs');
                if ($blog != null) {
                    $data['time_post'] = $blog['created_at'];
                    if ($blog['time_post'] > 0) {
                        $data['time_post'] = $blog['time_post'];
                    }
                    $data['blog'] = $blog;
                } else {
                    redirect('/admin/add_blog');
                }
            }
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function ajax_add_blog()
    {
        $id = $this->input->post('id');
        $time = time();
        $data['title'] = $this->input->post('title');
        $data['time_post'] = $time_post = strtotime($this->input->post('time_post'));
        $data['alias'] = $alias = $this->input->post('alias');
        $data['chuyenmuc'] = $chuyenmuc = $this->input->post('category');
        $sapo = $this->input->post('sapo');
        $content = $this->input->post('content');
        $content = preg_replace('/(<[^>]+) id=".*?"/i', '$1', $content);
        $sapo = preg_replace('/(<[^>]+) id=".*?"/i', '$1', $sapo);
        $data['content'] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $content);
        $data['sapo'] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $sapo);
        $data['meta_title'] = $this->input->post('meta_title');
        $data['meta_key'] = $this->input->post('meta_key');
        $data['meta_des'] = $this->input->post('meta_des');
        $data['created_at'] = $time_post;
        $data['updated_at'] = $time;
        $cate = chuyen_muc(['id' => $chuyenmuc]);
        if ($this->input->post('type') == 1) {
            $data['type'] = 1;
        }
        if ($cate[0]['parent'] > 0) {
            $data['cate_parent'] = $cate[0]['parent'];
        }
        if ($this->input->post('tag') != '') {
            $data['tag'] = implode(',', $this->input->post('tag'));
        }
        if (!is_dir('upload/blog/')) {
            mkdir('upload/blog/', 0755, TRUE);
        }
        if ($id > 0) {
            $blog = $this->Madmin->get_by(['id' => $id], 'blogs');
            $where_check = [
                'alias' => $alias,
                'id !=' => $id
            ];
        } else {
            $where_check = [
                'alias' => $alias,
            ];
        }
        $check = $this->Madmin->get_by($where_check, 'blogs');
        if ($check != null) {
            $response = [
                'status' => 2,
                'msg' => 'đã tồn tại'
            ];
        } else {
            if ($id > 0 && $blog['author_id'] > 0) {
                $data['author_id'] = $blog['author_id'];
            }
            if (isset($_FILES['image']) && $_FILES['image']['name'] !== "") {
                $filedata = $_FILES['image']['tmp_name'];
                $thumb_path = 'upload/blog/' . $alias . '.jpg';
                $imguser = $alias . '.jpg';
                $config['file_name'] = $imguser;
                $config['upload_path'] = 'upload/blog';
                $config['allowed_types'] = 'jpg|png';
                $this->load->library('upload', $config);
                $this->upload->initialize($config);
                if (!$this->upload->do_upload('image')) {
                    $error = array('error' => $this->upload->display_errors());
                } else {
                    $imageThumb = new Image($filedata);
                    $imageThumb->resize(650, 375, 'crop');
                    $imageThumb->save($alias, $config['upload_path'], 'jpg');
                    $data['image'] = $thumb_path;
                }
            }
            if ($id > 0) {
                $insert_blog = 0;
                $update_blog = $this->Madmin->update(['id' => $id], $data, 'blogs');
                if ($update_blog) {
                    $insert_blog = $id;
                }
            } else {
                $insert_blog = $this->Madmin->insert($data, 'blogs');
            }
            if ($insert_blog > 0) {
                if ($data['type'] == 1) {
                    $this->sitemap_page();
                } else {
                    $this->sitemap();
                }
                $response = [
                    'status' => 1,
                    'msg' => 'Thành công'
                ];
            } else {
                $response = [
                    'status' => 0,
                    'msg' => 'Thất bại'
                ];
            }
        }
        echo json_encode($response);
    }
    public function view_add_chuyenmuc()
    {
        if (admin()) {
            $data['content'] = '/admin/add_chuyenmuc';
            if ($this->input->get('id') > 0) {
                $data['id'] = $id = $this->input->get('id');
                $chuyenmuc = $this->Madmin->get_by(['id' => $id], 'category');
                if ($chuyenmuc != null) {
                    $data['chuyenmuc'] = $chuyenmuc;
                } else {
                    redirect('/admin/add_chuyenmuc');
                }
            }
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function ajax_add_chuyenmuc()
    {
        $id = $this->input->post('id');
        $data['name'] = $this->input->post('name');
        $data['alias'] = $alias = $this->input->post('alias');
        $cate = $this->input->post('category');
        $data['meta_title'] = $this->input->post('meta_title');
        $data['meta_des'] = $this->input->post('meta_des');
        $data['level'] = 0;
        $data['parent'] = 0;
        if ($cate > 0) {
            $data['parent'] = $cate;
            $this->Madmin->update(['id' => $cate], ['level' => 1], 'category');
        }
        if ($id > 0) {
            $insert_chuyenmuc = 0;
            $update_chuyenmuc = $this->Madmin->update(['id' => $id], $data, 'category');
            if ($update_chuyenmuc) {
                $insert_chuyenmuc = $id;
            }
        } else {
            $insert_chuyenmuc = $this->Madmin->insert($data, 'category');
        }
        if ($insert_chuyenmuc > 0) {
            $this->sitemap_cate();
            $response = [
                'status' => 1,
                'msg' => 'Thành công'
            ];
        } else {
            $response = [
                'status' => 0,
                'msg' => 'Thất bại'
            ];
        }
        echo json_encode($response);
    }
    public function list_chuyenmuc()
    {
        if (admin()) {
            $page = $this->uri->segment(3);
            if ($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 20;
            $start = $limit * ($page - 1);
            $list = $this->Madmin->get_list('', 'category');
            pagination('/admin/list_chuyenmuc', count($list), $limit, 3);
            $data['list'] = $this->Madmin->get_limit('', 'category', $start, $limit);
            $data['content'] = '/admin/list_chuyenmuc';
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function list_blog()
    {
        if (admin()) {
            $url_search = str_replace(base_url(), '', $this->input->get('url_search'));
            $url_search = str_replace('/', '', $url_search);
            $key_search = $this->input->get('key_search');
            $cate = $this->input->get('cate');
            $child_cate = $this->input->get('child_cate');
            $x = 0;
            $where = ' id > 0  AND type = 0';
            if ($cate > 0) {
                $where .= " AND ( chuyenmuc=  $cate  OR cate_parent = $cate ) ";
            }
            if ($child_cate > 0) {
                $where .= " AND ( chuyenmuc =  $child_cate ) ";
            }
            if ($key_search != '') {
                $where .= " AND  title LIKE '%$key_search%' ";
            }
            if ($url_search != '') {
                $where .= " AND alias LIKE '%$url_search%' ";
            }
            $page = $this->uri->segment(3);
            if ($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 20;
            $start = $limit * ($page - 1);
            $list = $this->Madmin->get_list($where, 'blogs');
            pagination('/admin/list_blog', count($list), $limit, 3);
            $data['list'] = $this->Madmin->get_limit($where, 'blogs', $start, $limit);
            $data['count_list'] = count($list);
            $data['content'] = '/admin/list_blog';
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function ajax_child_cate()
    {
        $cate_id = $this->input->post('id');
        if ($cate_id > 0) {
            $where = [
                'parent' => $cate_id
            ];
            $error = $this->Madmin->get_list($where, 'category');
        } else {
            $error = [];
        }

        echo json_encode($error);
    }
    public function add_page()
    {
        if (admin()) {
            $data['content'] = '/admin/add_page';
            $data['created_at'] = time();
            if ($this->input->get('id') > 0) {
                $data['id'] = $id = $this->input->get('id');
                $blog = $this->Madmin->get_by(['id' => $id], 'blogs');
                if ($blog != null) {
                    $data['blog'] = $blog;
                    $data['created_at'] = $blog['created_at'];
                } else {
                    redirect('/admin/add_page');
                }
            }
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function list_page()
    {
        if (admin()) {
            $list = $this->Madmin->get_list(['type' => 1], 'blogs');
            $data['list'] = $list;
            $data['content'] = '/admin/list_page';
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function view_add_tag()
    {
        if (admin()) {
            $data['content'] = '/admin/add_tag';
            if ($this->input->get('id') > 0) {
                $data['id'] = $id = $this->input->get('id');
                $tag = $this->Madmin->get_by(['id' => $id], 'tags');
                if ($tag != null) {
                    $data['tag'] = $tag;
                } else {
                    redirect('/admin/add_tag');
                }
            }
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function ajax_add_tag()
    {
        if (admin()) {
            $id = $this->input->post('id');
            $data['name'] = $this->input->post('name');
            $data['alias'] = $alias = $this->input->post('alias');
            $data['meta_key'] = $this->input->post('meta_key');
            $data['meta_title'] = $this->input->post('meta_title');
            $data['meta_des'] = $this->input->post('meta_des');
            $content = $this->input->post('content');
            $content = preg_replace('/(<[^>]+) id=".*?"/i', '$1', $content);
            $data['content'] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $content);
            $cate = $this->input->post('category');
            $data['parent'] = 0;
            $where_check = ['alias' => $alias];
            if ($id > 0) {
                $where_check['id !='] = $id;
            }
            $check = $this->Madmin->get_by($where_check, 'tags');
            if ($check != null) {
                $response = [
                    'status' => 2,
                    'msg' => 'đã tồn tại'
                ];
            } else {
                if ($cate > 0) {
                    $data['parent'] = $cate;
                }
                if ($id > 0) {
                    $insert_tag = 0;
                    $update_tag = $this->Madmin->update(['id' => $id], $data, 'tags');
                    if ($update_tag) {
                        $insert_tag = $id;
                    }
                } else {
                    $data['created_at'] = time();
                    $insert_tag = $this->Madmin->insert($data, 'tags');
                }
                if ($insert_tag > 0) {
                    $this->sitemap_tag();
                    $response = [
                        'status' => 1,
                        'msg' => 'Thành công'
                    ];
                } else {
                    $response = [
                        'status' => 0,
                        'msg' => 'Thất bại'
                    ];
                }
            }
        } else {
            $response = [
                'status' => 0,
                'msg' => 'Không đủ quyền'
            ];
        }
        echo json_encode($response);
    }
    public function list_tag()
    {
        if (admin()) {
            $keyword = $this->input->get('keyword');
            $parent = $this->input->get('parent');
            $where['id >'] = 0;
            if ($keyword != '') {
                $where['name LIKE '] = '%' . $keyword . '%';
            }
            if ($parent > 0) {
            } else {
                $where['parent'] = 0;
            }
            $list = $this->Madmin->get_list($where, 'tags');
            $data['list'] = $list;
            $data['content'] = '/admin/list_tag';
            $this->load->view('admin/index', $data);
            var_dump($where);
        } else {
            redirect('/admin/login/');
        }
    }
    public function add_down()
    {
        if (admin()) {
            $data['content'] = '/admin/add_download';
            if ($this->input->get('id') > 0) {
                $data['id'] = $id = $this->input->get('id');
                $pass = $this->Madmin->query_sql_row("SELECT id_blog,password,alias  FROM download JOIN blogs ON download.id_blog = blogs.id  WHERE download.id = $id ");
                if ($pass != null) {
                    $pass['alias'] = $pass['alias'] . '/';
                    if ($pass['id_blog'] == 1) {
                        $pass['alias'] = '';
                    }
                    $data['pass'] = $pass;
                } else {
                    redirect('/admin/add_down');
                }
            }
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }
    public function ajax_down()
    {
        if (admin()) {
            $id = $this->input->post('id');
            $alias = trim($this->input->post('url_blog'));
            if ($alias == base_url()) {
                $blog = [
                    'id' => '1'
                ];
            } else {
                $alias = str_replace(base_url(), '', $alias);
                $alias = str_replace('/', '', $alias);
                $blog = $this->Madmin->get_by(['alias' => $alias], 'blogs');
            }
            if ($blog != null) {
                $data['id_blog'] = $blog['id'];
                $data['password'] = trim($this->input->post('password'));

                $where_check['id_blog'] = $blog['id'];
                if ($id > 0) {
                    $where_check['id !='] = $id;
                }
                $check = $this->Madmin->get_by($where_check, 'download');
                if ($check != null) {
                    $response = [
                        'status' => 2,
                        'msg' => 'Bài viết đã tồn tại'
                    ];
                } else {
                    if ($id > 0) {
                        $insert = 0;
                        $update = $this->Madmin->update(['id' => $id], $data, 'download');
                        if ($update) {
                            $insert = $id;
                        }
                    } else {
                        $insert = $this->Madmin->insert($data, 'download');
                    }
                    if ($insert > 0) {
                        $response = [
                            'status' => 1,
                            'msg' => 'Thành công'
                        ];
                    } else {
                        $response = [
                            'status' => 0,
                            'msg' => 'Thất bại'
                        ];
                    }
                }
            } else {
                $response = [
                    'status' => 2,
                    'msg' => 'Bài viết không tồn tại. Vui lòng kiểm tra lại đường dẫn'
                ];
            }
        } else {
            $response = [
                'status' => 0,
                'msg' => 'Hết phiên đăng nhập !'
            ];
        }
        echo json_encode($response);
    }
    public function list_down()
    {
        if (admin()) {
            $list = $this->Madmin->query_sql("SELECT download.id,id_blog,password,alias  FROM download JOIN blogs ON download.id_blog = blogs.id  ");
            $data['list'] = $list;
            $data['content'] = '/admin/list_download';
            $this->load->view('admin/index', $data);
        } else {
            redirect('/admin/login/');
        }
    }

    public function sitemap()
    {
        $time = time();
        $sql = "SELECT id,alias,updated_at FROM blogs WHERE type = 0 AND  time_post <= $time ORDER BY id ASC";
        $blog = $this->Madmin->query_sql($sql);
        $count = count($blog);
        $page = ceil($count / 200);
        for ($i = 1; $i <= $page; $i++) {
            $check_page = ($i - 1) * 200;
            $sql_limit = "SELECT id,alias,updated_at FROM blogs WHERE type = 0 AND  time_post <= $time ORDER BY id ASC LIMIT {$check_page}, 200";
            $blog_limit = $this->Madmin->query_sql($sql_limit);
            $doc = new DOMDocument("1.0", "utf-8");
            $doc->formatOutput = true;
            $r = $doc->createElement("urlset");
            $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
            $doc->appendChild($r);
            foreach ($blog_limit as $val) {
                $url = $doc->createElement("url");
                $name = $doc->createElement("loc");
                $name->appendChild($doc->createTextNode(base_url() . $val['alias'] . '/'));
                $url->appendChild($name);
                $changefreq = $doc->createElement("changefreq");
                $changefreq->appendChild($doc->createTextNode('daily'));
                $url->appendChild($changefreq);
                $lastmod = $doc->createElement("lastmod");
                $lastmod->appendChild($doc->createTextNode(date('Y-m-d', $val['updated_at']) . 'T07:24:06+00:00'));
                $url->appendChild($lastmod);
                $priority = $doc->createElement("priority");
                $priority->appendChild($doc->createTextNode('0.8'));
                $url->appendChild($priority);
                $r->appendChild($url);
            }
            $name = ($i == 1) ? '' : $i - 1;
            $name_file = 'blog' . $name . ".xml";
            $date = date('Y-m-d', time());
            if ($i >= 2) {
                $sql_check = "SELECT * FROM sitemap  WHERE name = '$name_file' ";
                $row = $this->Madmin->query_sql_num($sql_check);
                if ($row > 0) {
                    $where_update = [
                        'name' => $name_file
                    ];
                    $data_update = [
                        'time' => $date
                    ];
                    $update = $this->Madmin->update($where_update, $data_update, 'sitemap');
                } else {
                    $data_insert = [
                        'name' => $name_file,
                        'time' => $date
                    ];
                    $insert = $this->Madmin->insert($data_insert, 'sitemap');
                    //\/\/\/\/\/\/\/\\
                    $sql = "SELECT * FROM sitemap";
                    $sitemap = $this->Madmin->query_sql($sql);
                    $doc = new DOMDocument("1.0", "utf-8");
                    $doc->formatOutput = true;
                    $doc->appendChild($doc->createProcessingInstruction('xml-stylesheet', 'type="text/xsl" href="https://nguoinhanong.vn    .vn/assets/css/css_sitemap.xsl"'));
                    $r = $doc->createElement("sitemapindex");
                    $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
                    $doc->appendChild($r);
                    foreach ($sitemap as $key => $val) {
                        $url = $doc->createElement("sitemap");
                        $name = $doc->createElement("loc");
                        $name->appendChild($doc->createTextNode(base_url() . $val['name']));
                        $url->appendChild($name);
                        $lastmod = $doc->createElement("lastmod");
                        $lastmod->appendChild($doc->createTextNode($val['time'] . 'T17:28:31+07:00'));
                        $url->appendChild($lastmod);
                        $r->appendChild($url);
                    }
                    $doc->save("sitemap.xml");
                }
            }
            $doc->save($name_file);
        }
    }
    public function sitemap_tag()
    {
        $sql = "SELECT id,alias,created_at FROM tags ORDER BY id ASC";
        $tags = $this->Madmin->query_sql($sql);
        $count = count($tags);
        $page = ceil($count / 200);
        for ($i = 1; $i <= $page; $i++) {
            $check_page = ($i - 1) * 200;
            $sql_limit = "SELECT id,alias,created_at FROM tags ORDER BY id ASC LIMIT {$check_page}, 200";
            $tag_limit = $this->Madmin->query_sql($sql_limit);
            $doc = new DOMDocument("1.0", "utf-8");
            $doc->formatOutput = true;
            $r = $doc->createElement("urlset");
            $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
            $doc->appendChild($r);
            foreach ($tag_limit as $val) {
                $url = $doc->createElement("url");
                $name = $doc->createElement("loc");
                $name->appendChild($doc->createTextNode(base_url() . $val['alias'] . '/'));
                $url->appendChild($name);
                $changefreq = $doc->createElement("changefreq");
                $changefreq->appendChild($doc->createTextNode('daily'));
                $url->appendChild($changefreq);
                $lastmod = $doc->createElement("lastmod");
                $lastmod->appendChild($doc->createTextNode(date('Y-m-d', $val['created_at']) . 'T07:24:06+00:00'));
                $url->appendChild($lastmod);
                $priority = $doc->createElement("priority");
                $priority->appendChild($doc->createTextNode('0.9'));
                $url->appendChild($priority);
                $r->appendChild($url);
            }
            $name = ($i == 1) ? '' : $i - 1;
            $name_file = 'tags' . $name . ".xml";
            $doc->save($name_file);
            $date = date('Y-m-d', time());
            $sql_check = "SELECT * FROM sitemap  WHERE name = '$name_file' ";
            $row = $this->Madmin->query_sql_num($sql_check);
            if ($row == 0) {
                $data_insert = [
                    'name' => $name_file,
                    'time' => $date
                ];
                $insert = $this->Madmin->insert($data_insert, 'sitemap');
                //\/\/\/\/\/\/\/\\
                $sql = "SELECT * FROM sitemap";
                $sitemap = $this->Madmin->query_sql($sql);
                $doc = new DOMDocument("1.0", "utf-8");
                $doc->formatOutput = true;
                $doc->appendChild($doc->createProcessingInstruction('xml-stylesheet', 'type="text/xsl" href="https://nguoinhanong.vn    .vn/assets/css/css_sitemap.xsl"'));
                $r = $doc->createElement("sitemapindex");
                $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
                $doc->appendChild($r);
                foreach ($sitemap as $key => $val) {
                    $url = $doc->createElement("sitemap");
                    $name = $doc->createElement("loc");
                    $name->appendChild($doc->createTextNode(base_url() . $val['name']));
                    $url->appendChild($name);
                    $lastmod = $doc->createElement("lastmod");
                    $lastmod->appendChild($doc->createTextNode($val['time'] . 'T17:28:31+07:00'));
                    $url->appendChild($lastmod);
                    $r->appendChild($url);
                }
                $doc->save("sitemap.xml");
            }
        }
    }
    public function sitemap_cate()
    {
        $sql = "SELECT id,alias,created_at FROM category ORDER BY id ASC";
        $cate = $this->Madmin->query_sql($sql);
        $count = count($cate);
        $page = ceil($count / 200);
        for ($i = 1; $i <= $page; $i++) {
            $check_page = ($i - 1) * 200;
            $sql_limit = "SELECT id,alias,created_at FROM category ORDER BY id ASC LIMIT {$check_page}, 200";
            $tag_limit = $this->Madmin->query_sql($sql_limit);
            $doc = new DOMDocument("1.0", "utf-8");
            $doc->formatOutput = true;
            $r = $doc->createElement("urlset");
            $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
            $doc->appendChild($r);
            foreach ($tag_limit as $val) {
                $url = $doc->createElement("url");
                $name = $doc->createElement("loc");
                $name->appendChild($doc->createTextNode(base_url() . $val['alias'] . '/'));
                $url->appendChild($name);
                $changefreq = $doc->createElement("changefreq");
                $changefreq->appendChild($doc->createTextNode('daily'));
                $url->appendChild($changefreq);
                $lastmod = $doc->createElement("lastmod");
                $lastmod->appendChild($doc->createTextNode(date('Y-m-d', $val['created_at']) . 'T07:24:06+00:00'));
                $url->appendChild($lastmod);
                $priority = $doc->createElement("priority");
                $priority->appendChild($doc->createTextNode('0.9'));
                $url->appendChild($priority);
                $r->appendChild($url);
            }
            $name = ($i == 1) ? '' : $i - 1;
            $name_file = 'categories' . $name . ".xml";
            $doc->save($name_file);
            $date = date('Y-m-d', time());
            $sql_check = "SELECT * FROM sitemap  WHERE name = '$name_file' ";
            $row = $this->Madmin->query_sql_num($sql_check);
            if ($row == 0) {
                $data_insert = [
                    'name' => $name_file,
                    'time' => $date
                ];
                $insert = $this->Madmin->insert($data_insert, 'sitemap');
                //\/\/\/\/\/\/\/\\
                $sql = "SELECT * FROM sitemap";
                $sitemap = $this->Madmin->query_sql($sql);
                $doc = new DOMDocument("1.0", "utf-8");
                $doc->formatOutput = true;
                $doc->appendChild($doc->createProcessingInstruction('xml-stylesheet', 'type="text/xsl" href="https://nguoinhanong.vn    .vn/assets/css/css_sitemap.xsl"'));
                $r = $doc->createElement("sitemapindex");
                $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
                $doc->appendChild($r);
                foreach ($sitemap as $key => $val) {
                    $url = $doc->createElement("sitemap");
                    $name = $doc->createElement("loc");
                    $name->appendChild($doc->createTextNode(base_url() . $val['name']));
                    $url->appendChild($name);
                    $lastmod = $doc->createElement("lastmod");
                    $lastmod->appendChild($doc->createTextNode($val['time'] . 'T17:28:31+07:00'));
                    $url->appendChild($lastmod);
                    $r->appendChild($url);
                }
                $doc->save("sitemap.xml");
            }
        }
    }
    public function sitemap_page()
    {
        $page = $this->Madmin->query_sql("SELECT id,alias,created_at FROM blogs WHERE type = 1 ORDER by id");
        $doc = new DOMDocument("1.0", "utf-8");
        $doc->formatOutput = true;
        $r = $doc->createElement("urlset");
        $r->setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
        $doc->appendChild($r);
        //sitemap trang chủ
        $url = $doc->createElement("url");
        $name = $doc->createElement("loc");
        $name->appendChild($doc->createTextNode(base_url()));
        $url->appendChild($name);
        $lastmod = $doc->createElement("lastmod");
        $lastmod->appendChild($doc->createTextNode('2023-03-02'));
        $url->appendChild($lastmod);
        $changefreq = $doc->createElement("changefreq");
        $changefreq->appendChild($doc->createTextNode('daily'));
        $url->appendChild($changefreq);
        $priority = $doc->createElement("priority");
        $priority->appendChild($doc->createTextNode('1'));
        $url->appendChild($priority);
        $r->appendChild($url);
        foreach ($page as $val) {
            $url = $doc->createElement("url");
            $name = $doc->createElement("loc");
            $name->appendChild($doc->createTextNode(base_url() . $val['alias'] . '/'));
            $url->appendChild($name);
            $lastmod = $doc->createElement("lastmod");
            $lastmod->appendChild($doc->createTextNode(date('Y-m-d', $val['created_at'])));
            $url->appendChild($lastmod);
            $changefreq = $doc->createElement("changefreq");
            $changefreq->appendChild($doc->createTextNode('daily'));
            $url->appendChild($changefreq);
            $priority = $doc->createElement("priority");
            $priority->appendChild($doc->createTextNode('0.9'));
            $url->appendChild($priority);
            $r->appendChild($url);
        }
        $name_file = "page.xml";
        $doc->save($name_file);
    }
}