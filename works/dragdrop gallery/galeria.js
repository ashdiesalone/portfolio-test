'use strict';

// const archivo = document.getElementById('archivo');
// archivo.addEventListener('change', (e) => {
//   leerArchivo(archivo.files)
// })

// const leerArchivo = ar => {
//   for (let i = 0; i < ar.length; i++) {
//     const reader = new FileReader();
//     reader.readAsDataURL(ar[i]);
//     reader.addEventListener('load', (e) => {
//       let newImg = `<img src='${e.currentTarget.result}'>`;
//       document.querySelector('.resultado').innerHTML += newImg;
//     })
//   }
// }

const imagen = document.querySelector('.zona-imagen');
imagen.addEventListener('dragover', (e) => {
  e.preventDefault();
  changeStyle(e.target, '#222');
})

imagen.addEventListener('dragleave', (e) => {
  e.preventDefault();
  changeStyle(e.target, '#888');
})

imagen.addEventListener('drop', (e) => {
  e.preventDefault();
  changeStyle(e.target, '#888');
  // cargarArchivo(e.dataTransfer.files[0]);
  cargarImg(e.dataTransfer.files[0]);
})

const video = document.querySelector('.zona-video');
video.addEventListener('dragover', (e) => {
  e.preventDefault();
  changeStyle(e.target, '#222');
})

video.addEventListener('dragleave', (e) => {
  e.preventDefault();
  changeStyle(e.target, '#888');
})

video.addEventListener('drop', (e) => {
  e.preventDefault();
  changeStyle(e.target, '#888');
  // cargarArchivo(e.dataTransfer.files[0]);
  cargarVideo(e.dataTransfer.files[0]);
})

const changeStyle = (obj, color) => {
  obj.style.color = color;
  obj.style.border = `4px dashed ${color}`;
}

// const cargarArchivo = ar => {
//   const reader = new FileReader();
//   reader.readAsText(ar);
//   reader.addEventListener('load', (e) => {
//     document.querySelector('.resultado').textContent += e.currentTarget.result;
//   })
// }

const cargarImg = ar => {
  const reader = new FileReader();
  reader.readAsDataURL(ar);
  reader.addEventListener('load', (e) => {
    let img = document.createElement('IMG');
    img.src = URL.createObjectURL(ar);
    document.querySelector('.resultado').appendChild(img);
  })
}

const cargarVideo = ar => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(ar);
  reader.addEventListener('progress', (e) => {
    let carga = Math.round(e.loaded / ar.size * 100);
    console.log(carga);
  })
  reader.addEventListener('load', (e) => {
    let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: 'video/mp4'});
    let url = URL.createObjectURL(video);
    let img = document.createElement('VIDEO');
    img.setAttribute('src', url)
    document.querySelector('.resultado').appendChild(img);
    img.play();
  })
}