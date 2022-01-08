let starSpawner = (num, distanceX, offsetY) => {
    let prototypeStar = document.getElementsByClassName("star")[0];
    let starContainer = document.getElementById("star");
    for (var i = 1; i < num; i += 1){
        let newStar = prototypeStar.cloneNode(true);
        newStar.style = "transform: translate("+ (Math.random() * 160 + i*distanceX)+"px," + Math.random() * offsetY + "px) scale("+ Math.round(Math.random()*2) +");";
        starContainer.append(newStar);   
    }
}
starSpawner(8,500,350);
var morph = anime({
    targets: '.morph-1',
    d:[
        {
            value: "m 48.268887,101.33852 c -4.021086,0.0633 -5.460406,4.63839 -5.759059,7.96291 -1.816279,13.44281 -1.765892,27.16912 0.308746,40.57882 0.465714,3.06768 2.727955,6.56616 6.2506,6.05338 23.797232,0 47.594464,0 71.391696,0 2.68075,-1.51171 2.36647,-5.76084 3.11146,-8.53569 0.79835,-7.62617 0.85537,-15.48079 -0.96159,-22.97104 -0.21057,-2.50844 -1.84125,-4.30975 -4.35066,-3.69474 -3.6446,0 -7.28921,0 -10.93381,0 -0.0645,-4.85279 0.13473,-9.72057 -0.11035,-14.56316 -0.4197,-3.10981 -3.48252,-5.28441 -6.54039,-4.83048 -17.468881,0 -34.937762,0 -52.406643,0 z"
        }
    ],
    duration: 400,
    delay: 600,
    easing: 'easeInQuad',
    direction: 'alternate',
    loop:true
})
var wheel = anime({
    targets: "#wheel",
    translateY: -1,
    duration: 500,
    easing: 'easeInQuad',
    direction: 'alternate',
    loop:true
})
var window = anime({
    targets: '#rect10-8-9',
    d:[
        {
            value: "m 108.77534,124.3792 c 3.0104,0.0351 6.03615,-0.0703 9.03691,0.053 0.76247,1.24689 0.40398,2.34466 0.57506,3.79953 -0.16977,1.11872 0.42976,4.13428 -1.41475,3.88071 -2.81033,-0.035 -5.636,0.0702 -8.43669,-0.053 -0.76247,-1.24688 -0.4708,-2.55304 -0.64188,-4.00792 0.20347,-1.00074 -0.24499,-3.20428 0.88135,-3.67232 z"
        }
    ],
    duration: 400,
    delay: 600,
    easing: 'easeInQuad',
    direction: 'alternate',
    loop:true
})
var road = anime({
    targets: "#g4779",
    translateX: -572,
    duration: 3000,
    easing: "linear",
    loop: true,
})  
var houses= anime({
   targets: ".houses-container",
   translateX: -2585,
   duration: 10000,
   easing: "linear",
   loop: true,
})  
var cities = anime({
    targets: ".cities-container",
    translateX: -2685,
    duration: 10000,
    easing: "linear",
    loop: true,
})
var farcity = anime({
    targets: ".city-far-container",
    translateX: -2610,
    duration: 30000,
    easing: "linear",
    loop: true,
})
var mountains = anime({
   targets: "#mountains",
   translateX: -1620,
   duration: 16000,
   easing: "linear",
   loop:true,
})
var farmountains = anime({
   targets: "#far-mountains",
   translateX: -1281,
   duration: 28000,
   easing: "linear",
   loop:true,
})
var sunpath = anime({
   targets: "#sun path",
   strokeDashoffset: [anime.setDashoffset,0],
   easing: 'linear',
   duration: 2000,
   direction: 'alternate',
   loop: true,
})
var suncore = anime({
  targets: "#sun",
  rotate: 360,
  easing: 'linear',
  duration: 8000,
  loop: true,
})
var moonshake = anime({
    targets: "#moon",
    rotate: -45,
    easing: "spring",
    duration: 200,
    loop:true,
    endDelay: 1000,
    direction: "alternate",
})
var starLight = anime({
    targets: ".star-path",
    strokeDashoffset: [0,anime.setDashoffset],
    easing: 'linear',
    duration: 500,
    endDelay: 500,
    loop: true,
    direction: "reverse",
})
var starCoreRotate = anime({
    targets: ".star-rotate",
    scale: [0,1],
    easing: "spring",
    duration: 300,
    endDelay: 700,
    loop: true,
})
let cloudContainer = document.getElementById("clouds");
var smallCloud = document.getElementsByClassName("smallc")[0];
var largeCloud = document.getElementsByClassName("largec")[0];
let cloudStore = [smallCloud,largeCloud];
var loop = 0;
let OFFSET = 1374.5;
var replacement = [];
var clouds = anime({
   targets: "#clouds",
   translateX: -1374.5,
   easing: 'linear',
   duration: 60000,
   loop: true,
   loopBegin: (anim) =>{
    removeClouds()
    if(loop == 0){
        generateClouds(3,OFFSET);
    }
    loop += 1;
    replaceClouds();
    generateClouds(3);
   },
   loopComplete: (anim) => {
       
        
   },
})
let generateClouds = (noOfClouds, offset = 0) => {
        for (var i = 1; i <= noOfClouds; i += 1){
            let dacloud = cloudStore[Math.floor(Math.random() * 2)].cloneNode(true); //alternating between small or large
            let xOffset = ((Math.random()*200 + 250) * i + offset) * -1;
            let yOffset = (Math.random()*235);
            dacloud.style = "transform: translate(" +xOffset+ "px, " + yOffset + "px);"; 
            cloudContainer.append(dacloud);  
            if (offset == 0){
                let clone = dacloud.cloneNode(true);
                clone.style = "transform: translate(" + (xOffset - OFFSET)+ "px, " + yOffset + "px)"; 
                replacement.push(clone);
            }
        }
}
let replaceClouds = () =>{
    for (let cloud in replacement){
        cloudContainer.append(replacement[cloud])
    }
    replacement = [];
}
let removeClouds = () => {
    cloudContainer.innerHTML = "";
}

let toggleDayOrNight = () =>{
    var animationFrame = document.getElementById("animation-frame");
    var daytime = animationFrame.dataset.daytime;
    var sun = document.getElementsByClassName("sun")[0];
    var moon = document.getElementsByClassName("moon")[0];
    if(daytime == -1){
        let nightEles = document.getElementsByTagName("svg");
        sun.style = "transform: translateY(0px);";
        moon.style = "transform: translateY(1000px);";
        for (var i = 0; i < nightEles.length; i += 1){
            nightEles[i].classList.remove("night");
            nightEles[i].classList.add("morning");
            animationFrame.classList.remove("night");
            animationFrame.classList.add("morning");
        }
    } else {
        let morningEles = document.getElementsByTagName("svg");
        moon.style = "transform: translateY(0px)";
        sun.style = "transform: translateY(1000px)";
        for (var i = 0; i < morningEles.length; i += 1){
            morningEles[i].classList.remove("morning");
            morningEles[i].classList.add("night");
            animationFrame.classList.add("night");
            animationFrame.classList.remove("morning");
        }
    }
    animationFrame.dataset.daytime = daytime*-1;
}


setInterval(()=>{
    toggleDayOrNight();
}, 10000)  