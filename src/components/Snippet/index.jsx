import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Snippet = ({
  data,
  onSnippetClick,
  onButtonDeleteClick,
  ...rest
}) => {
  return (
    <ButtonGroup
      isAttached
      variant='outline'
    >
      <Button
        width={'full'}
        height={'fit-content'}
        p={4}
        shadow='none'
        borderWidth='1px'
        justifyContent={'flex-start'}
        variant='outline'
        onClick={onSnippetClick}
        {...rest}
      >
        <Box >
          <Heading fontSize='md'>{data.title}</Heading>
        </Box>
      </Button>
      <IconButton
        aria-label='Add to friends'
        icon={<DeleteIcon />}
        onClick={onButtonDeleteClick}
      />
    </ButtonGroup>
  );
}

export default Snippet;