//state - static vs. animated on click 
//button click passes text to api (create varaible for "this")
//limit to 10 gifs
//button are an array -- on click take input text and push to array and append a new button

var playerArray = [];

$("#add").on("click", function (event) {
    event.preventDefault();
    var playerAdd = $("#player-input").val();
    playerArray.push(playerAdd);
    var createButton = $("<button>").text(playerAdd).addClass("btn btn-primary").attr("data-player", playerAdd);
    $(".buttonDiv").append(createButton);
    $("h4").remove();
    $("#starters").remove();
    $("#player-input").val('');
    console.log(playerArray);
});
$('body').on('click', '.tr', function () {
    var playerAdd = $(".tr").attr("data-value");
    var playerValue = $(this).attr("data-value")
    
    playerArray.push(playerValue);
    var createButton = $("<button>").text(playerValue).addClass("btn btn-primary").attr("data-player", playerValue);
    $(".buttonDiv").append(createButton);
    $("h4").remove();
    $("#starters").remove();
    $("#player-input").val('');
    console.log(playerArray);
});


$("#starters").on("click", function () {
    firstTeam = ["Hugo Lloris", "Kieran Trippier", "Danny Rose", "Toby Alderweireld", "Jan Vertonghen", "Victor Wanyama", "Heung-Min Son", "Lucas Moura", "Dele Alli", "Moussa Sissoko", "Christian Eriksen"]
    playerArray.push(firstTeam);
    console.log(playerArray);
    for (i = 0; i < firstTeam.length; i++) {
        createButton = $("<button>").text(firstTeam[i]).addClass("btn btn-primary").attr("data-player", firstTeam[i]);
        $(".buttonDiv").append(createButton);
        $("h4").remove();
        $(this).remove();
    }

});


$('body').on('click', '.btn-primary', function () {
    var players = $(this).attr("data-player");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + players + " Tottenham" + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                console.log(rating);

                var p = $("<p>").text("Rating: " + rating);

                var playerImage = $("<img>");
                playerImage.attr("src", results[i].images.fixed_height_still.url).attr("data-state", "still").attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("class", "gif img-fluid");

                gifDiv.prepend(p);
                gifDiv.prepend(playerImage);

                $("#gifReturn").prepend(gifDiv);
            }
        });
});

$('body').on('click', '.gif', function () {
    var state = $(this).attr("data-state");
    console.log(state)
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
});

