
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
            //var animated = results[i].images.fixed_height;
            //var image = results[i].url;
            
            
            var still = results[i].images.fixed_height_still.url;
            var animated = results[i].images.fixed_height.url;
            var state = still;
            // Creating and storing an image tag
            var image = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
            // Setting the Image src attribute to imageUrl
            image.attr("src", still);
            image.attr("alt", "image");
            image.attr("data-animate", animated);
            animalDiv.append(p);
            //images.append(image);
  
            // Prepending the Image to the images div
            $("#images").prepend(image);
        }
    });
}

$(".btn").on("click", function (event) {
    console.log('adding');
    event.preventDefault();
    var newSearch = $(".form-control").val();
    console.log(newSearch);
    gifArray.push(newSearch);
    console.log(gifArray);
    $("#Input").val("");
    displayButtons();
});

function displayButtons() {
    console.log('adding2');
    $("animal-buttons").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        a.attr("id", "animal");
        a.attr("data-search", gifArray[i]);
        a.text(gifArray[i]);
        $("#animal-buttons").append(a);
    }
}

displayButtons();
$(document).on("click", "#animal", displayGifs);
$(document).on("click", ".Giphy", pausePlayGifs);

function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}


