const validateImage = (file, maxHeight) => {
  const URL = window.URL || window.webkitURL
  return new Promise(resolve => {
    const image = new Image()
    image.onerror = () => resolve({ valid: false })
    image.onload = () => resolve({
      valid: image.height <= Number(maxHeight)
    })
    image.src = URL.createObjectURL(file)
  })
}

const validator = {
  messages: {
    en: (field, [maxHeight]) => {
      return 'The ' + field + ' field must be at least ' + maxHeight + ' pixels high.'
    },
    pt_br: (field, [maxHeight]) => {
      return 'O campo ' + field + ' deve ter no máximo ' + maxHeight + ' pixels de altura.'
    }
  },
  validate (files, [maxHeight]) {
    const list = []
    for (let i = 0; i < files.length; i++) {
      if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, maxHeight)))
  }
}

export default validator
