<?php
class Madmin extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }
    public function insert($data, $table)
    {
        $this->db->insert($table, $data);
        return $this->db->insert_id();
    }
    function update($where, $data, $table)
    {
        $this->db->where($where);
        return  $this->db->update($table, $data);
    }
    public function delete($where, $table)
    {
        return $this->db->delete($table, $where);
    }
    public function update_set($where, $var, $val, $tt, $table)
    {
        $this->db->set($var, $var . $tt . $val, FALSE);
        $this->db->where($where);
        return $this->db->update($table);
        //   echo $this->db->last_query();
    }
    public function num_rows($where, $table)
    {
        $this->db->select('*');
        $this->db->where($where);
        return $this->db->get($table)->num_rows();
    }
    public function num_rows_or($where = '', $or = [], $table)
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($or != null) {
            $this->db->group_start();
            $this->db->or_where($or);
            $this->db->group_end();
        }
        return $this->db->get($table)->num_rows();
        // echo $this->db->last_query();
    }
    public function num_rows_candi($where = '', $or = [], $table)
    {
        $this->db->select('candidates.*, category.name as name_cat');
        $this->db->join('category', 'category.id = candidates.cate');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($or != null) {
            $this->db->group_start();
            $this->db->or_where($or);
            $this->db->group_end();
        }
        return $this->db->get($table)->num_rows();
    }
    public function get_by($where, $table)
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        $this->db->order_by('id', 'DESC');
        return $this->db->get($table)->row_array();
        // echo $this->db->last_query();
    }
    public function check_where_or($where, $or = [], $table)
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($or != null) {
            $this->db->group_start();
            $this->db->or_where($or);
            $this->db->group_end();
        }
        return $this->db->get($table)->row_array();
    }
    public function list_where_or($where, $or = [], $table)
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($or != null) {
            $this->db->group_start();
            $this->db->or_where($or);
            $this->db->group_end();
        }
        $this->db->order_by('updated_at', 'DESC');
        return $this->db->get($table)->result_array();
    }
    public function list_uv_or($where, $or = [], $table)
    {
        $this->db->select('candidates.*, category.name as name_cat');
        $this->db->join('category', 'category.id = candidates.cate');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($or != null) {
            $this->db->group_start();
            $this->db->or_where($or);
            $this->db->group_end();
        }
        $this->db->order_by('updated_at', 'DESC');
        return $this->db->get($table)->result_array();
    }
    public function get_list($where, $table)
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        return $this->db->get($table)->result_array();
    }
    public function get_list_desc($where, $table)
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        $this->db->order_by('id', 'DESC');
        return $this->db->get($table)->result_array();
    }
    public function query_sql($sql)
    {
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    public function query_sql_row($sql)
    {
        $query = $this->db->query($sql);
        return $query->row_array();
    }
    public function query_sql_num($sql)
    {
        $query = $this->db->query($sql);
        return $query->num_rows();
    }
    function get_limit($where, $table, $start = '', $limit = '')
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($limit >= 1) {
            $this->db->limit($limit, $start);
        }
        $this->db->order_by('id', 'DESC');
        return $this->db->get($table)->result_array();
        // echo $this->db->last_query();
    }
    function get_limit_or($where, $or = [], $table, $start = '', $limit = '')
    {
        $this->db->select('*');
        if ($where != '') {
            $this->db->where($where);
        }
        if ($or != null) {
            $this->db->group_start();
            $this->db->or_where($or);
            $this->db->group_end();
        }
        if ($limit >= 1) {
            $this->db->limit($limit, $start);
        }
        $this->db->order_by('id', 'DESC');
        return $this->db->get($table)->result_array();
        // echo $this->db->last_query();
    }
}
