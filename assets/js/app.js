var gifArray = [];
console.log("here");
function displayGifs() {
    var animal = $(this).data("search");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function (response) {
        var results = response.data;
        console.log(results);
        var i = 0;
        for (i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var animated = results[i].images.fixed_height_url;
            var still = results[i].images.fixed_height_url;

            var image = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
            image.attr("src", still)
            image.addClass("Giphy");
            image.attr("data-state", still);
            image.attr("data-inimate", animated);
            gifDiv.append(image);
            $("#gifArea").prepend(gifDiv);  
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


