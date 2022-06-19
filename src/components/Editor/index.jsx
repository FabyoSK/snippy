import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-noconflict/keybinding-vscode';
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-min-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/ext-emmet';

// add react resizable
const Editor = ({
	onChange,
	value
}) => {
	return (
			<AceEditor
				mode="javascript"
				theme="dracula"
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
	);
};

export default Editor;