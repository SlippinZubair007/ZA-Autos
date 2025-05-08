import React from 'react';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  Container,
  Flex,
  Box,
  Button,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import {CustomMenu ,ProfileMenu} from '../components/ui/Menu'; 
import CartIcon from '../components/ui/CartIcon'; // Assuming you have a CartIcon component
const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW="container.xl" p="4" bg="black" color="black" position="relative">

      <Flex align="center" justify="space-between" position="relative">
        
        <Box w="100px"/>

        <Link to="/">
        <Box
          position="relative"
          left="80%"
          transform="translateX(-50%)"
          fontFamily="VT323"
          color="white"
          fontSize="2xl"
          fontWeight="bold"
        >
         - ZA    A U T O -
        </Box>
        </Link>

        <HStack spacing={4}>
          <Button onClick ={toggleColorMode} size="sm">
          <Box
           bg={colorMode === "light" ? "white" : "black"}
           borderRadius="full"
           >
          {colorMode === "light" ? <FaMoon color="black" /> : <MdOutlineWbSunny color="white" />}
          </Box>
          </Button>
        
        
          <Button bg="black" color="white" size="10ptx" variant="outline">
          <ProfileMenu/>
          </Button>
          <Button size="sm">
            <CartIcon />
          </Button>

        
          <Box   
          left="0%"
          position="absolute"
          >
          <CustomMenu/>
          </Box>


        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
