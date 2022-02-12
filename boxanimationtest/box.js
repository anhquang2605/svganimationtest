    const path2String = "m 45.725651,211.67687 28.677664,-14.87371 53.303615,26.5272 -28.677667,14.87371";
   const path1String = "45.631926,211.75474 -26.695848,13.28552 53.303612,26.5272 26.695848,-13.28552";
   const path2 = path2String.replace(",", " ");
   const path3String = "m 45.631926,211.75474 0.102664,-14.87371 53.30361,26.5272 -0.102662,14.87371";
   const path1 = path1String.replace(",", " ");
   const path = anime.path("#path34");
   var animes = [];
   var objects = ["ball","camera", "vase", "shoe", "robot"];
   const lidN = {
      path2:"m 98.792632,171.86423 0.04854,13.28552 -53.303611,26.5272 -0.04854,-13.28552 z",
      path3:"m 123.36108,197.37762 -24.519912,-12.22787 -53.303611,26.5272 24.519916,12.22787 z"
   }
   const lidS = {
      path2: "m 152.33287,211.67687 0.0485,-13.73978 -53.303611,26.5272 -0.04853,13.73978 z",
      path3: "m 152.33287,211.67687 -27.54373,-13.73978 -53.303613,26.5272 27.543736,13.73978 z"
   }
   const lidE = {
      path2: "m 99.078269,171.86381 -0.04854,13.28552 53.303611,26.5272 0.0485,-13.28552 z",
      path3: "m 72.419749,198.39294 26.60998,-13.24361 53.303611,26.5272 -26.61002,13.24361 z"
   }
   const lidW = {
      path2: "m 45.631926,211.75474 -0.04853,-16.5746 53.303612,26.5272 0.04853,16.5746 z",
      path3: "m 45.631926,211.75474 26.787779,-13.3618 53.303615,26.5272 -26.787782,13.3618 z"
   }
   const timeline1 = anime.timeline({
      duration: 500,
      autoplay: false
   })
   const timeline2 = anime.timeline({
      duration: 500,
      autoplay: false
   })
    timeline1.add({
       targets: '.lidn',
       d:[
         
         {value: lidN.path2},
         {value: lidN.path3}
       ],
       easing: "linear",
    }).add({
      targets: '.lide',
       d:[
         
         {value: lidE.path2},
         {value: lidE.path3}
       ],
       easing: "linear",
    })
    timeline2.add({
       targets: ".lids",
       d:[
         
         {value: lidS.path2},
         {value: lidS.path3}
       ],
       easing: "linear",
    }).add({
      targets: '.lidw',
       d:[
         
         {value: lidW.path2},
         {value: lidW.path3}
       ],
       easing: "linear",
    })
   let closeTheBox = () => {
            timeline1.play();
            timeline2.play();  
            timeline1.direction= "reverse";
            timeline2.direction= "reverse";
   }
   let openTheBox = ()=>{
      
      timeline1.play();
      timeline2.play();  
      timeline1.direction= "normal";
      timeline2.direction= "normal";
   }
   let allocateObjectToPathAnimation = (listOfObject) =>{
      for(let i = 0; i < listOfObject.length; i+=1){
         var objName = listOfObject[i];
         var obj = document.getElementById(objName);
         var pathSVG = document.getElementById(objName + "-path");
         let pathLeftOffset = parseInt(pathSVG.getBoundingClientRect().left);
         let pathTopOffset = parseInt(pathSVG.getBoundingClientRect().top);
         console.log(pathLeftOffset);
         var pathStartCord = pathSVG.getAttribute("d").split(" ")[1].split(","); //0 for x 1 for y
         var moveByLeft = pathLeftOffset - parseInt(pathStartCord[1]) - obj.offsetWidth;
         var moveByTop =  obj.offsetHeight *  0.5 * -1;
         obj.style = "transform: translate(" + pathStartCord[0] + "px, " +  pathStartCord[1] + "px);";
/*          let daAnime = anime({
         targets: "#"+objName,
         translateX: pathAnimeObj('x'),
         translateY: pathAnimeObj('y'),
         //rotate: pathAnimeObj("angle"),
         easing: "easeInOutCubic",
         duration: "3000",
         autoplay:false
         }); */
         /* if(i === listOfObject.length - 1){
            console.log(daAnime);
            daAnime.update = (anim) => {
               let fadeCheckPoint = 78.5
               if(obj.classList.contains("fading")){
                  obj.classList.remove("fading");      
               }
               if(anim.progress >= fadeCheckPoint ){
                  obj.classList.add("fading");
               }
               if(anim.reversed === true && anim.progress === 100){
                  openTheBox();
               }
            };
            daAnime.complete = (anim)=>{
               if(anim.reversed === false){
               closeTheBox(anim.reversed);
            }
            }
         }
         animes.push(daAnime); */
      }
   } 
   //allocateObjectToPathAnimation(objects);

   let ballPath = anime.path('#ball-path');
   let ballMoveAlong = anime({
       targets: "#ball",
       translateX:  ballPath('x'),
       translateY: ballPath('y'),
       easing: "easeInOutExpo",
       duration: 10000,
       update: (anim) => {
          if(Math.round(anim.progress) == 1){
            anim.pause;
          }
          if(Math.round(anim.progress) == 80){
            let ball = document.getElementById("ball");
            ball.classList.add("fading");
          }
          if(Math.round(anim.progress) == 85){
             closeTheBox();
          }
       }
   })
   let cameraPath = anime.path("#camera-path")
   let cameraMoveAlong = anime({
      targets: "#camera",
      translateX:  cameraPath('x'),
      translateY: cameraPath('y'),
      easing: "easeInOutExpo",
      duration: 10000,
      update: (anim) => {
         if(Math.round(anim.progress) == 85){
           let camera = document.getElementById("camera");
           camera.classList.add("fading");
         }
      }
   })
   let robotPath = anime.path("#robot-path")
   let robotMoveAlong = anime({
      targets: "#robot",
      translateX: robotPath('x'),
      translateY: robotPath("y"),
      easing: "easeInOutExpo",
      duration: 10000,
      update: (anim) => {
         
         if(Math.round(anim.progress) == 85){
            let robot = document.getElementById("robot");
            robot.classList.add("fading");
         }
      }
   })
   let shoePath = anime.path("#shoe-path")
   let shoeMoveAlong = anime({
      targets: "#shoe",
      translateX: shoePath('x'),
      translateY: shoePath('y'),
      easing: "easeInOutExpo",
      duration: 10000,
      update: (anim) =>{
         if(Math.round(anim.progress) == 85){
            let shoe = document.getElementById("shoe");
            shoe.classList.add("fading");
         }
      }
   })
   let vasePath = anime.path("#vase-path")
   let vaseMoveAlong = anime({
      targets: "#vase",
      translateX: vasePath('x'),
      translateY: vasePath('y'),
      easing: "easeInOutExpo",
      duration: 10000,
      update: (anim) =>{
         if(Math.round(anim.progress) == 85){
            let vase = document.getElementById("vase");
            vase.classList.add("fading");
         }
      }
   })

   var bodyd = anime({

   })
   var flowerTimeline = anime.timeline({
       duration: 5000,
       loop: true
   })
   flowerTimeline
   .add({
       targets: "#flower-body",
       strokeDashoffset: [anime.setDashoffset,0],
       duration: 500,
       easing: "linear"
   }) 
   .add({
       targets: "#flower-core",
       scale: [0,1],
       duration: 100,
       easing: "spring"
   })
   .add({
       targets: ".flower-pedal",
       scale: [0,1],
       duration: 50,
       easing: "linear",
       delay:anime.stagger(80)
   })
   .add({
       targets: "#pedal-1-s",
       d:[
           {
               value: "m 106.82227,126.75327 c 0,0 -1.15889,-2.10341 -1.50712,-3.19959 -0.45288,-1.42555 -0.19687,-2.96736 0.91289,-3.11537 1.10976,-0.14802 1.54182,0.96856 1.64312,2.23629 0.10133,1.26772 -1.04889,4.07867 -1.04889,4.07867 z"
           }
       ],
       duration: 200
   })
   .add({
       targets: "#pedal-2-s",
       d:[
           {
               value: "m 107.75722,127.50999 c 0,0 0.88661,-2.23187 1.51126,-3.19763 0.81231,-1.25596 2.16511,-2.03869 2.98497,-1.27627 0.81986,0.76243 0.23277,1.80586 -0.68128,2.69012 -0.91404,0.88426 -3.81495,1.78378 -3.81495,1.78378 z"
           }
       ],
       duration: 200
   })
   .add({
       targets: "#pedal-3-s",
       d:[
           {
               value: "m 106.863,127.74947 c 0,0 2.24907,0.84202 3.22707,1.44734 1.27187,0.78717 2.08136,2.12412 1.3354,2.95899 -0.74597,0.83487 -1.80088,0.26865 -2.70314,-0.62763 -0.90227,-0.89626 -1.85933,-3.7787 -1.85933,-3.7787 z"
           }
       ],
       duration: 200
   })
   .add({
       targets: "#pedal-4-s",
       d:[
           {
               value: "m 106.68141,127.99124 c 0,0 -1.11165,2.12874 -1.8324,3.02507 -0.93731,1.16564 -2.36348,1.80496 -3.1005,0.96218 -0.73702,-0.84277 -0.0456,-1.82023 0.95459,-2.60568 1.00022,-0.78547 3.97831,-1.38157 3.97831,-1.38157 z"
           }
       ],
       duration: 200
   })
   .add({
       targets: "#pedal-5-s",
       d:[
           {
               value: "m 105.807,127.1517 c 0,0 -2.35281,-0.48132 -3.41316,-0.92686 -1.37898,-0.5794 -2.3869,-1.77389 -1.78012,-2.71479 0.60678,-0.94091 1.73702,-0.54596 2.76791,0.19879 1.0309,0.74474 2.42537,3.44286 2.42537,3.44286 z"
           }
       ],
       duration: 200
   }).add({
      targets: "#flower-pedals",
      rotate: 360,
      duration: 1000,
      easing: "linear"
  })
