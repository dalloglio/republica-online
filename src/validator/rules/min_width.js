const validateImage = (file, minWidth) => {
  const URL = window.URL || window.webkitURL
  return new Promise(resolve => {
    const image = new Image()
    image.onerror = () => resolve({ valid: false })
    image.onload = () => resolve({
      valid: image.width >= Number(minWidth)
    })
    image.src = URL.createObjectURL(file)
  })
}

const validator = {
  messages: {
    en: (field, [minWidth]) => {
      return 'The ' + field + ' field must be at least ' + minWidth + ' pixels wide.'
    },
    pt_br: (field, [minWidth]) => {
      return 'O campo ' + field + ' deve ter pelo menos ' + minWidth + ' pixels de largura.'
    }
  },
  validate (files, [minWidth]) {
    const list = []
    for (let i = 0; i < files.length; i++) {
      if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, minWidth)))
  }
}

export default validator
