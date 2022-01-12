import {keysDev} from './keys-dev'
import {keysTest} from './keys-test'
import {TKeys} from './typedf'

let keys: TKeys

if (process.env.NODE_ENV === 'test') {
  keys = keysTest
} else {
  keys = keysDev
}

export default keys
