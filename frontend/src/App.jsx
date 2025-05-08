import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuctionPage from "./pages/AuctionPage";
import Navbar from "./comp/Navbar";
import CollectionPage from "./pages/CollectionPage";
import SignUp from "./pages/SignupPage";
import Login from "./pages/Login";
import WishlistSection from "./pages/WishlistPage";
function App() {
  const location = useLocation();
  return (
    <Box minH="100000vh" bg={useColorModeValue("white", "black")}>
      <Navbar />  
      <Routes>
        <Route path="/collection" element={<CollectionPage />}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/Auction" element={<AuctionPage />}/>
        <Route path="/Register" element={<SignUp/>}/>  
        <Route path="/Login" element={<Login/>}/>
        <Route path="/wish" element={<WishlistSection />} />
      </Routes>
    </Box>
  );
}

export default App;
