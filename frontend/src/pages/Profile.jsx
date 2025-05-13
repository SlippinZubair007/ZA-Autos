import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    VStack,
    Text,
    FormControl,
    FormLabel,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { useProfileManager } from "../store/Profile";
  import ImageDisplay from "../components/ui/CollectPage";

  const Profile = () => {
    const { updateProfile } = useProfileManager();
    const [form, setForm] = useState({
      user_fname: "",
      user_lname: "",
      email: "",
      password_hash: "",
      address: "",
      contact_info: "",
    });
  
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
          setMessage("User not logged in");
          setMessageType("error");
          return;
        }
      
        const fetchProfile = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/GetUserProfile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id }),
            });
      
            const data = await res.json();
            console.log("Fetched profile data:", data);
      
            if (res.ok && data.profile) {
              setForm(data.profile);
            } else {
              setMessage(data.message || "Failed to fetch profile.");
              setMessageType("error");
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
            setMessage("Server error occurred.");
            setMessageType("error");
          }
        };
      
        fetchProfile();
      }, []);
      
    const handleUpdate = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setMessage("User not logged in");
        setMessageType("error");
        return;
      }
  
      const updatedData = { ...form, user_id };
  
      const { success, message } = await updateProfile(updatedData);
      setMessage(message);
      setMessageType(success ? "success" : "error");
  
      setTimeout(() => {
        setMessage("");
        setMessageType("info");
      }, 3000);
    };
  
    return (

      <ImageDisplay>
      <Container maxW="container.sm" mt="50px">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" mb={8} fontFamily="'Inter', sans-serif" fontSize="32px">
            Update Profile
          </Heading>
          <Box
            w="full"
            bg={useColorModeValue("white", "black")}
            p={6}
            rounded="lg"
            shadow="md"
            
          >
            <VStack spacing={4}>
              {["user_fname", "user_lname", "email", "password_hash", "address", "contact_info"].map((field) => (
                <FormControl key={field} isRequired>
                  <FormLabel textTransform="capitalize">{field.replace("_", " ")}</FormLabel>
                  <Input
                    type={field.includes("password") ? "password" : "text"}
                    placeholder={`Enter ${field.replace("_", " ")}`}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  />
                </FormControl>
              ))}
  
              <Button colorScheme="blue" w="full" onClick={handleUpdate}>
                Save Changes
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
  
  export default Profile;
  