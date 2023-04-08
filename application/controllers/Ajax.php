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
        $page = 5 * ($page - 1);
        $blog = $this->Madmin->get_limit('', 'blogs', $page, 5);
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
            if (count($blog) == 5) {
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
}
