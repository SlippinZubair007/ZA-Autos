import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  Spinner,
  Image,
  HStack,
} from '@chakra-ui/react';
import { useWishlistManager } from '../store/Wishlist';
import ImageDisplay from '../components/ui/CollectPage';

const WishlistSection = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const { createWishlistItem } = useWishlistManager();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);

    if (!storedUserId) {
      setLoading(false); 
      return;
    }

    fetch('api/GetUserWishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: storedUserId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching wishlist:', err);
        setLoading(false);
      });
  }, []);

  const handleAddToWishlist = async (car) => {
    if (!userId) {
      alert("You must be logged in to add to wishlist.");
      return;
    }

    const response = await createWishlistItem({ user_id: userId, car_id: car.car_id });

    if (response.success) {
      setWishlist((prev) => [...prev, car]);
    }

    alert(response.message);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="40vh">
        <Spinner color="purple.500" size="xl" />
      </Box>
    );
  }

  return (
    <ImageDisplay>
      <Box p={4} bg="black" borderRadius="md" mt={10}>
        <Heading size="md" mb={4} color="white">
          My Wishlist
        </Heading>

        <VStack align="start" spacing={4}>
          {!userId || wishlist.length === 0 ? (
            <Text color="gray.300">
              No items in wishlist.
            </Text>
          ) : (
            wishlist.map((item, index) => (
              <Box
                key={index}
                p={3}
                border="1px solid #ddd"
                borderRadius="md"
                w="100%"
                bg="black"
              >
                <HStack spacing={4}>
                  {item.image && (
                    <Image
                      boxSize="60px"
                      objectFit="cover"
                      src={item.image}
                      alt={item.model}
                      borderRadius="md"
                    />
                  )}
                  <Box>
                    <Text fontWeight="bold" color="white">{item.model}</Text>
                    <Text fontSize="sm" color="gray.400">Added by: {item.user_fname}</Text>
                    <Text fontSize="sm" color="gray.400">Year: {item.year}</Text>
                    <Text fontSize="sm" color="gray.400">Price: {item.price}</Text>
                    <Text fontSize="sm" color="gray.400">Available: {item.available ? 'Yes' : 'No'}</Text>
                  </Box>
                </HStack>
              </Box>
            ))
          )}
        </VStack>
      </Box>
    </ImageDisplay>
  );
};

export default WishlistSection;
