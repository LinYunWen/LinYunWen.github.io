
var currentPost = 0;
var cardsSrc = [["https://goo.gl/ojLeJH", "https://goo.gl/1pVLFL", "https://goo.gl/Gwp4XM"], 
                ["https://goo.gl/4ytfNF", "https://goo.gl/jEkAU9", "https://goo.gl/CRtT9Z"],
                [],
                [],
                [],
                []];
function clickPost(event) {

    let parent = event.target;
    while(parent.tagName.toLowerCase() != "div") {
        parent = parent.parentNode;
    }
    removeAllClass();

    parent.classList.add("clicked");
    parent.getElementsByTagName("p")[0].classList.add("clicked");
    displayImg(parent, true);
}

function displayImg(element, tuggle) {
    console.log("element: ", element.getElementsByTagName("img"));
    if (tuggle) {
        element.getElementsByTagName("img")[0].classList.add("display");
    } else {
        element.getElementsByTagName("img")[0].classList.remove("display");
    }
    
}

$(".post").click(clickPost);
console.log("card: ", $("img.card"));
$("img.card").attr("src", "https://yt3.ggpht.com/-UgkcJ6zFXFA/AAAAAAAAAAI/AAAAAAAAAAA/5x2e-ssEaqI/s900-c-k-no-rj-c0xffffff/photo.jpg");
var carImg = document.getElementsByClassName("card");

function goNext() {
    removeAllClass();
    if (currentPost <= 2) {
        document.getElementById("post-" + currentPost).style.display = "none";
        document.getElementById("post-" + (currentPost + 3)).style.display = "flex";
        currentPost++;
        setCardSrc();
        $(".card").addClass("cardin");
    }
    console.log("next current: ", currentPost);
}

function goBack() {
    removeAllClass();
    if (currentPost > 0) {
        document.getElementById("post-" + (currentPost + 2)).style.display = "none";
        document.getElementById("post-" + (currentPost - 1)).style.display = "flex";
        currentPost--;
        
        setCardSrc();
        $(".card").addClass("cardin");
    }
    console.log("back current: ", currentPost);
}

$("#back").click(goBack);
$("#next").click(goNext);
// $("#background").click(removeAllClass);

function removeAllClass() {
    $(".clicked").removeClass("clicked");
    $(".display").removeClass("display");
    $(".card").removeClass("cardin");
}

function setCardSrc() {
    let cards = $("img.card");
    for (let i=0 ; i<3 ; i++) {
        cards[i].src = cardsSrc[currentPost][i];
    }
}