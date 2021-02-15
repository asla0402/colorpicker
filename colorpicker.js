"use strict";

window.addEventListener("load", start);

let colorInput;
let hexText;
let rgbText;
let hslText;

function start() {
  colorInput = document.querySelector("#color_input");
  colorInput.addEventListener("input", changeColor);

  hexText = document.querySelector("#txt1");
  rgbText = document.querySelector("#txt2");
  hslText = document.querySelector("#txt3");
}

function changeColor() {
  let hex = colorInput.value;
  hexText.innerHTML = "HEX: " + hex;

  let rgb = convertHexToRgb(hex);
  rgbText.innerHTML = "RGB: " + rgb.r + "," + rgb.g + "," + rgb.b;

  let hsl = convertRgbToHsl(rgb.r, rgb.g, rgb.b);
  hslText.innerHTML = "HSL: " + hsl.h.toFixed(2) + ", " + hsl.s.toFixed(2) + "%" + ", " + hsl.l.toFixed(2) + "%";

  document.body.style.backgroundColor = hex;
}

function convertHexToRgb(color) {
  const first = color.substring(1, 3);
  const second = color.substring(3, 5);
  const third = color.substring(5, 7);

  //hex to rgb "c0ffee"
  let r = Number.parseInt(first, 16);
  let g = Number.parseInt(second, 16);
  let b = Number.parseInt(third, 16);

  return { r, g, b };
}

function convertRgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  return { h, s, l };
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
}
