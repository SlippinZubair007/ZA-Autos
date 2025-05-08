import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react';
  import { IoMdMenu } from "react-icons/io";
  import { Link } from 'react-router-dom';
  import UserAvatar from './UserAvatar'; 
  const CustomMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} variant="outline" size="sm" bg="black" color="white">
        <IoMdMenu />
        </MenuButton>
        <MenuList>
          <MenuItem>Search</MenuItem>
          <Link to ="/collection">
          <MenuItem> ZA Collection</MenuItem>
          </Link>
          <Link to="/Auction">
           <MenuItem> Auction </MenuItem>
          </Link>
          <MenuItem>Top rated Cars</MenuItem>
          <Link to ="/wish">
          <MenuItem>Wishlist </MenuItem>
          </Link>
          <MenuItem> Contact Us </MenuItem>
        </MenuList>
      </Menu>
    );
  };
  
  const ProfileMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} variant="outline" size="sm" bg="black" color="white">
        <UserAvatar />
        </MenuButton>
        <MenuList>
          <MenuItem>Name</MenuItem>
          <MenuItem>Credentials</MenuItem>
          <Link to="/Register">
           <MenuItem>Sign Up</MenuItem>
          </Link>
          <Link to="/Login">
          <MenuItem>Login</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    );
  };
    
  export {CustomMenu,ProfileMenu};
  