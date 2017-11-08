<?php
namespace App\Http\Controllers;

use App\Core\Homepage;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function index(Request $request)
    {
        $homepage = new Homepage();
        $data = $homepage->generateData();

        return response(
            view(
                'homepage',
                array(
                    'hotels'=>$data['hotels'],
                    'images'=>$data['images']
                )
            ),
            200,
            ['Content-Type' => 'text/html']
        );
    }

    public function images(Request $request)
    {
        $imageSource = $request->get("url");

        if (isset($imageSource) && preg_match("/^http:|^https:/", $imageSource)) {

            $homepage = new Homepage();
            $data = $homepage->generateImage($imageSource);

            return response(
                view(
                    'images',
                    array(
                        'source'=>$data['source'],
                        'content'=>$data['content']
                    )
                ),
                200,
                ['Content-Type' => 'text/html']
            );
        } else {
            return response(
                view('no_image')
            );
        }
    }
}
