const validateImage = (file, maxWidth) => {
  const URL = window.URL || window.webkitURL
  return new Promise(resolve => {
    const image = new Image()
    image.onerror = () => resolve({ valid: false })
    image.onload = () => resolve({
      valid: image.width <= Number(maxWidth)
    })
    image.src = URL.createObjectURL(file)
  })
}

const validator = {
  messages: {
    en: (field, [maxWidth]) => {
      return 'The ' + field + ' field must be at most ' + maxWidth + ' pixels wide.'
    },
    pt_br: (field, [maxWidth]) => {
      return 'O campo ' + field + ' deve ter no máximo ' + maxWidth + ' pixels de largura.'
    }
  },
  validate (files, [maxWidth]) {
    const list = []
    for (let i = 0; i < files.length; i++) {
      if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, maxWidth)))
  }
}

export default validator
