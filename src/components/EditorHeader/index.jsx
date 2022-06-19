import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import React, { memo } from 'react';

function EditorHeader({
  value,
  onChange
}) {
  return (
    <Editable
      onChange={e => onChange('title', e)}
      value={value}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
}

export default memo(EditorHeader);