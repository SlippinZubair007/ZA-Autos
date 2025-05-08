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

const WishlistSection = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/Wishlist')
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching wishlist:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner color="purple.500" />;

  return (
    <Box p={4} bg="gray.50" borderRadius="md" mt={10}>
      <Heading size="md" mb={4}>My Wishlist</Heading>
      <VStack align="start" spacing={4}>
        {wishlist.length === 0 ? (
          <Text>No items in wishlist.</Text>
        ) : (
          wishlist.map((item, index) => (
            <Box
              key={index}
              p={3}
              border="1px solid #ddd"
              borderRadius="md"
              w="100%"
              bg="white"
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
                  <Text fontWeight="bold">{item.model}</Text>
                  <Text fontSize="sm" color="gray.600">
                    Added by: {item.user_fname}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.description || 'No description provided.'}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default WishlistSection;
