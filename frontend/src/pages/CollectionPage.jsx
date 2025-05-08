import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      as={CiSquareChevRight}
      color="white"
      fontSize="3xl"
      position="absolute"
      right="-25px"
      top="50%"
      transform="translateY(-50%)"
      zIndex="2"
      cursor="pointer"
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      as={CiSquareChevLeft}
      color="white"
      fontSize="3xl"
      position="absolute"
      left="-25px"
      top="50%"
      transform="translateY(-50%)"
      zIndex="2"
      cursor="pointer"
      onClick={onClick}
    />
  );
};

const CollectionPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/Car');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const fetchReviews = async (carId) => {
    try {
      const response = await fetch('/api/GetRating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ car_id: carId }),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data); // Store reviews in the state
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleReviewClick = (carId) => {
    setSelectedCarId(carId);
    fetchReviews(carId); // Fetch reviews for the selected car
    onOpen(); // Open the modal
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <Box p={6}>Loading cars...</Box>;
  if (error) return <Box p={6} color="red.500">Error: {error}</Box>;

  return (
    <Box p={6} bg="black" minH="100vh" mt={20}>
      <Heading mb={6} color="white">Available Cars</Heading>
      <Box mt={12}>
        <Slider {...settings}>
          {cars.map((car) => (
            <Box key={car.car_id} p={2}>
              <Card bg="gray.700" color="white" border="1px solid" borderColor="gray.600">
                <CardBody>
                  <Image
                    src={car.image}
                    alt={car.color}
                    borderRadius="md"
                    mb={4}
                    objectFit="cover"
                    w="100%"
                    h="200px"
                  />
                  <Heading size="md">{car.model}</Heading>
                  <Text mt={2}>Price: ${car.price}</Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="blue" mr={2}>Purchase</Button>
                  <Button variant="ghost">Add to Cart</Button>
                  {/* Reviews Button */}
                  <Button variant="outline" onClick={() => handleReviewClick(car.car_id)}>
                    View Reviews
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Modal for Reviews */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reviews for Car ID: {selectedCarId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Box key={review.review_id} p={4} bg="gray.800" borderRadius="md" w="full">
                    <Heading size="sm">{`Rating: ${review.rating}/5`}</Heading>
                    <Text>{review.review_text}</Text>
                    <Text fontSize="sm" color="gray.500">{`Reviewed on: ${new Date(review.created_at).toLocaleDateString()}`}</Text>
                  </Box>
                ))
              ) : (
                <Text>No reviews yet for this car.</Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CollectionPage;
