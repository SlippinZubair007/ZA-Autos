import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCarStore } from "../store/Auctioncars";

const CreateAuctionPage = () => {
  const [newCar, setNewCar] = useState({
    model: "",
    price: "",
    image: "",
    brand_id: "",
    year: "",
  });

  const [message, setMessage] = useState(""); // For showing error or success message
  const [messageType, setMessageType] = useState("info"); // For styling the message

  const { createCar } = useCarStore();

  const handleAddCar = async () => {
    const { success, message } = await createCar(newCar);
    setMessage(message); 
    setMessageType(success ? "success" : "error"); 

    if (success) {
      setNewCar({
        model: "",
        price: "",
        image: "",
        brand_id: "",
        year: "",
      });
    }
  };

  return (
    <Container maxw={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Car
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <FormControl isRequired>
              <Input
                placeholder="Year"
                value={newCar.year}
                onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
              />
              <Input
                placeholder="Model"
                value={newCar.model}
                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              />
              <Input
                placeholder="Price"
                type="number"
                value={newCar.price}
                onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={newCar.image}
                onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
              />
              <Input
                placeholder="Brand ID"
                type="number"
                value={newCar.brand_id}
                onChange={(e) => setNewCar({ ...newCar, brand_id: e.target.value })}
              />
            </FormControl>

            <Button colorScheme="teal" onClick={handleAddCar} w={"full"}>
              Create Car
            </Button>

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
  );
};

export default CreateAuctionPage;
