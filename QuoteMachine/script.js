var colors = [" #4dff4d","#ff3333","#ffcc33","#668cff"];
var index = 0;
$(document).ready(function() {
  var datakey = "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V";
  $('#getQuote').click(function() {

    index = (index+1)%4; 
    $.ajax({
      headers: {
        "X-Mashape-Key": datakey,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
      success: function(data) {
        data = JSON.parse(data);
        var content;
        content = "<p> <i class=\"fa fa-quote-left\"></i> &nbsp; &nbsp;" + data.quote + " &nbsp; &nbsp; <i class=\"fa fa-quote-right\"></i> </p>";
        content += "<p class=\"pull-right smaller-font\"> -" + data.author + " </p> ";
        
        $("#theActualQuote").removeClass("text-center").html(content);
        $("body").animate({
      backgroundColor : colors[index]
    });
    $("#getQuote").animate({
      backgroundColor : colors[index]
    });
        
      }     
      ,
      error: function(data) {
        alert("Failed to retrieve data!");
      }
    });     //ajax
    
   // $("body").css("background-color", colors[index]);
    
  });   //onclick

});