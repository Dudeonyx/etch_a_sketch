const etchbox = document.querySelector('.etchbox');
let etchPadSize = 40;
let mode;
let colorMode;
const paragraph = document.querySelector('#state');
const button = document.querySelector('#erase');
button.onclick = () => {
    mode = 2;
    paragraph.textContent = 'ERASER MODE';
};
const reset = document.querySelector('#reset');
reset.onclick = () => {
    start();
  
};
const setEtchpadSize = document.querySelector('#submit');
setEtchpadSize.onclick = () => {
    let newsize = Number(document.querySelector('#input').value);
    if (!newsize) {return "OOPS";}
    etchPadSize = newsize;
    console.log(etchPadSize);
    start();
    document.querySelector('#input').value = '';
}
function createEtchPad() {
  etchbox.innerHTML = '';
  for (let i = 0; i < etchPadSize; i++) {
    const verticalDiv = document.createElement('div');
    for (let j = 0; j < etchPadSize; j++) {
      const horizontalDiv = document.createElement('div');
      horizontalDiv.classList.add('pixel');
      verticalDiv.appendChild(horizontalDiv);
    }
    etchbox.appendChild(verticalDiv);
  }
}
function start() {
  mode = 0;
  paragraph.textContent = 'OFF';
  createEtchPad();
  const gridSizeDisplay = document.querySelector('#gridsize');
  gridSizeDisplay.textContent = `${etchPadSize} X ${etchPadSize}`
  const pixels = document.querySelectorAll('.pixel');
  // console.dir(pixels);
  pixels.forEach((pixel) => {
      pixel.addEventListener('mouseover', colorPixel);
      pixel.addEventListener('click', (e) => {
          if (mode === 1) {
              mode = 0;
              paragraph.textContent = 'OFF';
            } else {
                mode = 1;
                paragraph.textContent = 'ON';
            }
        });
    });
    const gridCheck = document.querySelector('#grid');
    gridCheck.addEventListener('click',(evt)=>{
        if (gridCheck.checked) {
            etchbox.classList.add('border');
        } else {
            etchbox.classList.remove('border');
        }
      });
    const colorCheck = document.querySelector('#checkcolor');
    const colorState = document.querySelector('#colorstate');
    colorCheck.addEventListener('click',(evt)=>{
      if (colorCheck.checked) {
          colorMode = 1;
          colorState.textContent = 'RANDOM';
        } else {
            colorMode = 0;
            colorState.textContent = 'BLACK & WHITE';
      }
    });
    function colorPixel(pixel) {
        // console.dir(pixel);
        if (mode === 1 && !colorMode) {
                pixel.target.setAttribute(`style`,`background: black`);
            } else if (mode === 1  && colorMode) {
            if (!pixel.target.getAttribute('style')) {
                pixel.target.setAttribute(`style`,`background: ${randomColor()}`);
            }
        } else if (mode === 2) pixel.target.removeAttribute(`style`);
    }
}
start();
function randomColor() {
    let set = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','F','D','C','B','A','9','8','7','6','5','4','3','2','1','0'];
    let colorCode = '#';
    for (let i = 0; i < 6; i++) {
        colorCode += set[Math.floor(Math.random()*set.length)];
    }
    return colorCode;
}
