import { Box } from '@chakra-ui/react'; 
 
const Video = () => { 
  return ( 
    <Box 
      position="relative" 
      top="10"             
      width="100%"
      maxW="1200px"
      mx="auto"          
      mt="20px"         
      borderRadius="md" 
      overflow="hidden" 
      zIndex="1"       
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