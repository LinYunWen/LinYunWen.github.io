function setFaceImage() {
    var base;
    for (let i=0 ; i<9 ; i++){
        base = Math.floor(Math.random()*3 + 1)*10 + Math.floor(Math.random()*4 + 1);
        // $("img.question")[i].attr("src", "/image/face/" +  base.toString() + ".jpg");
        $("img.question")[i].src = "../week5/image/face/" +  base.toString() + ".jpg";
    }
}

function addImageEvent() {
    for (let i=0 ; i<9 ; i++){
        $("img.question")[i].addEventListener("click", clickFaceImage);
    }
}

function clickFaceImage(event) {
    var image = event.target;
    if (!image.classList.contains("selected")) {
        image.classList.add("selected");
        image.style.borderColor = "rgba(0, 0, 255, 1)";
    } else {
        image.classList.remove("selected");
        image.style.borderColor = "rgba(0, 0, 0, 0)";
    }
}

function getImage(image) {
    let imageNum = [];
    for (let i=0 ; i<image.length ; i++) {
        imageNum.push(getImageNum(image[i].src));
    }
    return imageNum;
}

function getImageNum(src) {
    return parseInt(src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf(".")));
}

function clickFaceSubmit(event) {
    event.preventDefault();
    let select = getImage($("img.selected"));
    console.log("select: ", select);
    /*
    $.ajax({
        data: {
            selectedImages: select
        },
        url: "recognizer.php",
        success: function(data) {
            console.log("success");
            console.log("data: ", data);
        }
    });
    */
    
}

document.getElementById("faceSubmit").addEventListener("click", clickFaceSubmit);

setFaceImage();
addImageEvent();