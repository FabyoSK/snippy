import React from 'react';

const Snippet = ({
  data,
  ...rest
}) => {
  return (
    <div {...rest}>
      <h1>{data.title}</h1>
    </div>
  );
}

export default Snippet;