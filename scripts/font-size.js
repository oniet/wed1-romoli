window.addEventListener('load', function () {
    var slider = document.getElementById("font-slider");
    var output = document.getElementById("font-size");

    slider.addEventListener('change', function(){
        var size = slider.value;
        slider.title = size;
        output.innerText = size;
        document.body.style.fontSize = size+"px";
    }, false);
});
