import React from 'react';
import Snippet from '../Snippet';
import styles from './snippetList.module.css';

const SnippetList = ({ snippets, onSnippetClick }) => {
  return (
    <div className={styles.snippetList}>
      {snippets.map((snippet, index) => (
        <Snippet 
          key={index} 
          data={snippet}
          onClick={() => onSnippetClick(snippet)}
          />
      ))}
    </div>
  );
}

export default SnippetList;