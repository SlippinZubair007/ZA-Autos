import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, Text, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { useUserManager } from "../store/SignUp";
import ImageDisplay from "../components/ui/CollectPage";
const CreateUser = () => {
  const [newUser, setNewUser] = useState({
    user_fname: "",
    user_lname: "",
    email: "",
    contact_info: "",
    dob: "",
    address: "",
    cnic: "",
    password_hash: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const { CreateUser } = useUserManager();

  const handleAddUser = async () => {
    const { success, message } = await CreateUser(newUser);
    setMessage(message);
    setMessageType(success ? "success" : "error");
    setTimeout(() => {
      setMessage("");
      setMessageType("info");
    }, 3000);
    
    if (success) {
      setNewUser({
        user_fname: "",
        user_lname: "",
        email: "",
        contact_info: "",
        dob: "",
        address: "",
        cnic: "",
        password_hash: "",
      });
    }
  };

  return (
    <ImageDisplay>
    <Container maxw={"container.sm"} mt="50px">
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} fontFamily="'Inter', sans-serif" fontSize="32px" >
          Sign Up
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "black")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <Input
                placeholder="First Name"
                value={newUser.user_fname}
                onChange={(e) => setNewUser({ ...newUser, user_fname: e.target.value })}
              />
              <Input
                placeholder="Last Name"
                value={newUser.user_lname}
                onChange={(e) => setNewUser({ ...newUser, user_lname: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <Input
                placeholder="Contact Info"
                value={newUser.contact_info}
                onChange={(e) => setNewUser({ ...newUser, contact_info: e.target.value })}
              />
              <Input
                placeholder="Date of Birth (yyyy/mm/dd)"
                type="date"
                value={newUser.dob}
                onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
              />
              <Input
                placeholder="Address"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
              <Input
                placeholder="CNIC"
                value={newUser.cnic}
                onChange={(e) => setNewUser({ ...newUser, cnic: e.target.value })}
              />
              <Input
                placeholder="Password"
                type="password"
                value={newUser.password_hash}
                onChange={(e) => setNewUser({ ...newUser, password_hash: e.target.value })}
              />
            </FormControl>

            <Button colorScheme="teal" onClick={handleAddUser} w={"full"}>
              Sign Up
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

export default CreateUser;
