let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayScale");
let blur = document.getElementById("blur");
let HueRotate = document.getElementById("hue-rotate");
let upload = document.getElementById("upload");
let download = document.getElementById("download");
let Reset = document.querySelector("span");
let img = document.getElementById("img");
let imgBox = document.querySelector(".img-box");
let ul = document.querySelector("ul");
let container = document.querySelector(".container");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  Reset.style.display = "none";
  imgBox.style.display = "none";
  ul.style.display = "none";
};
upload.onchange = function () {
  container.style.height = " auto";
  resetValue();
  ul.style.display = "block";
  download.style.display = "block";
  Reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};
let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayScale(${grayScale.value})
    blur(${blur.value}px)
    hue-rotate(${HueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});
function resetValue() {
  img.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayScale.value = "0";
  blur.value = "0";
  HueRotate.value = "0";
}
download.onclick = function () {
  download.href = canvas.toDataURL("image/jpeg");
};
