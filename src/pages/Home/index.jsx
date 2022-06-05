import Editor from "../../components/Editor"
import SnippetList from "../../components/SnippetList"
import styles from './home.module.css';
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import _ from "lodash";

function App() {
  const [snippets, setSnippets] = useState([]);

  const [snippet, setSnippet] = useState({});
  const [unSavedSnippet, setUnSavedSnippet] = useState({});

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

  const syncSnippet = _.debounce(() => {
    setSnippet(unSavedSnippet)
    console.log("unSavedSnippet")
  }, 1000);


  useEffect(() => {
    invoke('get_snippets')
      .then(data => setSnippets(data));
  }, [])

  useEffect(() => {
    console.log("bjhbjb")
    invoke('update_snippet', {
      id: snippet.id,
      updatedTitle: snippet.title,
      updatedBody: snippet.body
    })
      // .then(
      // () => {
      //   setSnippets(
      //     snippets.map(
      //       s => {
      //         if (s.id === snippet.id) {
      //           return snippet;
      //         }
      //         return s;
      //       })
      //   )
      // });
  }, [snippet])

  useEffect(() => {
    syncSnippet();
    console.log("fsk",unSavedSnippet)
  }, [unSavedSnippet])

  console.log(snippets)

  return (
    <div className={styles.home}>
      <div className={styles.snippetsContainer}>
        <SearchInput 
          onChange={() => {}}
          value="dd"
          onButtonAddClick={handleSetupNewSnippet}
        />
        <SnippetList 
          snippets={snippets}
          onSnippetClick={handleSetSnippetFocus}
        />
      </div>
      <Editor 
        onChange={handleChangeSnippetContent} 
        value={unSavedSnippet?.body}
      />
    </div>
  )
}

export default App
