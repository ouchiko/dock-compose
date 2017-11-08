<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Webcoding</title>
    </head>
    <body>
        <div id="app">
            <div class="item">
                <h2>{{$hotels}}</h2>
                <h2>{{$images}}</h2>
            </div>
            <img src="data:image/png;base64,{{$image->content}}"/>"
        </div>
    </body>
</html>
