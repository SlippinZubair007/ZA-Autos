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
  import { useLoginManager } from "../store/Login"; // replace with actual path
  
  const Login = () => {
    const [credentials, setCredentials] = useState({
      email: "",
      password_hash: "",
    });
  
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
  
    const { LoginUser } = useLoginManager(); // assume this returns { success, message }
  
    const handleLogin = async () => {
      const { success, message } = await LoginUser(credentials);
      setMessage(message);
      setMessageType(success ? "success" : "error");
  
      setTimeout(() => {
        setMessage("");
        setMessageType("info");
      }, 3000);
  
      if (success) {
        setCredentials({
          email: "",
          password_hash: "",
        });
  
        // Redirect if needed, e.g.:
        // navigate("/dashboard");
      }
    };
  
    return (
      <Container maxW="container.sm">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" mb={8}>
            Log In
          </Heading>
  
          <Box
            w="full"
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <VStack spacing={4}>
              <FormControl isRequired>
                <Input
                  placeholder="Email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Password"
               
                  value={credentials.password_hash}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password_hash: e.target.value })
                  }
                />
              </FormControl>
  
              <Button colorScheme="teal" onClick={handleLogin} w="full">
                Log In
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
  
  export default Login;
  