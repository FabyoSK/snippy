import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Snippet = ({
  data,
  ...rest
}) => {
  return (
    <Box
      p={4}
      shadow='none'
      borderWidth='1px'
      {...rest}
    >
      <Heading fontSize='lg'>{data.title}</Heading>
      <Text mt={4}>{data.title}</Text>
    </Box>
  );
}

export default Snippet;