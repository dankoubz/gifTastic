// Giphy API

// Notes:
// display buttons
// Ajax Call
// Use giphy API to get images
// hover event listen
// hover over images to play gif
// append previous images

// Global array topics
var topics = ["Rick and Morty", "Final Space", "My Hero Academia", "Bleach",
    "Demon Slayer", "Mob Psycho 100", "One Piece", "Sword Art Online", "One Punch Man",
    "Naruto", "Seven Deadly Sins", "Samurai Champloo", "Blue Exorcist", "Death Note",
    "Fairy Tail", "Full Metal Alchemist"
]

window.onload = function() {

    // function to add user topic to list
    $("#addTopic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#userInput").val().trim();
        console.log(newTopic + "- new topic");
        topics.push(newTopic);

        renderTopics();
    });

    // call function on click with class btn-gif
    $(document).on("click", ".btn-gif", displayGifs);

    console.log(topics);
    renderTopics();
}

// function create buttons
function renderTopics() {
    // clear your div before placing
    $("#topicsBtn").empty();

    // run a loop for topics length + create buttons categories
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button class='btn-gif mr-2 mt-2'>" + topics[i] + "</button>");
        newBtn.attr("data-name", topics[i]); // add attr to target button
        $("#topicsBtn").append(newBtn);
    }
}

function makeDemGifMove() {
    console.log("fired!");
}



function displayGifs() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=sfAS7bDd3vFBfwowtVoJy03Xvd2dgnr6&q=" + gif + "&limit=12&lang=en";

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // clear before creating, no double ups
        $("#displayGifs").empty();


        // Creates a div to hold the movie
        for (var i = 0; i < 12; i++) {

            // asign var names to html
            var gifDisplayDiv = $("<div id='gifContainer' class='border p-2 mb-2 mr-2 position-relative rounded text-center'>");
            var textDiv = $("<div class='gifBar col-12 text-center'>");
            var textDivRow = $("<div class='row mb-2 mt-1 p-2'>");
            var imgDiv = $("<div class='d-flex mt-3 justify-content-center align-items-center' style='height: 332px'>");

            // prepend to relevant divs for html postioning
            $("#displayGifs").prepend(gifDisplayDiv);
            $(gifDisplayDiv).prepend(imgDiv);
            $(gifDisplayDiv).prepend(textDiv);
            $(textDiv).prepend(textDivRow);

            // add image + rating + link to div with AJAX
            $(textDivRow).append("<p class='col-6 pt-1 mx-auto'> Rating: " + response.data[i].rating + "</p>");
            $(textDivRow).append("<a class='col-6 mx-auto' target='_blank' href='" + response.data[i].url + "'><button class='btn-download'>Get Gif</button></a>");
            $(imgDiv).append("<img src='" + response.data[i].images.fixed_width_still.url + "'data-value='" + [i] + "' class='rounded gif d-inline-block text-center' style='height: 332px'>");
        }

        $("img.gif").hover(function makeDemGifMove() {
            var gifValue = $(this).attr("data-value");
            $(this).attr("src", response.data[gifValue].images.fixed_width.url);
        }, function changeBackToStill() {
            var gifValue = $(this).attr("data-value");
            $(this).attr("src", response.data[gifValue].images.fixed_width_still.url);
        });

    })
};