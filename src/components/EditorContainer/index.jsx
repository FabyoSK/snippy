import { Box } from "@chakra-ui/react";
import EditorHeader from "../EditorHeader";
import Editor from "../Editor";

const EditorContainer = ({
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
				<EditorHeader
					value={title}
					onChange={onChange}
				/>
			</Box>

			<Editor
				onChange={onChange}
				value={value}
			/>
		</Box>
	);
};

export default EditorContainer;