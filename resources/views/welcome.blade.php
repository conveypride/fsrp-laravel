<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--
    - primary meta tags
  -->
    <title>FSRP-Weather</title>
    <meta name="title" content="FSRP-Weather">
    <meta name="description" content="FSRP-Weather is a weather app made by Theoportfolio">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!--
    - favicon
  -->
    <link rel="shortcut icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">

    <!--
    - google font link
  -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">


    <!--
    - custom css link
  -->
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">


    <!-- mapbox api -->
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>

    {{-- <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> --}}
    <script src="{{ asset('assets/js/app.js') }}" type="module"></script>
    
    <script src="{{ asset('assets/js/route.js') }}" type="module"></script>
<script src="{{ asset('assets/js/map.js') }}" type="module"></script>

</head>

<body>

    <!--
    - #HEADER
  -->
@if (session('warningmessage'))
<h6 class="alert alert-success" style="text-align:center; background-color: green">
{{ session('warningmessage') }}
</h6>
    
@endif
    <header class="header">
        <div class="container">

            <a href="#" class="logo">
                <h1>FSRP &star;</h1>
            </a>

            <div class="feedback">
                <button class="feedbackicon" id="feedbackBtn">
                    <span class="m-icon icon iconm"> Feedback</span>
                </button>
            </div>

            <div class="search-view" data-search-view>

                <div class="search-wrapper">
                    <input type="search" name="search" placeholder="Search city..." autocomplete="off"
                        class="search-field" data-search-field>

                    <span class="m-icon leading-icon">search</span>

                    <button class="icon-btn leading-icon has-state" aria-label="close search" data-search-toggler>
                        <span class="m-icon">arrow_back</span>
                    </button>
                </div>

                <div class="search-result" data-search-result></div>

            </div>



            <div class="header-actions">

                <button class="icon-btn has-state" aria-label="open search" data-search-toggler>
                    <span class="m-icon icon">search</span>
                </button>

                <a href="#/current-location" class="btn-primary has-state" data-current-location-btn>
                    <span class="m-icon" style="color: black;">my_location</span>

                    <span class="span">Current Location</span>
                </a>

            </div>

        </div>
    </header>

    <div id="language"></div>


    <main>
        <article class="container" data-container>

            <div class="content-left">
                <!--
          - #CURRENT WEATHER
        -->

                <section class="section current-weather" aria-label="current weather" data-current-weather></section>

                <!--
         7 days big and medium devices - #FORECAST
        -->

                <section class="section forecast largedevices" aria-labelledby="forecast-label" data-7-day-forecast>
                </section>

            </div>





            <div class="content-right">
                <!--
          - #HIGHLIGHTS
        -->

                <section class="section highlights" aria-labelledby="highlights-label" data-highlights></section>


                <!-- 7 days for small evices-->

                <section class="section day7s-forecast smalldevices" aria-labelledby="forecast-labelsm"
                    data-day7s-forecast>
                </section>

                <!-- WEATHER INSIGHTS -->
                <section class="section weatherinsight" aria-labelledby="weatherinsight-label" data-weatherinsight>
                    <h2 class="title-2" id="weatherinsight-label">{{$advisefarmer}}</h2>

                    <div class="weatherinsight-list">


                        <div class="card card-sm weatherinsight-card one">

                            <h3 class="title-3">{{$weathersumaryday}}</h3>

                            <div class="wrapper">
                                <p class="title-2" id="daysummary"> </p>
                            </div>
                        </div>



                        <div class="card card-sm weatherinsight-card">

                            <h3 class="title-2"> {{$weathersumarynight}} </h3>

                            <div class="wrapper">
                                <p class="title-2" id="nightsummary"> </p>
                            </div>

                        </div>
                        <!--  1 -->


                        <div class="card card-sm weatherinsight-card">

                            <h3 class="title-3"> {{$irrigation}} </h3>

                            <div class="wrapper">
                                <span class="m-icon">water</span>

                                <p class="title-2" id="water"></p>
                            </div>

                        </div>

                        <div class="card card-sm weatherinsight-card">

                            <h3 class="title-3">{{ $pest }} </h3>

                            <div class="wrapper">
                                <span class="m-icon">warning</span>

                                <p class="title-2" id="pestdisease"></p>
                            </div>
                        </div>

                        <!-- 2 -->
                        <!-- <div>  -->
                        <!-- <h2  class="title-2" id="weatherinsight2-label"> .</h2> -->
                        <div class="card card-sm weatherinsight-card">

                            <h3 class="title-3"> {{$weed}} </h3>

                            <div class="wrapper">
                                <span class="m-icon">grass</span>

                                <p class="title-2" id="weedrate"></p>
                            </div>

                        </div>

                        <div class="card card-sm weatherinsight-card">

                            <h3 class="title-3"> {{$farming}} </h3>

                            <div class="wrapper">
                                <span class="m-icon">spare</span>

                                <p class="title-2" id="farmact"></p>
                            </div>
                        </div>
                        <!-- </div> -->



                    </div>


                </section>


                <!--
          - #HOURLY FORECAST
        -->

                <section class="section hourly-forecast" aria-label="hourly forecast" data-hourly-forecast></section>




                <!--temp  map -->
                <section class="section days14-forecast" aria-label="forecast-label14" data-days14-forecast></section>
                <fieldset class="select-fieldset">
                    <label>Select Date</label>
                    <select id="lightPreset" name="lightPreset">
                        <!-- Options will be dynamically populated here using JavaScript -->

                    </select>
                </fieldset>
                <!-- Add temp  map container -->
                <div id="map"></div>






                <!--precipitation  map -->
                <section class="section prep-map" aria-label="forecast-label15" data-prep-map>
                    <h2 class="title-2 days14" id="forecast-label14">{{$currentprecipMap}}</h2>
                </section>
                <!-- Add precipitation  map container -->
                <div id="prepmap"></div>
                <br>
                <br>
                <div class="container card card-sm">
                    <h2 class="title-2">
                      {{$subscribe}}
                    </h2>
                  
                    <form id="weatherForm" action="{{route('weatherwarning')}}" method="post">
                        @csrf
                        <div class="form-group">
                            <label for="contact"> {{$number}}  </label>
                            <input type="number" class="form-control" id="contact" name="contact"
                                style="background-color: white;">
                        </div>
                        <div class="form-group">
                            <label for="email">{{$email}}  </label>
                            <input type="email" class="form-control" id="email" name="email"
                                style="background-color: white;">
                        </div>
                        <div class="form-group">
                            <label for="options"> {{$warning}} </label>
                            <select class="form-control" id="options" name="options" required>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>


                        <button type="submit" class="btn btn-success">Submit</button>
                    </form>
                    <br>
                    <hr>
                    <h2 class="title-2" style="text-align: center;">{{ $orclick}} </h2>
                    <div class="form-group" style="display: flex;justify-content: center;">

                        <button class="btn-lg" id="group"
                            style="text-align: center; align-self: center; align-content: center;"> <a
                                href="https://https://wa.me/242435901" target="_blank" rel="noopener noreferrer"
                                style="text-decoration: none; text-align: center; align-self: center;"> Join Our
                                WhatsApp Channel</a></button>
                        <!-- <input type="text" class="form-control" id="contact" name="contact"  style="background-color: white;"> -->
                    </div>
                </div>



                <!-- feedback model  -->
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="close">&times;</span>
                            <h2>Send Your Feedback Here</h2>
                        </div>
                        <hr>
                        <div class="modal-body ">
                            <div class="containerr ">
                                <div id="w-input-container" onclick="setFocus()">
                                    <div class="w-input-text-group">
                                        <div id="w-input-text" contenteditable></div>
                                        <div class="w-placeholder">
                                            Type a message
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <h3 style="text-align: center;"> OR </h3>
                                <div id="recorder"
                                    style="justify-content: right;
                                       align-self: right; float: right;"><img
                                        id="record" src="{{asset('assets/record.svg') }}" />
                                        
                                        <img
                                        id="arrow" src="https://bassets.github.io/arrow.svg" />
                                    
                                    </div>
                            </div>


                        </div>
                        <div class="modal-footer d-flex" style="display:flex; justify-content: center;">
                            <button id="submitbttn"  class="btn btn-green" style=" justify-content: center; min-width: 200px;">
                                Submit
                            </button>

                        </div>
                    </div>
                </div>

                <!-- date forecast model  -->
                <div id="dateforecastModal" class="modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="close">&times;</span>
                            <!-- <h2> Forecast For <span id="datee"></span></h2> -->
                        </div>
                        <hr>
                        <div class="modal-body ">
                            <div class="forecastcontainer ">

                            </div>


                        </div>
                    </div>
                </div>

                <footer class="footer">
                    <p class="body-3">
                        Copyright 2023 FSRP. All Rights Reserved.
                    </p>
                </footer>
            </div>

            <div class="loading" data-loading></div>


        </article>
    </main>





    <!--
    - #404 SECTION
  -->

    <section class="error-content" data-error-content>

        <h2 class="heading">404</h2>

        <p class="body-1">Page not found!</p>

        <a href="#/weather?lat=4.86992&lon=-11.0616" class="btn-primary">
            <span class="span">Go Home</span>
        </a>

    </section>

    <script>
        function toggleNav() {
            var navElement = document.querySelector("nav");
            navElement.classList.toggle("show");
        }
    </script>


</body>

</html>
