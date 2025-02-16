const canvas = document.getElementById("colorWheelCanvas");
const ctx = canvas.getContext("2d");
const colorValue = document.getElementById("colorValue");
const displayColorValue = document.getElementById("displayColorValue");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const displayCode = document.getElementById("displayCode");

function resizeCanvas() {
  const container = document.querySelector(".color-wheel-container");
  const size = Math.min(container.clientWidth, container.clientHeight);
  canvas.width = size;
  canvas.height = size;
  drawColorWheel(size);
}

function drawColorWheel(size) {
  const radius = size / 2;
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let y = -radius; y < radius; y++) {
    for (let x = -radius; x < radius; x++) {
      const angle = Math.atan2(y, x);
      const distance = Math.sqrt(x * x + y * y);

      if (distance <= radius) {
        const hue = ((angle * 180) / Math.PI + 180) / 360;
        const saturation = distance / radius;
        const rgb = hsvToRgb(hue, saturation, 1);

        const px = x + radius + (y + radius) * size;
        data[px * 4] = rgb[0];
        data[px * 4 + 1] = rgb[1];
        data[px * 4 + 2] = rgb[2];
        data[px * 4 + 3] = 255;
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToHex(h, s, l) {
  function f(n) {
    let k = (n + h / 30) % 12;
    let a = s * Math.min(l, 1 - l);
    let color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(color * 255)
      .toString(16)
      .padStart(2, "0");
  }
  return `#${f(0)}${f(8)}${f(4)}`;
}

function adjustLightness(hex, factor) {
  let [h, s, l] = hexToHsl(hex);
  l = Math.min(1, Math.max(0, l + factor));
  return hslToHex(h, s, l);
}

function getColorAtPixel(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const imageData = ctx.getImageData(x, y, 1, 1).data;

  if (imageData[3] > 0) {
    const hexColor = `#${imageData[0]
      .toString(16)
      .padStart(2, "0")}${imageData[1]
      .toString(16)
      .padStart(2, "0")}${imageData[2].toString(16).padStart(2, "0")}`;
    return hexColor;
  }
  return null;
}

function getComplementaryColors(hex) {
  let [h, s, l] = hexToHsl(hex);
  let comp1 = (h + 150) % 360; // First complementary color (adjusted)
  let comp2 = (h + 210) % 360; // Second complementary color (adjusted)
  return [hslToHex(comp1, s, l), hslToHex(comp2, s, l)];
}

canvas.addEventListener("click", (event) => {
  const color = getColorAtPixel(event);
  if (color) {
    console.log("Selected Color:", color);
    const [compColor1, compColor2] = getComplementaryColors(color);

    displayColorValue.textContent = color;
    displayColorValueLight.textContent = compColor1;
    displayColorValueDark.textContent = compColor2;
    c1.style.backgroundColor = compColor1;
    c2.style.backgroundColor = color;
    c3.style.backgroundColor = compColor2;

    displayCode.textContent = `:root {
    --clr-black: #000000;
    --clr-black-light: #222222;
    --clr-white-dark: #eeeeee;
    --clr-white: #ffffff;
    --clr-comp1: ${compColor1};
    --clr-main: ${color};
    --clr-comp2: ${compColor2};
    }`;
  }
});




// canvas.addEventListener("click", (event) => {
//   const color = getColorAtPixel(event);
//   if (color) {
//     console.log("Selected Color:", color);
//     colorLight = adjustLightness(color, 0.15); // 15% lighter
//     colorDark = adjustLightness(color, -0.15); // 15% darker

//     displayColorValue.textContent = color;
//     displayColorValueLight.textContent = colorLight;
//     displayColorValueDark.textContent = colorDark;
//     c1.style.backgroundColor = colorLight;
//     c2.style.backgroundColor = color;
//     c3.style.backgroundColor = colorDark;

//     displayCode.textContent = `:root {
//     --clr-black: #000000;
//     --clr-black-light: #222222;
//     --clr-white-dark: #eeeeee;
//     --clr-white: #ffffff;
//     --clr-shade-light: ${colorLight};
//     --clr-shade: ${color};
//     --clr-shade-dark: ${colorDark};
//     }`;
//   }
// });

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
