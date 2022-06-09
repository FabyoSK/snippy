import Editor from "../../components/Editor"
import SnippetList from "../../components/SnippetList"
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import _ from "lodash";
import { Box, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "../../store";
import { fetch as fetchSnippets, update as updateSnippet, remove as removeSnippet } from "../../slices/snippets";

function Home() {
  const dispatch = useDispatch();
  const { data: snippets } = useSelector((state) => state).snippets;

  const [snippet, setSnippet] = useState({});
  const [unSavedSnippet, setUnSavedSnippet] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleChangeSnippet = (key, value) => {
    setUnSavedSnippet({ ...unSavedSnippet, [key]: value });
  };

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
    setUnSavedSnippet(currentSnippet);
  };

  const syncSnippet = _.throttle(() => {
    setShouldUpdate(true);
    setSnippet(unSavedSnippet)
  }, 3000);

  useEffect(() => {
    dispatch(fetchSnippets())
  }, [])

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(updateSnippet(unSavedSnippet));
      setShouldUpdate(false);
    }
  }, [snippet])

  useEffect(() => {
    syncSnippet();
  }, [unSavedSnippet])

  const handleSnippetDelete = (id) => {
    dispatch(removeSnippet(id));
  };

  return (
    <Flex
      height={'100vh'}
      mx="4"
      my="2"
      // justifyContent={'space-between'}
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
        <Editor
          onChange={handleChangeSnippet}
          title={unSavedSnippet?.title}
          value={unSavedSnippet?.body}
        />
      </Box>
    </Flex>
  )
}

export default Home;
