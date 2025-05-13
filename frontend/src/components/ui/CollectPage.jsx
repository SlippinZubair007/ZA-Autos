import { Box } from '@chakra-ui/react';

const ImageDisplay = ({ children }) => {
  return (
    <Box
      bgImage="url('/videos/Collection.jpg')"  
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
      w="100%"
      position="relative"
      zIndex="0"
    >
      <Box bg="rgba(0, 0, 0, 0.6)" w="100%" h="100%" position="absolute" top={0} left={0} zIndex={0} />

      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default ImageDisplay;
