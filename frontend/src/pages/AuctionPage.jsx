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
import ImageDisplay from "../components/ui/CollectPage"; 
const CreateAuctionPage = () => {
  const [newCar, setNewCar] = useState({
  model: "",
  price: "",
  image: "",
  brand_id: "",
  year: "",
  color: "",
  fuel_type: "",
  mileage: "",
  transmission: "",
  body_type: "",
});



  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState("info"); 

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
        color: "",
        fuel_type: "",
        mileage: "",
        transmission: "",
        body_type: "",
      });
    }
  };

  return (
    <ImageDisplay>
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
              <Input
                placeholder="Color"
                value={newCar.color}
                onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                />
              <Input
                placeholder="Fuel Type"
                value={newCar.fuel_type}
                onChange={(e) => setNewCar({ ...newCar, fuel_type: e.target.value })}
                />
                <Input
                placeholder="Mileage"
                value={newCar.mileage}
                onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })}
                />
                <Input
                placeholder="Transmission"
                value={newCar.transmission}
                onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })}
                />
                <Input
                placeholder="Body Type"
                value={newCar.body_type}
                onChange={(e) => setNewCar({ ...newCar, body_type: e.target.value })}
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
    </ImageDisplay>
  );
};

export default CreateAuctionPage;