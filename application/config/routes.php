<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Home/home';

//admin
$route['admin'] = 'Admin/admin';
$route['admin/login'] = 'Admin/view_login';
$route['login_admin'] = 'Admin/login_admin';
$route['login_admin'] = 'Admin/login_admin';
$route['add_blog'] = 'Admin/view_add_blog';
$route['ajax_add_blog'] = 'Admin/ajax_add_blog';
$route['list_blog'] = 'Admin/list_blog';
$route['list_blog/(:num)'] = 'Admin/list_blog';
$route['add_chuyenmuc'] = 'Admin/view_add_chuyenmuc';
$route['ajax_add_chuyenmuc'] = 'Admin/ajax_add_chuyenmuc';
$route['list_chuyenmuc'] = 'Admin/list_chuyenmuc';
$route['list_chuyenmuc/(:num)'] = 'Admin/list_chuyenmuc';

$route['add_tag'] = 'Admin/view_add_tag';
$route['ajax_add_tag'] = 'Admin/ajax_add_tag';
$route['list_tag'] = 'Admin/list_tag';
$route['list_tag/(:num)'] = 'Admin/list_tag';


$route['bang-xep-hang'] = 'Home/bxh';

//AJAX
$route['load_more'] = 'Ajax/load_more';

$route['(:any)'] = 'Home/chuyenmuc/$1 ';
$route['(:any)/(:num)'] = 'Home/chuyenmuc/$1 ';
// $route['(:any)/(:any)'] = 'Home/tag/$1/$2 ';
// $route['(:any)/(:any)/(:num)'] = 'Home/tag/$1/$2/$3 ';
