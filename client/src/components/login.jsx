  import React from "react";
  import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
  import { useColorMode, useColorModeValue } from "./ui/color-mode";
  import { Link, useLocation } from "react-router-dom";
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const DrawerSwitch = () => {
    const {
      isOpen: isFirstOpen,
      onOpen: onFirstOpen,
      onClose: onFirstClose,
    } = useDisclosure();
    const {
      isOpen: isSecondOpen,
      onOpen: onSecondOpen,
      onClose: onSecondClose,
    } = useDisclosure();

    const switchToRegister = () => {
      onFirstClose();
      setTimeout(onSecondOpen, 300); // Delay to allow the first drawer to close
    };

    const switchToLogin = () => {
      onSecondClose();
      setTimeout(onFirstOpen, 300)
    };
  } 

  const loggedInButtons = () => {
    return (
    <>
        <Button onClick={logout()} >Logout</Button>
    </>
    )
  };

  const guestButtons = () => {
    return (
      <>
        <Button colorScheme="teal" variant="solid" size="sm" ref={btnRef} onClick={onOpen}>
          Login / Register
        </Button>
        
        <Drawer isOpen={isFirstOpen} placement="right" onClose={onFirstClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
            <DrawerCloseButton/>
            <DrawerHeader>
              Login to your account to take full advantage of the site.
            </DrawerHeader>

            <DrawerBody>
              <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Username" />
              <Input placeholder="Password" />
              <Button>Login</Button>
              </FormControl>
              <Button onClick="onClose"></Button>
            </DrawerBody>
        </Drawer>

        <Drawer isOpen={isSecondOpen} placement="right" onClose={onSecondClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerCloseButton />
          <DrawerHeader>
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Input placeholder="Username" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Input placeholder="Name (optional)"/>
            Button onClick={/* API call to server/MongoDB to create new user*/}
            <Button onClick={switchToLogin}>Already have an account? Login</Button>
          </DrawerBody>
        </Drawer>
      </>
    );
  };
