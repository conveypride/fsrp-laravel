<?php

namespace App\Http\Controllers;

use App\Models\weatherfeedback;
use App\Models\weatherwarning;
use Carbon\Carbon;
use Illuminate\Http\Request;

class Generalcontroller extends Controller
{
    //
    public function index(request $request)
    {

        $advisefarmer = 'Advisory For Farmers';
        $weathersumaryday = 'Weather Summary (Day)';
        $weathersumarynight = 'Weather Summary (Night)';
        $irrigation = 'Irrigation';
        $pest = 'Pest and Disease';
        $weed = 'Weed Rate';
        $farming = 'Farming Activity';
        $currentprecipMap = 'Current Precipitation Map';

        $subscribe = 'Subscribe To Receive Weather Warning';
        $number = 'Contact Number';
        $email = 'Email';
        $warning = 'Frequency To Receive Warning';
        $orclick = 'OR Click To Join Our WhatsApp Group';

        return view('welcome', ['advisefarmer' => $advisefarmer, 'weathersumaryday' => $weathersumaryday,
        'weathersumarynight' => $weathersumarynight,
        'irrigation' => $irrigation,
        'pest' => $pest,
        'weed' => $weed,
        'farming' => $farming,
        'currentprecipMap' => $currentprecipMap,
        'subscribe' => $subscribe,
        'number' => $number,
        'email' => $email,
        'warning' => $warning,
        'orclick' => $orclick,
    ]);
    }

    public function getparameters(request $request)
    {

        // $currentMonth = Carbon::now()->format('m'); 
        // $currentYear = Carbon::now()->format('Y'); 

        $highlight = 'Todays Highlights';
        $airquality = 'Air Quality Index';
        $sun = 'Sunrise & Sunset';
        $sunrise = 'Sunrise';
        $sunset = 'Sunset';
        $meaning = 'What It Means';
        $humidity = 'Humidity';
        $pressure = 'Pressure';
        $visibility = 'Visibility';
        $feelslike = 'Feels Like';
        
        $todatAt = 'Today at';
        $currenttempMap = 'Current Temperature Map';

       
        $sevendaysForecast = '7 Days Forecast';
        $now = 'Now';

        $data = [
            'now' => $now,
            'highlight' => $highlight,
            'airquality' => $airquality,
            'sun' => $sun,
            'sunrise' => $sunrise,
            'sunset' => $sunset,
            'meaning' => $meaning,
            'humidity' => $humidity,
            'pressure' => $pressure,
            'visibility' => $visibility,
            'feelslike' => $feelslike,
            
           
            'todatAt' => $todatAt,
            'currenttempMap' => $currenttempMap,
          
          
            'sevendaysForecast' => $sevendaysForecast
        ];



        // Return the data as JSON
        return response()->json($data);
    }


    //  weather warning

    public function weatherwarning(request $request)
    {

        $warning = new weatherwarning;
        $warning->contact = $request->contact;
        $warning->email = $request->email;
        $warning->options = $request->options;
        $warning->save();

        return redirect()->back()->with('warningmessage', 'Thank you for subscribing, we will receive timely updates on for the choosen period.');
    }


    public function adminwarning(request $request)
    {

        $warnings = weatherwarning::get();
        return view('adminwarning', compact('warnings'));
    }


    // feedback
    public function adminfeedback(request $request)
    {

        $adminfeedbacks = weatherfeedback::get();
        return view('adminfeedback', compact('adminfeedbacks'));
    }


    public function uploadRecording(Request $request)
    {
        if ($request->hasFile('audioFile')) {
            $audioFile = $request->file('audioFile');
            $fileName = time() . '_' . $audioFile->getClientOriginalName();

            $path = $audioFile->storeAs('audio_recordings', $fileName, 'public');

            // You can save the file path or perform additional processing here

            $feedback = new weatherfeedback();
            $feedback->audio =  $path;
            $feedback->save();


            return response()->json(['message' =>  'Feedback Sent Successfully.']);
        }

        if ($request->input('textMessage')) {
            $textMessage = $request->input('textMessage');

            // You can save the file path or perform additional processing here   
            $feedback = new weatherfeedback();
            $feedback->text =  $textMessage;
            $feedback->save();


            return response()->json(['message' =>  'Feedback Sent Successfully.']);
        }



        return response()->json(['message' => 'No audio file provided'], 400);
    }
}
