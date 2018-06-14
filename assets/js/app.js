var gifArray = [];

function displayGifs() {
    var x = $(this).data("search");
    console.log(animal);
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
            //var animated = results[i].images.fixed_height;
            //var image = results[i].url;
            
            
            var imageUrl = results[i].images.fixed_height.url;
            

            // Creating and storing an image tag
            var image = $("<img>");
  
            // Setting the Image src attribute to imageUrl
            image.attr("src", imageUrl);
            image.attr("alt", "image");
  
            // Prepending the Image to the images div
            $("#images").prepend(image);
        }
    });
}

$("#addAnimal").on("click", function (event) {
    event.preventDefault();
    var newSearch = $("#Input").val();
    gifArray.push(newSearch);
    console.log(gifArray);
    $("#Input").val("");
    displayButtons();
});

function displayButtons() {
    $("#data-animal").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        a.attr("id", "animal");
        a.attr("data-search", gifArray[i]);
        a.text(gifArray[i]);
        $("#data-animal").append(a);
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


