import { Box } from '@chakra-ui/react'; 
 
const Video = () => { 
  return ( 
    <Box 
      position="relative"  // Changed from absolute to relative
      top="10"              // Adjusted positioning
      width="100%"
      maxW="1200px"
      mx="auto"            // Center horizontally
      mt="20px"            // Add margin top to position below navbar
      borderRadius="md" 
      overflow="hidden" 
      zIndex="1"           // Changed from -1 to 1 to ensure visibility
    > 
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
      > 
        <source src="/videos/Porsh.mp4" type="video/mp4" /> 
        Your browser does not support the video tag.
      </video> 
    </Box> 
  ); 
}; 
 
export default Video;