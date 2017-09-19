import { Validator } from 'vee-validate'

import cnpj from './rules/cnpj'
import cpf from './rules/cpf'
import telefone from './rules/telefone'
import celular from './rules/celular'
import cep from './rules/cep'
import minWidth from './rules/min_width'
import minHeight from './rules/min_height'
import maxWidth from './rules/max_width'
import maxHeight from './rules/max_height'

Validator.extend('cnpj', cnpj)
Validator.extend('cpf', cpf)
Validator.extend('telefone', telefone)
Validator.extend('celular', celular)
Validator.extend('cep', cep)
Validator.extend('min_width', minWidth)
Validator.extend('min_height', minHeight)
Validator.extend('max_width', maxWidth)
Validator.extend('max_height', maxHeight)
