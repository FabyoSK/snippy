import Editor from "../../components/Editor"
import SnippetList from "../../components/SnippetList"
import styles from './home.module.css';
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import _ from "lodash";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const [snippets, setSnippets] = useState([]);

  const [snippet, setSnippet] = useState({});
  const [unSavedSnippet, setUnSavedSnippet] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const handleChangeSnippetContent = (text) => {
    setUnSavedSnippet({ ...unSavedSnippet, body: text });
  };

  const handleSetupNewSnippet = () => {
    invoke('create_snippet', {
      title: 'New Snippet',
      body: '// Type your code here',
    })
      .then(data => {
        setSnippets([...snippets, data]);
        setUnSavedSnippet(data);
      });
  };

  const handleSetSnippetFocus = (currentSnippet) => {
    setUnSavedSnippet(currentSnippet);
  };

  const syncSnippet = _.throttle(() => {
    setShouldUpdate(true);
    setSnippet(unSavedSnippet)
    console.log("unSavedSnippet")
  }, 1000);


  useEffect(() => {
    invoke('get_snippets')
      .then(data => setSnippets(data));
  }, [])

  useEffect(() => {
    console.log("bjhbjb")
    if (shouldUpdate) {
      invoke('update_snippet', {
        id: snippet.id,
        updatedTitle: snippet.title,
        updatedBody: snippet.body
      })
      .then(
      () => {
        setShouldUpdate(false);
      //   setSnippets(
      //     snippets.map(
      //       s => {
      //         if (s.id === snippet.id) {
      //           return snippet;
      //         }
      //         return s;
      //       })
        // )
      });
    }
  }, [snippet])

  useEffect(() => {
    syncSnippet();
    console.log("fsk", unSavedSnippet)
  }, [unSavedSnippet])

  console.log(snippets)

  return (
    <Flex
      height={'100vh'}
      mx="4"
      my="2"
      justifyContent={'space-between'}
    >
      <Box
        overflowY={'scroll'}
      >
        <SearchInput
          onChange={() => { }}
          value="dd"
          onButtonAddClick={handleSetupNewSnippet}
          mb="2"
        />
        <SnippetList
          snippets={snippets}
          onSnippetClick={handleSetSnippetFocus}
        />
      </Box>
      <Editor
        onChange={handleChangeSnippetContent}
        value={unSavedSnippet?.body}
      />
    </Flex>
  )
}

export default App
