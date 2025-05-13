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
  Input,
  Select,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiStar } from "react-icons/ci";
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
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [mileageFilter, setMileageFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState('');
  const uniqueColors = [...new Set(cars.map((car) => car.color))];
  const uniqueYears = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);
  const uniqueBodyTypes = [...new Set(cars.map((car) => car.body_type))];
  const uniqueTransmissions = [...new Set(cars.map((car) => car.transmission))];
  const uniqueMileageRanges = ['Below 30,000', '30,000 - 60,000', '60,000 - 100,000', 'Above 100,000'];
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
        setFilteredCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = [...cars];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (car) =>
          car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.color?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    if (yearFilter) {
      filtered = filtered.filter((car) => String(car.year) === yearFilter);
    }
    
    if (bodyTypeFilter) {
      filtered = filtered.filter((car) => car.body_type === bodyTypeFilter);
    }
    
    if (transmissionFilter) {
      filtered = filtered.filter((car) => car.transmission === transmissionFilter);
    }
    
    if (mileageFilter) {
      if (mileageFilter === 'Below 30,000') {
        filtered = filtered.filter((car) => car.mileage < 30000);
      } else if (mileageFilter === '30,000 - 60,000') {
        filtered = filtered.filter((car) => car.mileage >= 30000 && car.mileage <= 60000);
      } else if (mileageFilter === '60,000 - 100,000') {
        filtered = filtered.filter((car) => car.mileage > 60000 && car.mileage <= 100000);
      } else if (mileageFilter === 'Above 100,000') {
        filtered = filtered.filter((car) => car.mileage > 100000);
      }
    }

    
    if (colorFilter) {
      filtered = filtered.filter((car) => car.color === colorFilter);
    }

    if (priceFilter) {
      if (priceFilter === 'low') {
        filtered = filtered.filter((car) => car.price <= 50000);
      } else if (priceFilter === 'mid') {
        filtered = filtered.filter((car) => car.price >= 20000 && car.price <= 40000);
      } else if (priceFilter === 'high') {
        filtered = filtered.filter((car) => car.price > 40000);
      }
    }

    setFilteredCars(filtered);
  }, [searchQuery, colorFilter, priceFilter, cars, yearFilter, bodyTypeFilter, transmissionFilter, mileageFilter]);

  const fetchReviews = async (carId) => {
    try {
      const response = await fetch('/api/GetRating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ car_id: carId }),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleReviewClick = (carId) => {
    setSelectedCarId(carId);
    fetchReviews(carId);
    onOpen();
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <Box p={6}>Loading cars...</Box>;
  if (error) return <Box p={6} color="red.500">Error: {error}</Box>;

  return (
    <Box 
      top="-14" 
      left="0" 
      position="relative" 
      width="100%" 
      height="10000%"
      backgroundImage={`url('/videos/Collection.jpg')`} 
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    > 
      <Box 
        p={10} 
        bg="rgba(0, 0, 0, 0.75)" 
        minH="100vh" 
        mt={100}
      >
        <Heading 
          fontSize="32px" 
          fontFamily="'Inter', sans-serif" 
          mb={8} 
          color="white"
        >
          Model Overview
        </Heading>

        <Flex mb={5} gap={4} wrap="wrap">
          <Input
            placeholder="Search by model or color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="md"
            bg="grey.800"
            color="white"
            width="350px"
          />
          <Select
            placeholder="Color"
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            bg="grey.800"
            color="white"
            width="100px"
          >
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            bg="grey.800"
            color="white"
            width="100px"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <Select
            placeholder="Body"
            value={bodyTypeFilter}
            onChange={(e) => setBodyTypeFilter(e.target.value)}
            bg="grey.800"
            color="white"
            width="100px"
          >
            {uniqueBodyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          <Select
            placeholder="Transmission"
            value={transmissionFilter}
            onChange={(e) => setTransmissionFilter(e.target.value)}
            bg="grey.800"
            color="white"
            width="150px"
          >
            {uniqueTransmissions.map((trans) => (
              <option key={trans} value={trans}>{trans}</option>
            ))}
          </Select>
          <Select
            placeholder="Mileage"
            value={mileageFilter}
            onChange={(e) => setMileageFilter(e.target.value)}
            bg="grey.800"
            color="white"
            width="120px"
          >
            {uniqueMileageRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </Select>
          <Select
            placeholder="Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            bg="grey.800"
            color="white"
            width="100px"
          >
            <option value="low">Below $60,000</option>
            <option value="mid">$20,000 - $40,000</option>
            <option value="high">Above $40,000</option>
          </Select>
        </Flex>

        <Box mt={6}>
          <Slider {...settings}>
            {filteredCars.map((car) => (
              <Box key={car.car_id} p={2}>
                <Card bg="black" color="white" border="1px solid" borderColor="gray.600">
                  <CardBody>
                    <Image
                      src={car.image}
                      alt={car.color}
                      borderRadius="sm"
                      mb={4}
                      objectFit="cover"
                      w="100%"
                      h="200px"
                    />
                    <Heading size="md">{car.model}</Heading>
                    <Text mt={2}>Year: {car.year}</Text>
                    <Text mt={1}>Price: ${car.price}</Text>
                    <Text mt={1}>ID: {car.car_id} </Text>
                  </CardBody>
                  <CardFooter>
                    <Button colorScheme="blue" mr={2}>Purchase</Button>
                    <Button variant="ghost">Add to Cart</Button>
                    <Button variant="outline" onClick={() => handleReviewClick(car.car_id)}>
                      <CiStar />
                    </Button>
                  </CardFooter>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>

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
                      <Text fontSize="sm" color="gray.500">
                        {`Reviewed on: ${new Date(review.created_at).toLocaleDateString()}`}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text>No reviews yet for this car.</Text>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default CollectionPage;