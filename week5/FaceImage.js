function setFaceImage() {
    var base;
    for (let i=0 ; i<9 ; i++){
        base = Math.floor(Math.random()*3 + 1)*10 + Math.floor(Math.random()*4 + 1);
        // $("img.question")[i].attr("src", "/image/face/" +  base.toString() + ".jpg");
        $("img.question")[i].src = "week5/image/face/" +  base.toString() + ".jpg";
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

function getCorrectNum() {
  let imageId = getImage($("img.question"));
  let correctNum = 0;
  for (let i=0 ; i<imageId.length ; i++) {
      if ((imageId[i] % 2) == 0) {
          correctNum++;
      }
  }
  return correctNum;
}

function showAnswers() {
  let images = $("img.question")
  let imagesId = getImage(images);

  for (let i=0 ; i<images.length ; i++) {
      if ((imagesId[i] % 2) == 0) {
          console.log("correct: ", i);
          markCorrect(images[i]);
      } else {
          console.log("error: ", i);
          markFalse(images[i]);
      }
  }
}

function markCorrect(image) {
    if (!image.classList.contains("selected")) {
        console.log("set green: ", image);
        image.style.borderColor = "rgba(0, 255, 0, 1)";
    }
}

function markFalse(image) {
    if (image.classList.contains("selected")) {
        console.log("set red: ", image);
        image.style.borderColor = "rgba(255, 0, 0, 1)";
    }
}

function clickFaceSubmit(event) {
    event.preventDefault();
    let select = getImage($("img.selected"));
    console.log("select: ", select);

    let correctNum = getCorrectNum();
    ///*
    $.ajax({
        data: {
            selectedImages: select
        },
        url: "week5/recognizer.php",
        success: function(data) {
            console.log("success");
            console.log("data: ", data);
            console.log("correct num: ", correctNum);
            $("div#result")[0].textContent = "result: " + (data*100/correctNum).toString() + "分";
            showAnswers();
        }
    });
    //*/
    
}

document.getElementById("faceSubmit").addEventListener("click", clickFaceSubmit);

setFaceImage();
addImageEvent();
