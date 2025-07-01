import React, { useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Textarea, Button, useColorModeValue, Center } from '@chakra-ui/react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', organization: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const bg = useColorModeValue("gray.50", "gray.900");
  const text = useColorModeValue("gray.800", "gray.100");

  const handleChange = e => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch (err) {
      alert('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <Flex direction="column" align="center" justify="start" height="100vh" bg={bg} color={text}>
      <h1>Drop me a line! I'd love to connect about potential work, tech, or to answer any questions you might have!</h1>
      <form onSubmit={handleSubmit}>
        <FormControl width={{base: 'sm', md: 'lg', xl: '2xl'}} mt={4}>
          <Center><FormLabel htmlFor="name">Name</FormLabel></Center>
          <Input id="name" value={form.name} onChange={handleChange} placeholder="How should I greet you?" />
          <br />
          <br />
          <Center><FormLabel htmlFor="organization">Organization</FormLabel></Center>
          <Input id="organization" value={form.organization} onChange={handleChange} placeholder="If this is about potential employment, for which company? Not required."/>
          <br />
          <br />
          <Center><FormLabel htmlFor="email">Email</FormLabel></Center>
          <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email address, so I may respond." />
          <br />
          <br />        
          <Center><FormLabel htmlFor="message">Message</FormLabel></Center>
          <Textarea id="message" value={form.message} onChange={handleChange} placeholder="Please leave your message here! I will get back to you as soon as I can." />
          <br />
          <br />        
          <Center>
            <Button mt={4} colorScheme="teal" type="submit" isLoading={loading}>
              Send Message
            </Button>
          </Center>
        </FormControl>
      </form>
      {sent && <Center mt={4} color="green.500">Message sent!</Center>}
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
  );
};

export default Contact;