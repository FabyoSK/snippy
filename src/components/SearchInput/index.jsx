import React from 'react';

function SearchInput({
  onChange,
  value,
  onButtonAddClick
}) {
  return (
    <>
    <input 
      onChange={onChange}
      value={value}
      />
      <button onClick={onButtonAddClick}>
        ADDDd
      </button>
      </>
  );
}

export default SearchInput;