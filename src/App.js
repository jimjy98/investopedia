import * as React from "react"

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"
import Landing from './Views/Landing'


function App() {
 return (
    <ChakraProvider>
      <Landing />
   </ChakraProvider>
 )
}

export default App;
