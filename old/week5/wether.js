
var wether = [['Sunny', '<i class="fa fa-sun-o fa-5x" ></i>'],
            ['cloudy', '<i class="fa fa-cloud" aria-hidden="true"></i>'],
            ['rainning', '<i class="fa fa-bolt" aria-hidden="true"></i>']];

function getWether() {
    let state = Math.floor(Math.random()*wether.length + 1);
    document.getElementById("result").accessKey.innerHTML = wehter[state][1];
}