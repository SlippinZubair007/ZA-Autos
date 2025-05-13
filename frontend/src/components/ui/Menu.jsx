import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react';
  import { IoMdMenu } from "react-icons/io";
  import { Link } from 'react-router-dom';
  import { PiCarProfileThin } from "react-icons/pi";

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
        <PiCarProfileThin />
        </MenuButton>
        <MenuList>
          <Link to="/UpdateProfile">
          <MenuItem>Profile</MenuItem>
          </Link>
          <Link to="/Register">
           <MenuItem>Sign Up</MenuItem>
          </Link>
          <Link to="/Login">
          <MenuItem>Login</MenuItem>
          </Link>
          <Link to ="/review">
          <MenuItem>Rate</MenuItem>
          </Link>
          <Link to="/CreateWish">
          <MenuItem>Wish</MenuItem>
          </Link>
          <Link to ="/Logout">
          <MenuItem>Logout</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    );
  };
  
  export {CustomMenu,ProfileMenu};
  