

export const getSVGStyles = (width) => {
  if (width > 700 && window.screen.orientation.type == "portrait-primary") {
    return { newRadi: 245, newHw: 500, newXy: 250 }
  } else {
    return { newRadi: 145, newHw: 300, newXy: 150 }
  }
}