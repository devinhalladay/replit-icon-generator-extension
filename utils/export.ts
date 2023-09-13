export function downloadSvgFile(svgElement, filename = "export.svg") {
  const serializer = new XMLSerializer();
  const svgData = serializer.serializeToString(svgElement);
  const dataUrl =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
  downloadURI(dataUrl, filename);
}

export async function downloadImageFile(
  svgElement,
  filename = "export.png",
  targetWidth = 512,
  targetHeight = 512
) {
  // alert('downloading')
  const dataUrl = await getDataUrlFromSvg(svgElement, targetWidth, targetHeight);
  downloadURI(dataUrl, filename);
}

export async function svgToBlob(svgElement, targetWidth, targetHeight) {
  // we just want to return the blob so I can save a file elsewhere
  const svgData = await getDataUrlFromSvg(svgElement, targetWidth, targetHeight);
  const blob = await fetch(svgData).then((res) => res.blob());
  return blob;
}

export async function getDataUrlFromSvg(svg, targetWidth = 24, targetHeight = 24) {
  const xml = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.width = targetWidth * 2;
  img.height = targetHeight * 2;
  img.src = svgUrl;
  await new Promise((resolve) => (img.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth * 2;
  canvas.height = targetHeight * 2;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, targetWidth * 2, targetHeight * 2);
  ctx.scale(2,2)

  return canvas.toDataURL("image/png", 1);
}

export function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }

function downloadURI(uri, name) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadFiles({symbolSvgElement, iconSvgElement, baseFileName = "export"}) {
  // Export SVG
  downloadSvgFile(symbolSvgElement, `${baseFileName}.svg`);

  // Delay the PNG export to bypass the browser's download limitations
  setTimeout(async () => {
    // Export PNG
    await downloadImageFile(iconSvgElement, `${baseFileName}.png`);
  }, 2000); // delay of 1 second
}
