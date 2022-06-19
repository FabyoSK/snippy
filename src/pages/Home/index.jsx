import SnippetList from "../../components/SnippetList"
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { debounce } from "lodash";
import { Box, Flex } from "@chakra-ui/react";

import EditorContainer from "../../components/EditorContainer";
import useSnippetStore from "../../store/useSnippetStore";

function Home() {
  const snippets = useSnippetStore((state) => state.snippets)
  const fetchSnippets = useSnippetStore(state => state.fetchSnippets)
  const updateSnippet = useSnippetStore(state => state.updateSnippet)
  const deleteSnippet = useSnippetStore(state => state.deleteSnippet)

  const [snippet, setSnippet] = useState({});
  const [unSavedSnippet, setUnSavedSnippet] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleChangeSnippet = useCallback((key, value) => {
    setUnSavedSnippet((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSetupNewSnippet = () => {
    invoke('create_snippet', {
      title: 'New Snippet',
      body: '// Type your code here',
    })
      .then(data => {
        setUnSavedSnippet({
          title: 'New Snippet',
          body: '// Type your code here',
        });
      });
  };

  const handleSetSnippetFocus = (currentSnippet) => {
    setSnippet(unSavedSnippet)
    setUnSavedSnippet(currentSnippet);
  };

  const syncSnippet = useCallback(debounce((newSnippet) => {
    setShouldUpdate(true);
    setSnippet(newSnippet);
  }, 1000), []);

  useEffect(() => {
    fetchSnippets();
  }, [])

  useEffect(() => {
    if (shouldUpdate) {
      updateSnippet(unSavedSnippet);
      setShouldUpdate(false);
    }
  }, [snippet])

  useEffect(() => {
    syncSnippet(unSavedSnippet);
  }, [unSavedSnippet])

  const handleSnippetDelete = (id) => {
    deleteSnippet(id);
  };

  return (
    <Flex
      height={'100vh'}
      mx="4"
      my="2"
    >
      <Box
        overflowY={'scroll'}
        mr={14}
        pr={6}
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
          onButtonDeleteClick={handleSnippetDelete}
        />
      </Box>
      <Box>
        <EditorContainer
          onChange={handleChangeSnippet}
          title={unSavedSnippet?.title}
          value={unSavedSnippet?.body}
        />
      </Box>
    </Flex>
  )
}

export default Home;