setTimeout(() => {//move objects to the respective location
   shoeMoveAlong.pause();
   robotMoveAlong.pause();
   vaseMoveAlong.pause();
   ballMoveAlong.pause();
   cameraMoveAlong.pause();
}, 1);
/*  let hoveringObjects = anime({
   targets: ".flying-object:not(#ball)",
   translateY: "+= 15",
   duration: anime.stagger([500,2000]),
   loop: true,
   direction: "alternate",
   easing:"linear",
})  */
let ballSqueeze = anime.timeline({
   targets: "#ball",
   loop: true
}).add({
   targets: "#ball",
   scaleY: 0.4,
   scaleX: 1.2,
   translateY: 246.5,
   duration: 400,
   easing: "linear",
}) .add({
   targets: "#ball",
   scaleY: [1],
   scaleX: [1],
   translateY: 219.5,
   duration: 100,
   easing: "linear"
})
.add({
   target: "#ball",
   scaleY: 1.5,
   scaleX: 0.7,
   duration: 50,
   easing: "linear"
}).add({
   target: ".ball-squeeze",
   translateY: 50,
   duration: 400,
}).add({
   scaleY: 1,
   scaleX: 1,
   duration: 200,
   easing: "linear",
},"-=100")
.add({
   targets: "#ball",
   rotate: 360,
   duration: 300,
   easing: "linear"
})
.add({
   scaleX: 0.7,
   scaleY: 1.5,
   translateY: 210,
   duration: 100,
   easing: "linear"
}).add({
   scaleX: 1,
   scaleY: 1,
   duration: 100,
   easing: "linear",
}).add({
   translateY: 185,
   duration: 150,
   easing: "linear"
}).add({
   translateY: 210,
   duration: 200,
   easing: "easeOutBounce",
   endDelay: 200,
})



