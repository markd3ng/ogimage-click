import * as resvg from "@resvg/resvg-wasm"

const wasmPath = new URL("@resvg/resvg-wasm/index_bg.wasm", import.meta.url)
fetch(wasmPath).then((res) => resvg.initWasm(res))

self.onmessage = async (e) => {
  const { svg, width, format, _id } = e.data

  const renderer = new resvg.Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  })
  const image = renderer.render()

  let blob: Blob
  if (format === "webp" || format === "jpg") {
    // 创建离屏 Canvas 进行格式转换
    const canvas = new OffscreenCanvas(width, image.height)
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Failed to get canvas context")

    // 将 PNG buffer 转换为 ImageData
    const pngBuffer = image.asPng()
    const arrayBuffer = pngBuffer.buffer.slice(pngBuffer.byteOffset, pngBuffer.byteOffset + pngBuffer.byteLength) as ArrayBuffer
    const pngBlob = new Blob([arrayBuffer], { type: "image/png" })
    const pngBitmap = await createImageBitmap(pngBlob)

    // 绘制到 Canvas
    canvas.width = pngBitmap.width
    canvas.height = pngBitmap.height
    ctx.drawImage(pngBitmap, 0, 0)

    // 根据格式导出
    blob = await canvas.convertToBlob({
      type: format === "jpg" ? "image/jpeg" : "image/webp",
      quality: format === "jpg" ? 0.9 : undefined // JPG 格式设置质量
    })
  } else {
    const pngData = image.asPng()
    const arrayBuffer = pngData.buffer.slice(pngData.byteOffset, pngData.byteOffset + pngData.byteLength) as ArrayBuffer
    blob = new Blob([arrayBuffer], { type: "image/png" })
  }

  const url = URL.createObjectURL(blob)
  self.postMessage({ _id, url })
}