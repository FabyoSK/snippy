import { Stack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import Snippet from '../Snippet';

const SnippetList = ({ snippets, onSnippetClick, onButtonDeleteClick }) => {
  return (
    <Stack direction='column' spacing={2}>
      {snippets?.map(snippet => (
        <Snippet
          key={snippet.id}
          data={snippet}
          onSnippetClick={() => onSnippetClick(snippet)}
          onButtonDeleteClick={() => onButtonDeleteClick(snippet.id)}
        />
      ))}
    </Stack>
  );
}

export default SnippetList;