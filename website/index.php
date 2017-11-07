<?php
$hotels = file_get_contents("http://hotelsearch/index.php");
$images = file_get_contents("http://imageserver/index.php");
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
    </body>
</html>