//camera anim
//shutter effect
let btnDescentDur = 300
let btnRiseDur =100
let shutterDur = 1000
let shutterDelay = 600
let flashStarDuration = 300
let flashStarOffset = 5*(btnRiseDur + btnDescentDur)
let btnAnimDur = btnDescentDur + btnRiseDur;
let cameraLoop = anime.timeline({
   loop: true,
}).add({
   targets: "#len-shutter path",
   rotate: 48,
   duration: shutterDur,
   easing: "linear",
   delay: shutterDelay,
   endDelay: btnAnimDur,
}).add({
   targets: "#len-shutter",
   translateX: 5.9,
   translateY: -2.3,
   duration: shutterDur,
   easing: "linear",
   delay: shutterDelay,
   endDelay: btnAnimDur,
},"-=" + (shutterDur + shutterDelay + btnAnimDur)).add({
   targets: "#cam-btn",
   translateY: 2,
   duration: btnDescentDur,
   easing: "linear"
}).add({
   targets: ".stick",
   marginTop: [30,-18],
   duration: btnDescentDur,
   easing: "linear",
   loop: true,
}, "-=" + btnDescentDur).add({
   targets: "#cam-btn",
   translateY: 0,
   duration: btnRiseDur,
   easing: "spring"
})
.add({
   targets: "#flash-star",
   scale: [0.3,0.8],
   opacity: [0,1],
   duration: flashStarDuration,
   easing: "linear"
}, "-="+ flashStarOffset).add({
   targets: "#halo-flash",
   scale: [0,1],
   duration: flashStarDuration,
   translateY: 3,
   translateX: 3,
   borderWidth: [12,1],
   easing: "linear"
}, "-="+ (flashStarDuration+flashStarOffset - 550) ).add({
   targets: "#halo-flash",
   opacity: 0,
   duration: 150,
   easing: "linear",
}, "-=1200").add({
   targets: "#flash-star",
   scale: 0,
   opacity: [1,0],
   duration: 200,
   easing: "linear"
}, "-=1200");

