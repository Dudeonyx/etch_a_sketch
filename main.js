const etchbox = document.querySelector('.etchbox');
let etchPadSize = 40;
let mode;
const paragraph = document.querySelector('p');
const button = document.querySelector('#erase');
button.onclick = () => {
    mode = 2;
    paragraph.textContent = 'OFF';
};
const reset = document.querySelector('#reset');
reset.onclick = () => {
    start();
  
};
const submit = document.querySelector('#submit');
submit.onclick = () => {
    let newsize = document.querySelector('#input').value;
    etchPadSize = newsize;
    console.log(etchPadSize);
    start();
}
function start() {
  mode = 0;
  paragraph.textContent = 'OFF';
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
  createEtchPad();
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
    function colorPixel(pixel) {
        // console.dir(pixel);
        if (mode === 1) {
            pixel.target.classList.add('black');
        } else if (mode === 2) pixel.target.classList.remove('black');
    }
}
start();
