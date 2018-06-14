
var gifArray = [];

function displayGifs() {
    var x = $(this).data("search");
    console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log("inside");
    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
     }).done(function (response) {
        var results = response.data;
        console.log(results);
        for (i = 0; i < results.length; i++) {
            
            var rating = results[i].rating;
            var animalDiv = $("<div class='col-md-4'>");
            var still = results[i].images.fixed_height_still.url;
            var animated = results[i].images.fixed_height.url;
            var image = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
            // Setting the Image src attribute to imageUrl
            image.attr("src", still);
            image.attr("data-state", "still");
            image.attr("data-still", still);
            image.attr("alt", "image");
            image.attr("data-animate", animated);
            image.addClass("Giphy");
            animalDiv.append(p);
            //images.append(image);
  
            // Prepending the Image to the images div
            $("#images").prepend(image);
        }
    });
}

$(".btn").on("click", function (event) {
    event.preventDefault();
    var newSearch = $(".form-control").val().trim();
    gifArray.push(newSearch);
    $("#Input").val("");
    displayButtons();
});

function displayButtons() {
    $("animal-buttons").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        a.attr("id", "animal");
        a.addClass(".Giphy");
        a.attr("data-search", gifArray[i]);
        a.text(gifArray[i]);
        $("#animal-buttons").append(a);
        a.attr("data-state", "still");
    }
}

displayButtons();
$(document).on("click", "#animal", displayGifs);
$(document).on("click", ".Giphy", pausePlayGifs);

function pausePlayGifs() {
    
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
    
        //this is supposed to animate gifs that are still
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        //and still gifs that are animated.
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}


