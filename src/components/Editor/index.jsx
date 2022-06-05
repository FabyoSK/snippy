import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import styles from './editor.module.css';
import { ResizableBox } from "react-resizable";

// add react resizable
const Editor = ({
	onChange,
	value
}) => {
	return (
			<AceEditor
				mode="javascript"
				theme="monokai"
				onChange={onChange}
				name="editor"
				editorProps={{ $blockScrolling: true }}
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
	);
};

export default Editor;