let leShoePath = anime.path("#shoe-marked-path");
let daShoeSide = document.getElementById("da-shoe-side");
let shoeBack = document.getElementById("shoe-back");
let shoeFront = document.getElementById("shoe-front");
let shoeElevation = 70;
let shoeAirTime = 520;
let shoeLiftedAngle = 30;
let shoeEaseOut = "easeOutQuad";
let shoeEaseIn = "easeInQuad";
let shoeBounceDuration = 210;
let shoeScaleX = 1.2;
let shoeScaleY = 0.8;
let shoeYTranslateDuringBounce = 15;
let shoefollowPathDur = 4500;
let shoeMoveToAttachDur = 800;
let shoeMoveToAttachEase = "easeInExpo";
let shoeMovetoAttachYDistace = 85;
let shoeAttachtRotateAngle = 30;
let shoeTimeline = () => {
   let pathlace4 = anime.timeline({
   
   }).add({//fourth lace launch
      targets: "#lace4path",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 500,
      easing: "linear"
   }).add({
      targets: "#lace4path",
      strokeDashoffset: 32.5 * (-1),
      duration: 500,
      easing: "linear"
   }).add({
      targets: "#lace4",
      strokeDashoffset: [0,anime.setDashoffset],
      duration: 100,
      easing: "linear",
   },"-=500").add({//dot path begins
      targets: "#marked-begin circle",
      scale: [0,1],
      duration: 500,
      delay: anime.stagger(100),
   },"-=500").add({
      targets: "#marked-begin path",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 100,
      easing: "linear"
   },"-=300").add({
      targets: "#marked-begin path",
      strokeDashoffset: -3.5,
      duration: 150,
      opacity: 0,
      easing: 'linear'
   },"-=100").add({
      targets: "#marked-begin circle",
      scale: [0],
      easing: "easeInExpo",
      duration: 500,
   }).add({
      targets: "#shoe-marked-path-cover",
      strokeDashoffset: [0,anime.setDashoffset],
      duration: 1000,
      easing: "linear",
   }).add({//2nd lace and 3rd lace launch
      targets: "#lace2path",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 500,
      easing: "linear"
   }).add({
      targets: "#lace2path",
      strokeDashoffset: 85.5 * (-1),
      duration: 500,
      easing: "linear"
   }).add({
      targets: "#lace2",
      strokeDashoffset: [0,anime.setDashoffset],
      duration: 100,
      easing: "linear",
   },"-=500")
   .add({
      targets: "#lace2pathtip",
      strokeDashoffset:  [anime.setDashoffset,-75],
      duration: 1150,
      easing: "linear",
   },"-=1200").add({
      targets: "#lace3path",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 500,
      easing: "linear"
   },"-=800").add({
      targets: "#lace3path",
      strokeDashoffset: 78 * (-1),
      duration: 400,
      easing: "linear"
   }).add({
      targets: "#lace3",
      strokeDashoffset: [0,anime.setDashoffset],
      duration: 100,
      easing: "linear",
   },"-=500")
   .add({
      targets: "#lace3pathtip",
      strokeDashoffset:  [anime.setDashoffset,-68],
      duration: 1150,
      easing: "linear",
   },"-=1150").add({//shoe start moving
      targets: "#da-shoe",
      translateX: "25",
      translateY: "-10",
      rotate: -30,
      easing: "linear",
      duration: 200,
   }).add({
      targets: "#da-shoe",
      translateX: "25",
      translateY: "0",
      rotate: 0,
      easing: "linear",
      duration: 200,
   }).finished.then(()=>{
      document.getElementById("da-shoe").style.opacity = 0;
      document.getElementById("da-shoe2").style.opacity = 1;
      document.getElementById("shoe-marked-path-reveal").style.opacity = 1;
      shoe2();
   })
}
shoeTimeline();
let shoe2 = () => {
   let timeline = anime.timeline({
   }).add({
      targets: "#da-shoe2",
      translateX: leShoePath("x"),
      translateY: leShoePath("y"), 
      delay:500,
      duration: shoefollowPathDur,
      easing: "linear",
      update: (anim) => {
         if(Math.round(anim.progress) == 8){
            let innertimeline = anime.timeline({
               targets: "#vertical"
            }).add({
               translateY: "-="+shoeElevation,
               duration: shoeAirTime/2,
               rotate: -shoeLiftedAngle,
               easing: shoeEaseIn,
            }).add({
               translateY: "+="+shoeElevation,
               rotate: 0,
               duration: shoeAirTime/2,
               easing: shoeEaseOut
            }).add({//shoe contact bouncing
               scaleY: shoeScaleY,
               translateY: "+="+shoeYTranslateDuringBounce,
               scaleX: shoeScaleX,
               duration: shoeBounceDuration*1/3,
               easing: "linear"
            },"-="+shoeAirTime/12).add({
               scaleY: [1],
               scaleX: [1],
               translateY: "-=" + (shoeYTranslateDuringBounce),
               duration:shoeBounceDuration*2/3,
               easing: "spring"
            })
         }
         if(Math.round(anim.progress) == 23){//show back
            shoeBack.style.opacity= 1;
            daShoeSide.style.opacity =0;
            let innertimeline = anime.timeline({
               targets: "#vertical"
            }).add({
               translateY: "-="+shoeElevation,
               duration: shoeAirTime/2,
               easing: shoeEaseIn,
            }).add({
               translateY: "+="+shoeElevation,
               duration: shoeAirTime/2,
               easing: shoeEaseOut
            }).add({//shoe contact bouncing
               scaleY: shoeScaleY,
               translateY: "+="+shoeYTranslateDuringBounce,
               scaleX: shoeScaleX,
               duration: shoeBounceDuration*1/3,
               easing: "linear"
            },"-="+shoeAirTime/12).add({
               scaleY: [1],
               scaleX: [1],
               translateY: "-=" + (shoeYTranslateDuringBounce),
               duration:shoeBounceDuration*2/3,
               easing: "spring"
            })
         }
         if(Math.round(anim.progress) == 38){
            let innertimeline = anime.timeline({
               targets: "#vertical"
            }).add({
               translateY: "-=" +shoeElevation,
               duration: shoeAirTime/2,
               rotate: shoeLiftedAngle,
               easing: shoeEaseIn,
            }).add({
               translateY: "+=" + +shoeElevation,
               rotate: 0,
               duration: shoeAirTime/2,
               easing: shoeEaseOut
            }).add({//shoe contact bouncing
               scaleY: shoeScaleY,
               translateY: "+="+shoeYTranslateDuringBounce,
               scaleX: shoeScaleX,
               duration: shoeBounceDuration*1/3,
               easing: "linear"
            },"-="+shoeAirTime/12).add({
               scaleY: [1],
               scaleX: [1],
               translateY: "-=" + (shoeYTranslateDuringBounce),
               duration:shoeBounceDuration*2/3,
               easing: "spring"
            })
         }
         if(Math.round(anim.progress) == 40){//show side flipped
            shoeBack.style.opacity= 0;
            daShoeSide.style.opacity =1;
            daShoeSide.style.transform = "scaleX(-1)";
         }
         if(Math.round(anim.progress) == 53){
            let innertimeline = anime.timeline({
               targets: "#vertical"
            }).add({
               translateY: "-=" +shoeElevation,
               duration: shoeAirTime/2,
               rotate: shoeLiftedAngle,
               easing: shoeEaseIn,
            }).add({
               translateY: "+=" +shoeElevation,
               rotate: 0,
               duration: shoeAirTime/2,
               easing: shoeEaseOut
            }).add({//shoe contact bouncing
               scaleY: shoeScaleY,
               translateY: "+="+shoeYTranslateDuringBounce,
               scaleX: shoeScaleX,
               duration: shoeBounceDuration*1/3,
               easing: "linear"
            },"-="+shoeAirTime/12).add({
               scaleY: [1],
               scaleX: [1],
               translateY: "-=" + (shoeYTranslateDuringBounce),
               duration:shoeBounceDuration*2/3,
               easing: "spring"
            })
         }
         if(Math.round(anim.progress) == 70){//show front
            daShoeSide.style.opacity = 0;
            shoeFront.style.opacity = 1;
            let innertimeline = anime.timeline({
               targets: "#vertical"
            }).add({
               translateY: "-="+shoeElevation,
               duration: shoeAirTime/2,
               easing: shoeEaseIn,
            }).add({
               translateY: "+="+shoeElevation,
               duration: shoeAirTime/2,
               easing: shoeEaseOut
            }).add({//shoe contact bouncing
               scaleY: shoeScaleY,
               translateY: "+="+shoeYTranslateDuringBounce,
               scaleX: shoeScaleX,
               duration: shoeBounceDuration*1/3,
               easing: "linear"
            },"-="+shoeAirTime/12).add({
               scaleY: [1],
               scaleX: [1],
               translateY: "-=" + (shoeYTranslateDuringBounce),
               duration:shoeBounceDuration*2/3,
               easing: "spring"
            })
         }
         if(Math.round(anim.progress) == 90){//show side
            daShoeSide.style.opacity = 1;
            daShoeSide.style.transform = "scaleX(1)";
            shoeFront.style.opacity = 0;
            let innertimeline = anime.timeline({
               targets: "#vertical"
            }).add({
               translateY: "-="+shoeElevation,
               duration: shoeAirTime/2,
               rotate: -shoeLiftedAngle,
               easing: shoeEaseIn,
            }).add({
               translateY: "+="+shoeElevation,
               rotate: 0,
               duration: shoeAirTime/2,
               easing: shoeEaseOut
            }).add({//shoe contact bouncing
               scaleY: shoeScaleY,
               translateY: "+="+shoeYTranslateDuringBounce,
               scaleX: shoeScaleX,
               duration: shoeBounceDuration*1/3,
               easing: "linear"
            },"-="+shoeAirTime/12).add({
               scaleY: [1],
               scaleX: [1],
               translateY: "-=" + (shoeYTranslateDuringBounce),
               duration:shoeBounceDuration*2/3,
               easing: "spring"
            })
         }
      }
   },"-=300").add({
      targets: "#shoe-marked-path-reveal",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: shoefollowPathDur,
      direction: "reverse",
      easing: "linear",
   }, "-=" + shoefollowPathDur).finished.then(()=>{
      document.getElementById("lace2pathtip").style.opacity = 0; 
      document.getElementById("lace3pathtip").style.opacity = 0; 
      document.getElementById("lace1-effect").style.opacity = 1;
      particleTimeline();
     
   })
}
let particleTimeline = () =>{
   let timeline = anime.timeline({
      //loop: true
   }).add({
      targets: "#lace1path",
      strokeDashoffset: [anime.setDashoffset,0],
      duration: 500,
      easing: "easeInQuint",
   }).add({
      targets: "#dust-particles path",
      strokeDashoffset: [anime.setDashoffset,0],
      duration: 700,
      opacity: [0,1],
      easing: "linear",
   }).add({
      targets: "#hook-endpoint",
      scale: [0,1],
      duration: 300,
      easing: "spring",
   },"-=760").add({
      targets: "#da-shoe2 #da-shoe-side",
      rotate: shoeAttachtRotateAngle,
      translateX: "-=10",
      duration: 50,
      easing: "linear"
   },"-=1550").add({
      targets: "#da-shoe2 #da-shoe-side",
      translateX: "+=15",
      translateY: "-="+shoeMovetoAttachYDistace,
      duration: shoeMoveToAttachDur,
      easing: shoeMoveToAttachEase
   },"-=1200").add({
      targets: "#lace1path",
      strokeDashoffset: 33 * -1,
      duration: shoeMoveToAttachDur+100,
      easing: "easeInExpo"
   },"-="+(shoeMoveToAttachDur*1.5)).add({
      targets: "#lace1path, #shoe-rotate-along-string",
      rotate: "-=80",
      duration: 700,
      easing: "easeInQuad",
   }).add({
      targets: "#lace1path, #shoe-rotate-along-string",
      rotate: "+=70",
      duration: 700,
      easing: "easeInQuad",
   }).add({
      targets: "#lace1path, #shoe-rotate-along-string",
      rotate: "-=50",
      duration: 500,
      easing: "easeInQuad",
   }).add({
      targets: "#lace1path, #shoe-rotate-along-string",
      rotate: "+=20",
      duration: 350,
      easing: "spring",
   }).finished.then(()=>{
      swapToOriginalShoe();
      document.getElementById("dust-particles").style.opacity = 0;
      
      let timeline = anime.timeline({

      }).add({
         targets: "#lace1",
         strokeDashoffset: [0,anime.setDashoffset],
         duration: 100,
         easing: "linear"
      }).add({
         targets: "#da-shoe",
         translateY: "+=3",
         duration: 100,
         easing: "linear"
      },"-=100").add({
         targets: "#lace1path",
         strokeDashoffset: -30,
         duration: 100,
         easing: "linear",
         endDelay:300,
      },"-=100").add({
         targets: "#cut-effect",
         opacity: 1,
         duration: 50,
         easing: "linear"
      }).add({
         targets: "#cut-effect path",
         strokeDashoffset: [anime.setDashoffset,0],
         duration: 200,
         easing: "linear",
      }).add({
         targets: "#cut-effect path",
         strokeDashoffset: -4,
         opacity: [1,0],
         duration: 200,
         direction: "reverse",
         easing: "linear",
      }).add({
         targets: "#da-shoe",
         translateY: "+=4.5",
         rotate: "+=10",
         duration: 200,
         easing: "linear",
      },"-=400").finished.then(()=>{
         let timeline = anime.timeline({

         }).add({
            targets: "#lace1path",
            strokeDashoffset: -50,
            duration: 300,
            easing: "linear"
         }).add({
            targets: "#hook-endpoint",
            scale: [1.1,0],
            duration: 300,
            easing: "spring"
         })
         let timeline2 = anime.timeline({}).add({
            targets: ".shoe-laces",
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 500,
            endDelay: 500,
            easing: "linear"
            }).finished.then(()=>{
               restoreInitialStateOfShoe();
            }) 
      })
      
   })
   return timeline
}
let swapToOriginalShoe = () =>{
   let shoe =  document.getElementById("da-shoe");
   let shoe2 = document.getElementById("vertical");
   shoe2.style.opacity = 0;
   shoe.style.opacity = 1;
   shoe.style.transform = "translate(-0.3px,-7.5px) rotate(-10deg)";
}

