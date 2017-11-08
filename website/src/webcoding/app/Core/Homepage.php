<?php
namespace App\Core;

class Homepage
{
    public function generateImage($url)
    {
        $image = file_get_contents("http://screenshot/?q=".$url);
        $image = json_decode($image);
        return array(
            'source' => $image->requested,
            'content' => $image->content
        );
    }

    public function generateData()
    {
        $hotels = file_get_contents("http://hotelsearch/index.php");
        $images = file_get_contents("http://imageserver/index.php");
        // $image = file_get_contents("http://screenshot/?q=http://www.bbc.co.uk");
        // $image = json_decode($image);

        return array(
            "hotels"=>$hotels,
            "images"=>$images
        );
    }
}
