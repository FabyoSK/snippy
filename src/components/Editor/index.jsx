import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import { ResizableBox } from "react-resizable";
import { Box, Editable, EditableInput, EditablePreview, Heading } from "@chakra-ui/react";

// add react resizable
const Editor = ({
	onChange,
	title,
	value
}) => {
	return (
		<Box
			height={'100vh'}
		>
			<Box
				mb={2}
			>
				<Editable value={title} onChange={e => onChange('title', e)}>
					<EditablePreview />
					<EditableInput />
				</Editable>
			</Box>

			<AceEditor
				mode="javascript"
				theme="monokai"
				onChange={e => onChange('body', e)}
				name="editor"
				highlightActiveLine={true}
				value={value}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
		</Box>

	);
};

export default Editor;