let restoreInitialStateOfShoe = () =>{
 //reset everything back to its initial stage
   document.getElementById("lace2pathtip").style.opacity = 1; 
   document.getElementById("lace3pathtip").style.opacity = 1;
   document.getElementById("shoe-marked-path-reveal").style.opacity = 0;
   document.getElementById("cut-effect").style.opacity = 0;
   let markedPath = document.querySelectorAll("#marked-begin path");
   for(var path of markedPath){
      path.style.opacity = 1;
   }
   document.getElementById("da-shoe").style.opacity = 1;
   document.getElementById("da-shoe").style.transform = "translateX(0)";
   document.getElementById("da-shoe2").style.cssText = "";
   document.getElementById("vertical").style.cssText = "";
   document.getElementById("da-shoe-side").style.cssText = "";
   document.getElementById("shoe-rotate-along-string").style.cssText = "";
   document.getElementById("hook-endpoint").style.cssTest = "";
   document.getElementById("lace1path").style.transform = "";
   document.getElementById("lace1-effect").style.opacity = 0;
   document.getElementById("da-shoe2").style.opacity = 0;
   shoeTimeline();
}
//Robot animation
let lightningPathDur = 250;
let delayDur = lightningPathDur*11;
let robotEyesDur = lightningPathDur;
let robotEyesTimeSync = delayDur;
let antenaLeft = "m 82.937424,88.699383 c 0,0 -3.307291,-6.520089 -7.559524,-8.976934";
let antenaRight = "m 82.937424,88.699383 c 0,0 3.307291,-6.520089 7.559524,-8.976934";
let antenaMid = "m 82.960845,88.839136 c 0,0 -0.04102,-7.396539 -0.04102,-12.530364";
//Robot startup

