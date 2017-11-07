<?php
$hotels = file_get_contents("http://hotelsearch/index.php");
$images = file_get_contents("http://imageserver/index.php");
$image = file_get_contents("http://screenshot/?q=http://www.londontown.com");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>test</title>
    </head>
    <body>
        <h1>I am the webserver</h1>
        <h2><?=$hotels?></h2>
        <h2><?=$images?></h2>
        <h2>Image from NodeJS Server Headless Chrome</h2>
        <img src="data:image/png;base64,<?=base64_encode($image);?>"/>
    </body>
</html>
