function setFaceImage() {
    let sources = [];
    let sourcesTable = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    let mode = [[2, 3, 4], [3, 3, 3], [3, 4, 2]];
    let modeRan = Math.floor(Math.random()*3);
    // console.log("made Ran: ", modeRan);
    for (let i=0 ; i<3 ; i++) {
        let temp = getImageSources(mode[modeRan][i], i+1);
        console.log("temp: ", temp);
        sources = sources.concat(temp);
    }
    console.log("sources: ", sources);
    let i=0;
    while (i<9){
        // base = Math.floor(Math.random()*3 + 1)*10 + Math.floor(Math.random()*4 + 1);
        // $("img.question")[i].attr("src", "/image/face/" +  base.toString() + ".jpg");
        let base = Math.floor(Math.random()*sources.length);
        if (sourcesTable[base] == 1) {
            $("img.question")[i].src = "week5/image/face/after/" +  sources[base] + ".jpg";
            sourcesTable[base] = 0;
            console.log("base: ", base);
            i++;
        }
    }
}

function getImageSources(num, type) {
    let array = [];
    let checkTable = [1, 1, 1, 1, 1];
    while (array.length < num) {
        let index = Math.floor(Math.random()*5 + 1);
        if (checkTable[index] == 1) {
            checkTable[index] = 0;
            array.push((index+type*10).toString());
        }
    }
    return array;
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
      if ((imageId[i] / 30) >= 1) {
          correctNum++;
      }
  }
  return correctNum;
}

function showAnswers() {
  let images = $("img.question")
  let imagesId = getImage(images);

  for (let i=0 ; i<images.length ; i++) {
      if ((imagesId[i] / 30) >= 1) {
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

function showRecord() {
    document.getElementById("record").style.display = "inline";
    document.getElementById("recordSubmit").addEventListener("click", submitName);
}

function doEscape(str) {
    return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]);    
}

function submitName(event) {
    event.preventDefault();
    event.stopPropagation();
    let typeName =  doEscape($("#recordInput").val());
    let playScore =  $("#result").text.substring(8);
    $.ajax({
        data: {
            mode: "write",
            name: typeName,
            score: playScore
        },
        url: "week5/file.php",
        success: function(data) {
            console.log("success record");
            document.getElementById("record").style.display = "none";
        }
    });

}

function clickFaceSubmit(event) {
    event.preventDefault();
    let select = getImage($("img.selected"));
    console.log("select: ", select);

    let correctNum = getCorrectNum();
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
            showRecord();
        }
    });
}

document.getElementById("faceSubmit").addEventListener("click", clickFaceSubmit);

setFaceImage();
addImageEvent();
