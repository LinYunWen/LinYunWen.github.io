function clickSignin(display) {
    let state = "";
    if (display) {
        state = "inline";
    } else {
        state = "none";
    }
    document.getElementById("login").style.display = state;
    document.getElementById("signin").style.display = "none";

    // document.getElementById("background").style.filter = "grayscale(30%)"
    // document.getElementById("background").style.opacity = 0.5;
}

document.getElementById("signin").addEventListener("click", clickSignin);

$("#innerSignin").click(function(event) {
    preventDefault();
    $.ajax({
        data: {
            user: $("input[name=user]").val(),
            pw: $("input[name=pw]").val(),
            email: $("input[name=email]").val()
        },
        url: "login.php",
        success: function(data) {
            console.log("data: ", data);
            console.log("success");
        }
    });
    $("div.login").html("loading...");
});
