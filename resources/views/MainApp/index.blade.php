<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SI RAPTOR</title>

        <style>
            @keyframes half-fade {
                0% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 1;
                }
            }
        </style>

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    </head>
    <body>

      <div id="app">
        <app>
            <img src="/images/logo-full.png" alt="Logo SIRAPTOR" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-animation:half-fade 1s infinite alternate;-moz-animation:half-fade 1s infinite alternate;animation:half-fade 1s infinite alternate;">
        </app>
      </div>

      <script src="{{ mix('js/app.js') }}"></script>

    </body>
</html>
