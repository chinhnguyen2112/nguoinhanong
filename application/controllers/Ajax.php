<?php
error_reporting(1);
defined('BASEPATH') or exit('No direct script access allowed');
class Ajax extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Madmin');
        $this->load->database();
        $this->load->helper(['url', 'func_helper', 'images']);
        $this->load->library(['session', 'pagination311', 'upload']);
    }
    public function load_more()
    {
        $page = $this->input->post('page');
        $page = 20 * ($page - 1);
        $where = [
            'type' => 0,
            'time_post <=' => time()
        ];
        $blog = $this->Madmin->get_limit($where, 'blogs', $page, 20);
        $html = '';
        if ($blog != null) {
            foreach ($blog as $val) {
                $cate = chuyen_muc(['id' => $val['chuyenmuc']]);
                $html .= '<div class="this_content_right">
                            <a class="linl_all_detail link_fl" title="' . $val['title'] . '" href="/' . $val['alias'] . '/">
                                <img src="/' . $val['image'] . '" alt="' . $val['title'] . '">
                                <div class="box_content_blog">
                                    <div class="fl_date">
                                        <p class="date_post">' . $cate[0]['name'] . '</p>
                                        <p class="date_post">' . date('d-m-Y', $val['created_at']) . '</p>
                                    </div>
                                    <p class="title_blog">' . $val['title'] . '</p>
                                    <span class="des_post">' . $val['sapo'] . '</span>
                                </div>
                            </a>
                        </div>
                        <div class="line_home"></div>';
            }
            $next = 0;
            if (count($blog) == 20) {
                $next = 1;
            }
            $response = [
                'status' => 1,
                'html' => $html,
                'next' => $next
            ];
        } else {
            $response = [
                'status' => 0,
            ];
        }
        echo json_encode($response);
    }
    public function search()
    {
        $time = time();
        $list_news = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 AND time_post <= $time ORDER BY id DESC LIMIT 5");
        $data['list_news'] = $list_news;
        $key_search = $this->input->get('search');
        $data['key_search'] = $key_search;
        if ($key_search != '') {
            $page = $this->uri->segment(2);
            if ($page < 1 || $page == '') {
                $page = 1;
            }
            $limit = 10;
            $start = $limit * ($page - 1);
            $count = $this->Madmin->query_sql("SELECT * FROM blogs WHERE type = 0 AND time_post <= $time AND title LIKE '%$key_search%'");
            pagination('/search', count($count), $limit);
            $result = $this->Madmin->query_sql("SELECT category.name as cate_name,category.alias as cate_alias, blogs.* FROM blogs INNER JOIN category ON blogs.chuyenmuc = category.id WHERE  blogs.type = 0 AND time_post <= $time AND  blogs.title LIKE '%$key_search%' ORDER BY blogs.id DESC LIMIT $start,$limit ");
            $data['result'] = $result;
            $data['meta_title'] = 'Tất cả kết quả tìm kiếm';
            $data['content'] = 'result_search';
            $data['list_css'] = ['result_search.css'];
            $this->load->view('index', $data);
        } else {
            redirect('/');
        }
        // if (isset($_POST['key_search'])) {
        //     $result = $this->Madmin->query_sql("SELECT * FROM blogs WHERE name LIKE '{$_POST['key_search']}%'");
        //     if ($result > 0) {
        //         while($resultt = mysqli_fetch_array($result)) {
        //             echo $resultt['name'];
        //         }
        //     } else {
        //         echo "lêu lêu";
        //     }
        // }
    }
}
