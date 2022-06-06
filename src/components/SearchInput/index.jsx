import {
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import { SmallAddIcon } from '@chakra-ui/icons'

import React from 'react';

function SearchInput({
  onChange,
  value,
  onButtonAddClick,
  ...rest
}) {
  return (
    <InputGroup size='md' {...rest}>
      <Input
        type={'text'}
        placeholder='Search...'
        onChange={onChange}
        value={value}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={onButtonAddClick}>
          <SmallAddIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchInput;