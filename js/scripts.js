// js for Local Weather App

// example api call: http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f5cd5c74d448b458ed7756827f3d593b

// by default, weather units are in Kelvin

// wait for the DOM to be ready before running the script
$(function(){

  var api_prefix = 'http://api.openweathermap.org/data/2.5/weather?q=';
  // double check with original link to ensure url is formatted properly
  var api_key = '&appid=f5cd5c74d448b458ed7756827f3d593b';

  var $el_body = $('body'); // a reference to the body element
  var $el_location = $('#location'); // a reference to the location element
  var $el_temp = $('#temperature'); // a reference to the temperature element
  var $el_condition = $('#condition'); // a reference to the condition element
  var $el_converter = $('#units'); // a reference to the F to C converter
  var $el_icon = $('#icon'); // a reference to the weather icon

  // need to determine the user's current location
  // use this api:  http://jsfiddle.net/zK5FN/2/
  $.get("http://ipinfo.io", function (response) {
    // not accessible outside this scope because its an ajax call (asynchronous)
    var location = response.city + ", " + response.region;
    var country = response.country;
    $el_location.text(location + ' (' + country + ')');

    var weatherReq = api_prefix + location + api_key;

    $.getJSON(weatherReq, function (data) {
      var temp = data.main.temp; // temperature
      var w_condition = data.weather[0].main; // weather condition

      var f_temp = kel_to_far(temp); // temp in far
      var c_temp = kel_to_cel(temp); // temp in cel

      $el_temp.text(f_temp + '\xB0');
      $el_converter.text('F');
      $el_condition.text(w_condition);
      set_icon(w_condition); // sets icon based on the outside weather condition

      var toggle = false;
      $('#units').click(function() {
          if(toggle===false) { // need to change to C
              $el_temp.text(c_temp + '\xB0');
              $el_converter.text('C');
              toggle = true;
          }
          else { // need to change to F
              $el_temp.text(f_temp + '\xB0');
              $el_converter.text('F');
              toggle = false;
          }
      });

    });

  }, "jsonp");

  function kel_to_far(kel) {
    return Math.round(((kel * 1.8) - 459.67));
  }

  function kel_to_cel(kel) {
    return Math.round((kel - 273.15));
  }

  // changes the icon based on the outside weather condition
  function set_icon(condition) {
    switch(condition) {
      case 'Thunderstorm':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-thunderstorm');
        $el_body.attr('class', 'thunderstorm');
        break;
      case 'Drizzle':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-sprinkle');
        $el_body.attr('class', 'drizzle');
        break;
      case 'Rain':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-rain');
        $el_body.attr('class', 'rain');
        break;
      case 'Snow':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-snow');
        $el_body.attr('class', 'snow');
        break;
      case 'Atmosphere':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-fog');
        $el_body.attr('class', 'atmosphere');
        break;
      case 'Clear':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-day-sunny');
        $el_body.attr('class', 'clear');
        break;
      case 'Clouds':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-cloudy');
        $el_body.attr('class', 'clouds');
        break;
      case 'Extreme':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-storm-warning');
        $el_body.attr('class', 'extreme');
        break;
      case 'Additional':
        $el_icon.removeAttr('class');
        $el_icon.attr('class', 'wi wi-windy');
        $el_body.attr('class', 'additional');
        break;
      default:
        $el_icon.removeAttr('class');
        $el_body.attr('class', 'other');
    }
  }

});
