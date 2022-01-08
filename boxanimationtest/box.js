    const path2String = "m 45.725651,211.67687 28.677664,-14.87371 53.303615,26.5272 -28.677667,14.87371";
   const path1String = "45.631926,211.75474 -26.695848,13.28552 53.303612,26.5272 26.695848,-13.28552";
   const path2 = path2String.replace(",", " ");
   const path3String = "m 45.631926,211.75474 0.102664,-14.87371 53.30361,26.5272 -0.102662,14.87371";
   const path1 = path1String.replace(",", " ");
   const path = anime.path("#path34");
   var animes = [];
   var objects = ["ball","camera"];
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
         var dapath = pathSVG.querySelector("path");
         let pathAnimeObj = anime.path("#"+dapath.getAttribute("id"));
         var pathStartCord = dapath.getAttribute("d").split(" ")[1].split(","); //0 for x 1 for y
         var moveByLeft = pathLeftOffset + parseInt(pathStartCord[1]) - obj.offsetWidth;
         var moveByTop =  obj.offsetHeight *  0.5 * -1;
         obj.style.left = moveByLeft + "px";
         obj.style.top =  moveByTop + "px";
         let daAnime = anime({
         targets: "#"+objName,
         translateX: pathAnimeObj('x'),
         translateY: pathAnimeObj('y'),
         //rotate: pathAnimeObj("angle"),
         easing: "easeInOutCubic",
         duration: "3000",
         autoplay:false
         });
         if(i === listOfObject.length - 1){
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
         animes.push(daAnime);
      }
   }
   let ballPath = anime.path('#ball-path');
   let ballMoveAlong = anime({
       targets: "#ball",
       translateX:  ballPath('x'),
       translateY: ballPath('y'),
       rotate: ballPath('angle'),
       easing: "linear",
       duration: 10000,
       loop: true
   })
   closeTheBox();