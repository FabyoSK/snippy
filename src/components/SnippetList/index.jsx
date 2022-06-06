import React from 'react';
import Snippet from '../Snippet';

const SnippetList = ({ snippets, onSnippetClick }) => {
  return (
    <div>
      {snippets.map((snippet, index) => (
        <Snippet 
          key={index} 
          data={snippet}
          onClick={() => onSnippetClick(snippet)}
          mb="2"
          />
      ))}
    </div>
  );
}

export default SnippetList;