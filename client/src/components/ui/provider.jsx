import { ChakraProvider } from '@chakra-ui/react'
//import { ColorModeProvider } from './color-mode'
import theme from '../../theme/index.js'

export function Provider(props) {
  return (
    <ChakraProvider theme={theme}>
      {props.children}
    </ChakraProvider>
  )
}
