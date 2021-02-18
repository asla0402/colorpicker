"use strict";

window.addEventListener("load", start);

//globale variabler
let colorInput;
let hexText;
let rgbText;
let hslText;

let box1;
let box2;
let box3;
let box4;
let box5;

let filterSelect;

function start() {
  //variabel til selve html-farvepaletten
  colorInput = document.querySelector("#color_input");
  colorInput.addEventListener("input", showColor);

  //text-variabler for html txt-elementerne hvor rgb, hsl og hex værdien bliver vist
  hexText = document.querySelector("#txt3_1");
  rgbText = document.querySelector("#txt3_2");
  hslText = document.querySelector("#txt3_3");
  //box-variabler for html box-elementerne som farverne bliver vist i
  box1 = document.querySelector(".box1");
  box2 = document.querySelector(".box2");
  box3 = document.querySelector(".box3");
  box4 = document.querySelector(".box4");
  box5 = document.querySelector(".box5");
  //variabel til filtrering
  filterSelect = document.querySelector("#filter");
  filterSelect.addEventListener("input", showColor);
}

function showColor() {
  //variabler for formlen der står for at smide værdierne ind i tektboksene
  let hex = colorInput.value;
  hexText.innerHTML = "HEX: " + hex.toUpperCase();
  let rgb = convertHexToRgb(hex);
  rgbText.innerHTML = "RGB: " + rgb.r + ", " + rgb.g + ", " + rgb.b;
  let hsl = convertRgbToHsl(rgb.r, rgb.g, rgb.b);
  hslText.innerHTML = "HSL: " + hsl.h.toFixed(2) + ", " + hsl.s.toFixed(2) + "%" + ", " + hsl.l.toFixed(2) + "%";

  //filtrering af vores options, der siger hvilke funktioner der skal køres alt efter hvad der bliver klikket på
  if (filterSelect.value == "analogous") {
    // filter analog
    box1.style.backgroundColor = convertHslToAnalogous(hsl, -50);
    box2.style.backgroundColor = convertHslToAnalogous(hsl, -25);
    box3.style.backgroundColor = hex;
    box4.style.backgroundColor = convertHslToAnalogous(hsl, 25);
    box5.style.backgroundColor = convertHslToAnalogous(hsl, 50);
  } // filter monokramatisk
  else if (filterSelect.value == "monokramatisk") {
    box1.style.backgroundColor = convertHslToMonokramatisk(hsl, -20);
    box2.style.backgroundColor = convertHslToMonokramatisk(hsl, -10);
    box3.style.backgroundColor = hex;
    box4.style.backgroundColor = convertHslToMonokramatisk(hsl, 10);
    box5.style.backgroundColor = convertHslToMonokramatisk(hsl, 20);
  } // filter komplementær
  else if (filterSelect.value == "komplementaer") {
    box1.style.backgroundColor = convertHslToKomplementaer(hsl, -180);
    box2.style.backgroundColor = convertHslToKomplementaer(hsl, -110);
    box3.style.backgroundColor = hex;
    box4.style.backgroundColor = convertHslToKomplementaer(hsl, 70);
    box5.style.backgroundColor = convertHslToKomplementaer(hsl, 100);
  } // filter triad
  else if (filterSelect.value == "triad") {
    box1.style.backgroundColor = convertHslToTriad(hsl, 90);
    box2.style.backgroundColor = convertHslToTriad(hsl, 60);
    box3.style.backgroundColor = hex;
    box4.style.backgroundColor = convertHslToTriad(hsl, 120);
    box5.style.backgroundColor = convertHslToTriad(hsl, 150);
  } // filter compound
  else if (filterSelect.value == "compound") {
    box1.style.backgroundColor = convertHslToCompound(hsl, -180);
    box2.style.backgroundColor = convertHslToCompound(hsl, -110);
    box3.style.backgroundColor = hex;
    box4.style.backgroundColor = convertHslToCompound(hsl, 70);
    box5.style.backgroundColor = convertHslToCompound(hsl, 100);
  } // filter shades
  else if (filterSelect.value == "shades") {
    box1.style.backgroundColor = convertHslToShades(hsl, -50);
    box2.style.backgroundColor = convertHslToShades(hsl, -30);
    box3.style.backgroundColor = hex;
    box4.style.backgroundColor = convertHslToShades(hsl, 30);
    box5.style.backgroundColor = convertHslToShades(hsl, 50);
  }
}
//funktionerne for alle vores options i filtrereingen
function convertHslToAnalogous(hsl, value) {
  return adjustHslToHex(hsl, value, 0, 0);
}

function convertHslToMonokramatisk(hsl, value) {
  return adjustHslToHex(hsl, 0, value, value);
}

function convertHslToKomplementaer(hsl, value) {
  return adjustHslToHex(hsl, value, 0, 0);
}

function convertHslToTriad(hsl, value) {
  return adjustHslToHex(hsl, 0, 0, value);
}

function convertHslToCompound(hsl, value) {
  return adjustHslToHex(hsl, value, 0, 0);
}

function convertHslToShades(hsl, value) {
  return adjustHslToHex(hsl, value, 0, 0);
}

//konverter HSL til HEX
function adjustHslToHex(hsl, hvalue, svalue, lvalue) {
  let h = (hsl.h + hvalue) % 360;
  let s = (hsl.s + svalue) % 100;
  let l = (hsl.l + lvalue) % 100;
  let rgb = hslToRgb({ h, s, l });
  let hex = rgbToHex(rgb);
  return hex;
}

//konverter HEX til RGB
function convertHexToRgb(color) {
  const first = color.substring(1, 3);
  const second = color.substring(3, 5);
  const third = color.substring(5, 7);

  let r = Number.parseInt(first, 16);
  let g = Number.parseInt(second, 16);
  let b = Number.parseInt(third, 16);

  return { r, g, b };
}

//konverter RGB til HEX
function rgbToHex(rgbObject) {
  const hexR = rgbObject.r.toString(16).padStart(2, "0");
  const hexG = rgbObject.g.toString(16).padStart(2, "0");
  const hexB = rgbObject.b.toString(16).padStart(2, "0");

  const hex = "#" + hexR + hexG + hexB;

  return hex;
}

//konverter HSL til RGB
function hslToRgb(hsl) {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}
//konverter RGB til HSL
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
