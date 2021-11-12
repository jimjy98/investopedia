import React from 'react'
import {
    ChakraProvider,
    Text
} from '@chakra-ui/react'


const Landing = () => (
    <ChakraProvider resetCSS>
        <Text color="#369A57" fontSize={72} textAlign="center">
            See, Hear, Invest!
        </Text>
        <Text textAlign="center" fontSize={40} color="#369A57">
            Select Experience Level:
        </Text>
    </ChakraProvider>
)

export default Landing