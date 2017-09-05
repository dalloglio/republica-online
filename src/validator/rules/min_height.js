const validateImage = (file, minHeight) => {
  const URL = window.URL || window.webkitURL
  return new Promise(resolve => {
    const image = new Image()
    image.onerror = () => resolve({ valid: false })
    image.onload = () => resolve({
      valid: image.height >= Number(minHeight)
    })
    image.src = URL.createObjectURL(file)
  })
}

const validator = {
  messages: {
    en: (field, [minHeight]) => {
      return 'The ' + field + ' field must be at least ' + minHeight + ' pixels high.'
    },
    pt_br: (field, [minHeight]) => {
      return 'O campo ' + field + ' deve ter pelo menos ' + minHeight + ' pixels de altura.'
    }
  },
  validate (files, [minHeight]) {
    const list = []
    for (let i = 0; i < files.length; i++) {
      if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, minHeight)))
  }
}

export default validator
