import { Flex, FormControl, FormLabel, Input, Textarea, Button, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Contact = () => {

  const bg = useColorModeValue("gray.50", "gray.900");
  const text = useColorModeValue("gray.800", "gray.100");

  return (
    <Flex direction="column" align="center" justify="start" height="100vh" bg={bg} color={text}>
      <h1>Drop me a line! I'd love to connect about potential work, tech, or to answer any questions you might have!</h1>
      <FormControl width={{base: 'sm', md: 'lg', xl: '2xl'}} mt={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" placeholder="How should I greet you?" />
        <br />
        <br />
        <FormLabel htmlFor="organization">Organization</FormLabel>
        <Input id="organization" placeholder="If this is about potential employment, for which company? Not required."/>
        <br />
        <br />
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" placeholder="Your Email address, so I may respond." />
        <br />
        <br />        
        <FormLabel htmlFor="message">Message</FormLabel>
        <Textarea id="message" placeholder="Please leave your message here! I will get backto you as soon as I can." />
        <br />
        <br />        
        <Button mt={4} colorScheme="teal" type="submit">
          Send Message
        </Button>
      </FormControl>
        <br />
        <hr width="100%"/>
      {/* LinkedIn and GitHub links */}
      <Flex mt={4} gap={4}>
        <Button as="a" href="https://www.linkedin.com/in/alexander-shegstad/" target="_blank" colorScheme="blue">
          LinkedIn
        </Button>
        <Button as="a" href="https://github.com/AMShegstad" target="_blank" colorScheme="gray">
          GitHub
        </Button>
      </Flex>
    </Flex>
  )
};

export default Contact;