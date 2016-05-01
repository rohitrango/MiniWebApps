function assignIcon(response) {
    var code = Math.floor(response.weather[0].id/100);
    var icondata = "";
    switch(code) {
        case 2: icondata = '<i class="wi wi-day-thunderstorm w"></i>'; break;
        case 3: icondata = '<i class="wi wi-day-rain-mix w"></i>'; break;
        case 5: icondata = '<i class="wi wi-day-rain w"></i>'; break;
        case 6: icondata = '<i class="wi wi-day-snow-wind w"></i>'; break;
        case 7: icondata = '<i class="wi wi-day-fog w"></i>'; break;
        case 8: icondata = '<i class="wi wi-day-cloudy w"></i>'; break;
        case 9: icondata = '<i class="wi wi-cloud w"></i>'; break;
    }
    //clear weather
    if(response.weather[0].id==800)
        icondata = '<i class="wi wi-day-sunny w"></i>';

    $("#weatherIcon").empty().html(icondata);
}
function toCel(temp){
    return Math.round(temp-273.15);
}

$(document).ready(function() {
    $("#weatherIcon").html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>');
    var lon, lat, link;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            link = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=edd60c9005e178405ed4d069141a8603";
            check = true;

            $.ajax({
                url: link,
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    format: "json"
                },
                success: function(response) {
                    $("#location").html(response.name+", "+response.sys.country);
                    $("#weatherMain").text(response.weather[0].main);
                    assignIcon(response);
                    $("#temp").html('<i class="wi wi-thermometer"></i> &nbsp;&nbsp;&nbsp;' + toCel(response.main.temp) + ' <sup>o</sup>C<br /> <i class="wi wi-humidity"></i> &nbsp;&nbsp;&nbsp;' + response.main.humidity + "%");
                },
                error: function(response) {
                    alert("Some error has occured! Please enter valid entries or refresh the page!");
                }
            });
        });

    } else {
        alert("Error!");
    }
});