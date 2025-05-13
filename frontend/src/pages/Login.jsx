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
  import { useLoginManager } from "../store/Login"; 
  import ImageDisplay from "../components/ui/CollectPage";

  const Login = () => {
    const [credentials, setCredentials] = useState({
      email: "",
      password_hash: "",
    });
    
    const [user_id, setUserId] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
  
    const { LoginUser } = useLoginManager(); 
  
    const handleLogin = async () => { 

      const {user_id,success,message } = await LoginUser(credentials);
      console.log("Login response:", {user_id,success,message}); 
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
      }
    };
  
    return (
      <ImageDisplay>
      <Container maxW="container.sm" mt="50px">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" mb={5} fontSize="32px"  fontFamily="'Inter', sans-serif" >
            Log In
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
      </ImageDisplay>
    );
  };
  
  export default Login;
  