window.onload = () => {
   document.querySelector(".front-page .image-container img").style.transform = "translateX(0)";
   let typewriter = document.querySelectorAll('#typewriter')[1];
   let typewriter2 = document.querySelectorAll('#typewriter')[2];
   let runCodeAnimation = true;

   function setupTypewriter(t) {
      let HTML = t.innerHTML;
      t.innerHTML = "";
      let cursorPosition = 0,
          tag = "",
          writingTag = false,
          tagOpen = false,
          typeSpeed = 10,
        tempTypeSpeed = 0;

      let type = function() {
        
          if (writingTag === true) {
              tag += HTML[cursorPosition];
          }
          if (HTML[cursorPosition] === "<") {
              tempTypeSpeed = 0;
              if (tagOpen) {
                  tagOpen = false;
                  writingTag = true;
              } else {
                  tag = "";
                  tagOpen = true;
                  writingTag = true;
                  tag += HTML[cursorPosition];
              }
          }
          if (!writingTag && tagOpen) {
              tag.innerHTML += HTML[cursorPosition];
          }
          if (!writingTag && !tagOpen) {
              if (HTML[cursorPosition] === " ") {
                  tempTypeSpeed = 0;
              }
              else {
                  tempTypeSpeed = (Math.random() * typeSpeed) + 50;
              }
              t.innerHTML += HTML[cursorPosition];
          }
          if (writingTag === true && HTML[cursorPosition] === ">") {
              tempTypeSpeed = (Math.random() * typeSpeed) + 50;
              writingTag = false;
              if (tagOpen) {
                  let newSpan = document.createElement("span");
                  t.appendChild(newSpan);
                  newSpan.innerHTML = tag;
                  tag = newSpan.firstChild;
              }
          }
          cursorPosition += 1;
          if (cursorPosition < HTML.length - 1) {
              setTimeout(type, tempTypeSpeed);
          }
      };

      return {
          type: type
      };
  }

  window.onscroll = function() {
     if(window.scrollY > 350 && runCodeAnimation ) {
        runCodeAnimation = false;
         typewriter = setupTypewriter(typewriter);
         typewriter2 = setupTypewriter(typewriter2);
         typewriter.type();
         typewriter2.type();
     }
  }
};