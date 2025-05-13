
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
    FormLabel,
    Textarea,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useRatingManager } from "../store/Ratings"; 
  import ImageDisplay from "../components/ui/CollectPage";
  const CreateRating = () => {
    const [review, setReview] = useState({
      car_id: "",
      rating: "",
      review_text: "",
    });
  
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
  
    const { CreateRating } = useRatingManager();
  
    const handleCreateRating = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setMessage("User not logged in");
        setMessageType("error");
        return;
      }
  
      const newRating = { ...review, user_id };
  
      const { success, message } = await CreateRating(newRating);
      setMessage(message);
      setMessageType(success ? "success" : "error");
  
      if (success) {
        setReview({ car_id: "", rating: "", review_text: "" });
      }
  
      setTimeout(() => {
        setMessage("");
        setMessageType("info");
      }, 3000);
    };
  
    return (
      <ImageDisplay>
      <Container maxW="container.sm" mt="50px">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" mb={8} fontFamily="'Inter', sans-serif"  fontSize="32px">
            Submit a Review
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
                  value={review.car_id}
                  onChange={(e) =>
                    setReview({ ...review, car_id: e.target.value })
                  }
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Rating (1-5)</FormLabel>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Rating"
                  value={review.rating}
                  onChange={(e) =>
                    setReview({ ...review, rating: e.target.value })
                  }
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Review Text</FormLabel>
                <Textarea
                  placeholder="Write your review..."
                  value={review.review_text}
                  onChange={(e) =>
                    setReview({ ...review, review_text: e.target.value })
                  }
                />
              </FormControl>
  
              <Button colorScheme="teal" onClick={handleCreateRating} w="full">
                Submit Review
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
  
  export default CreateRating;
  
