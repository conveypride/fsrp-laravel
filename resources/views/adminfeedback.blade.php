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

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
 
    
</head>

<body>
 
 <div class="container my-2 py-2 text-center">
    <h4 class="fw-bold"> All Feedback List</h4>
<div class="table-responsive">
    <table class="table table-striped table-bordered table-hover ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Message</th>
            <th scope="col">Audio</th>
            <th scope="col"> Date </th>
          </tr>
        </thead>
        <tbody>
            @if (!empty($adminfeedbacks))
            @foreach ($adminfeedbacks as $adminfeedback)
         
            <tr>
            <th scope="row"> {{ $adminfeedback->id}}</th>
            <td> {{ $adminfeedback->text ? $adminfeedback->text : 'No message attached'}}</td>

            @if (empty($adminfeedback->audio))
            <td> No Audio Attached   </td>
            @else
            <td> <audio controls>
              <source src=" {{ asset('storage/'.$adminfeedback->audio.' ') }}"> 
            </audio>   </td>
            @endif
          
            <td> {{ $adminfeedback->created_at}}</td>
          </tr>

   @endforeach
            @else
            <tr>
                <th scope="row"> no data yet </th>
                <td>no data yet</td>
                <td> no data yet </td>
                <td> no data yet </td>
              </tr> 
            @endif
       
        </tbody>
      </table>
</div>



 </div>

</body>

</html>
