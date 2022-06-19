import { invoke } from '@tauri-apps/api';
import _ from 'lodash';
import create from 'zustand'

const useSnippetStore = create((set) => ({
  snippets: null,
  fetchSnippets: () => {
    invoke('get_snippets')
      .then(data => set({ snippets: data }));
  },
  createSnippet: (data) => {
    invoke('create_snippet', {
      title: data.title,
      body: data.body
    })
      .then(() => set((state) => ({ snippets: [...state.snippets, data] })));
  },
  updateSnippet: (data) => {
    invoke('update_snippet', {
      id: data.id,
      updatedTitle: data.title,
      updatedBody: data.body
    })
      .then(() => set((state) => ({
        snippets: _.map(state.snippets, (item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        })
      })));
  },
  removeSnippet: (id) => {
    invoke('delete_snippet', {
      id
    })
      .then(() => set((state) => ({ snippets: state.snippets.filter(snippet => snippet.id !== id) })));
  }
}))

export default useSnippetStore;