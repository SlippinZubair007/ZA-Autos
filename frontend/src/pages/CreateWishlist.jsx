
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useWishlistManager } from "../store/Wishlist";
  import ImageDisplay from "../components/ui/CollectPage";

  const CreateWishlist = () => {
    const [form, setForm] = useState({
      car_id: "",
    });
  
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
  
    const { createWishlistItem } = useWishlistManager();
  
    const handleSubmit = async () => {
      const user_id = localStorage.getItem("user_id");
  
      if (!user_id) {
        setMessage("User not logged in.");
        setMessageType("error");
        return;
      }
  
      const { success, message } = await createWishlistItem({
        user_id,
        car_id: form.car_id,
      });
  
      setMessage(message);
      setMessageType(success ? "success" : "error");
  
      if (success) {
        setForm({ car_id: "" });
      }
  
      setTimeout(() => {
        setMessage("");
        setMessageType("info");
      }, 3000);
    };
  
    return (
      <ImageDisplay>
      <Container maxW="container.sm" top="50" mt="50px">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" top="50" textAlign="center"   fontFamily="'Inter', sans-serif" fontSize="32px">
            Add to Wishlist
          </Heading>
  
          <Box
            w="full"
            bg={useColorModeValue("white", "black")}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Car ID</FormLabel>
                <Input
                  placeholder="Car ID"
                  value={form.car_id}
                  onChange={(e) =>
                    setForm({ ...form, car_id: e.target.value })
                  }
                />
              </FormControl>
              <Button colorScheme="teal" onClick={handleSubmit} w="full">
                Add to Wishlist
              </Button >
              {message && (
                <Text
                  mt={4}
                  color={messageType === "success" ? "green.500" : "red.500"}
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {message}
                </Text>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>
      </ImageDisplay>
    );
  };
  
  export default CreateWishlist;
  