let antenaEffect = anime.timeline({loop:false});
antenaEffect.add({
   targets: "#eye-dizzy",
   opacity: [0],
}).add({
   targets: "#lightning-effect path",
   strokeDashoffset: [anime.setDashoffset,0],
   duration: lightningPathDur,
   stroke: ["#f0e68c","#f0e68c","#800000","#4b0082"],
   easing: "linear",
}).add({
   delay: 250,
   targets: "#lightning-effect path",
   strokeDashoffset: -9,
   duration: lightningPathDur,
   easing: "linear",
   opacity: 0,
}).add({
   targets: "#antena-led",
   fill: "#f0e68c",
   easing: "easeOutBounce",
   duration: lightningPathDur*4,
}).add({
   targets: "#antena-effect circle",
   scale: [0,3],
   duration: lightningPathDur * 2,
   easing: "linear",
}).add({
   targets: "#antena-effect circle",
   strokeWidth: 0,
   duration: lightningPathDur,
   easing: "linear",
}).add({
   targets: "#chest-screen rect",
   fill: "#f0e68c",
   duration: lightningPathDur,
   easing: "linear",
})
let robotEyesOn = anime.timeline({loop: false})
robotEyesOn.add({
   delay: lightningPathDur*11,
   targets: "#eyes ellipse",
   fill: ["#ffffff","#f0e68c"],
   duration: robotEyesDur,
   easing: "easeInOutBounce"
})
//eyes on loop, animation continue
let armTurnDur = 140;
let botArmtranslateX = 6;
let botArmtranslateY = 5;
let headSideMovementX = 4;
let headSideMovementY = 1;
let antenaAngle = 70;
let delayDurRobotHead = 500;
let robotTurnDur = 400;
let eyesLoop = anime.timeline({

}).add({
   delay: lightningPathDur*11,
   targets: "#eyes ellipse",
   fill: ["#ffffff","#f0e68c"],
   duration: robotEyesDur,
   easing: "easeInOutBounce"
}).add({
   targets: "#heart-path path",
   strokeDashoffset: [anime.setDashoffset,0],
   duration: robotEyesDur,
   easing: "linear"
}).add({
   targets: "#heart-path path",
   duration: robotEyesDur,
   easing: "linear",
   fill: "#4b0082",
}).add({
   targets: "#star-eye",
   opacity: [0,1],
   scale: [0.1,1],
   duration: robotEyesDur*2,
   easing: "linear" 
},"-="+robotEyesDur*2).add({
   targets: "#left-arm #top-part-l",
   duration: armTurnDur,
   rotate: 90,
   easing: "linear",
}).add({
   targets: "#right-arm #top-part-r",
   duration: armTurnDur,
   rotate: -90,
   easing: "linear",
},"-="+armTurnDur).add({
   targets: "#left-arm #bot-part-l",
   translateX: -botArmtranslateX,
   translateY: -botArmtranslateY,
   duration: armTurnDur,
   easing: "linear"
},"-=" + armTurnDur).add({
   targets: "#right-arm #bot-part-r",
   translateX: botArmtranslateX,
   translateY: -botArmtranslateY,
   duration: armTurnDur,
   easing: "linear"
},"-=" + armTurnDur).add({
   delay: 500,
   targets: "#right-arm #bot-part-r",
   scaleY: -1,
   duration: armTurnDur,
   easing: "linear", 
}).add({
   delay: 500,
   targets: "#left-arm #bot-part-l",
   scaleY: -1,
   duration: armTurnDur,
   easing: "linear", 
}).add({
   targets: "#right-arm #bot-part-r",
   scaleY: 1,
   duration: armTurnDur,
   easing: "linear", 
},"-="+armTurnDur).add({
   delay: 500,
   targets: "#left-arm #bot-part-l",
   scaleY: 1,
   duration: armTurnDur,
   easing: "linear", 
}).add({
   targets: "#right-arm #bot-part-r",
   scaleY: -1,
   duration: armTurnDur,
   easing: "linear", 
},"-="+armTurnDur).add({//robot head side move
   targets: "#robot-head",
   translateX: -headSideMovementX,
   duration: armTurnDur,
   easing: "linear",
   }).add({
   targets: "#antena-body",
   d: [{
      value: antenaRight 
   }],
   duration: armTurnDur,
   easing: "linear"
},"-="+armTurnDur).add({
   targets: "#antena-bulb",
   rotate: antenaAngle,
   duration: armTurnDur,
   easing: "linear"
},"-="+armTurnDur).add({
   targets: "#antena-body",
   d: [{
      value: antenaLeft 
   }],
   duration: armTurnDur,
   easing: "easeOutBounce"
}).add({
   targets: "#antena-bulb",
   rotate: -antenaAngle,
   duration: armTurnDur,
   easing: "easeOutBounce"
},"-="+armTurnDur).add({
   targets: "#robot-head",
   translateX: "+="+headSideMovementX*2,
   duration: armTurnDur*2,
   easing: "linear",
}).add({
   targets: "#antena-body",
   d: [{
      value: antenaRight,
   }],
   duration: armTurnDur*2,
   easing: "easeOutBounce"
},).add({
   targets: "#antena-bulb",
   rotate: "+="+ antenaAngle*2,
   duration: armTurnDur*2,
   easing: "easeOutBounce"
},"-="+armTurnDur*2).add({//2nd round
   targets: "#robot-head",
   translateX: "-=" + (headSideMovementX*2),
   duration: armTurnDur*2,
   easing: "linear",
   }).add({
   targets: "#antena-body",
   d: [{
      value: antenaLeft 
   }],
   duration: armTurnDur,
   easing: "easeOutBounce"
}).add({
   targets: "#antena-bulb",
   rotate: -antenaAngle,
   duration: armTurnDur,
   easing: "easeOutBounce"
},"-="+armTurnDur).add({//last round back to center
   targets: "#robot-head",
   translateX: "+="+headSideMovementX,
   duration: armTurnDur,
   easing: "linear",
}).add({
   targets: "#antena-body",
   d: [{
      value: antenaRight,
   }],
   duration: armTurnDur,
   easing: "easeOutBounce"
},).add({
   targets: "#antena-bulb",
   rotate: "+="+ antenaAngle*2,
   duration: armTurnDur,
   easing: "easeOutBounce"
},"-="+armTurnDur).add({
   targets: "#antena-body",
   d: [{
      value: antenaLeft,
   }],
   duration: armTurnDur/2,
   easing: "easeOutBounce"
},).add({
   targets: "#antena-bulb",
   rotate: "-="+ antenaAngle*2,
   duration: armTurnDur/2,
   easing: "easeOutBounce"
},"-="+armTurnDur/2).add({
   targets: "#antena-body",
   d: [{
      value: antenaMid,
   }],
   duration: armTurnDur/4,
   easing: "easeOutBounce"
},).add({
   targets: "#antena-bulb",
   rotate: "+="+ antenaAngle,
   duration: armTurnDur/4,
   easing: "easeOutBounce"
},"-="+armTurnDur/4)//robot start moving side way
.add({
   targets: "#robot-body-box",
   scaleX: 0.7,
   duration: robotTurnDur,
   easing: "linear",
}).add({
   targets: "#chest-screen",
   translateX:-2,
   duration: 500,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#right-arm",
   translateX:-5,
   duration: robotTurnDur,
   easing: "linear",
}, "-="+robotTurnDur).add({
   targets: "#left-arm",
   translateX:5,
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).add({//arm into first position
   targets: "#bot-part-r",
   rotate: 180,
   duration: robotTurnDur,
   easing: "linear",
}).add({
   targets: '#top-part-r',
   rotate: "+=90",
   duration: robotTurnDur,
   easing: "linear",
}).add({
   targets: "#bot-part-r",
   rotate: 90,
   translateX: 0,
   translateY: 0,
   duration: robotTurnDur,
   easing: "linear",
},"-=" + robotTurnDur).add({
   targets: "#bot-part-l",
   translateX: 0,
   translateY: 0.5,
   duration: robotTurnDur,
   easing: "linear",
},"-="+(robotTurnDur*2)).add({
   targets: "#top-part-l",
   rotate: "-=90",
   duration: robotTurnDur,
   easing: "linear",
},"-="+(robotTurnDur*2)).add({
   targets: "#bot-part-l",
   rotate: "+=90",
   duration: robotTurnDur,
   easing: "linear"
},"-="+robotTurnDur).add({//Robot start turning again
   targets: "#robot-body-box",
   scaleX: 1,
   duration: robotTurnDur,
   easing: "linear"
}).add({
   targets: "#chest-screen",
   translateX:"+=2",
   duration: 500,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#top-part-r, #bot-part-r",
   translateX:"+=5",
   duration: robotTurnDur,
   easing: "linear",
}, "-="+robotTurnDur).add({
   targets: "#left-arm",
   translateX:"-=5",
   duration: robotTurnDur,
   easing: "linear", //What left? scale the bot part of both arms to make turn illusion
},"-="+robotTurnDur).add({
   targets: "#wrapper-bot-l",
   scaleX: 0.4,
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#wrapper-bot-r",
   scaleX: 0.4,
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#bot-part-r",
   translateX: "+=116.8",
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).finished.then(()=>{
  let robotBodyBox = document.getElementById("robot-body");
  let rightArm = robotBodyBox.children[2];
  let leftArm = robotBodyBox.children[0];
  robotBodyBox.prepend(rightArm);
  robotBodyBox.append(leftArm);
  let newTimeLine = anime.timeline({

  }).add({//Robot start turning to the other side
   targets: "#robot-body-box",
   scaleX: 0.7,
   duration: robotTurnDur,
   easing: "linear"
}).add({
   targets: "#chest-screen",
   translateX: 2,
   duration: 500,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#top-part-r, #bot-part-r",
   translateX:"-=5",
   duration: robotTurnDur,
   easing: "linear",
}, "-="+robotTurnDur).add({
   targets: "#left-arm",
   translateX:"+=5",
   duration: robotTurnDur,
   easing: "linear", 
},"-="+robotTurnDur).add({
   targets: "#wrapper-bot-r",
   scaleX: 1,
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#bot-part-r",
   translateX: "-=112",
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#wrapper-bot-l",
   scaleX: 1,
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur).add({
   targets: "#bot-part-l",
   translateX: "+=5.5",
   duration: robotTurnDur,
   easing: "linear",
},"-="+robotTurnDur);
})
//pulse loop
let pulsePath = anime.timeline({
   loop: true,
}).add({
   delay: delayDur*1.3,
   targets: "#pulse-path",
   duration: lightningPathDur*4,
   easing: "easeOutQuad",
   strokeDashoffset: [anime.setDashoffset,0],
}).add({
   targets: "#pulse-path",
   duration: lightningPathDur*4,
   easing: "easeOutQuad",
   strokeDashoffset: -31,
})
//eye dizzy
let dizzyEyes = anime.timeline({
   loop: true,
}).add({
   targets: "#eye-dizzy path",
   rotate: 360,
   duration: 1000,
   easing: "linear"
})
let stopAllIdleAnimation = () => {
   ballSqueeze.pause();
   flowerTimeline.pause();
   cameraLoop.pause();
   pathlace4.pause();
}
document.getElementById("play").addEventListener("click", ()=>{
   stopAllIdleAnimation();
   shoeMoveAlong.play();
   robotMoveAlong.play();
   vaseMoveAlong.play();
   ballMoveAlong.play();
   cameraMoveAlong.play();
})

