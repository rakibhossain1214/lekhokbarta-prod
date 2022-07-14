import React, { useState } from 'react';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import SuccessText from '../components/SuccessText';
// import { Link } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)
import { Box } from '@material-ui/core';



function RichEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [content, setContent] = useState('')

    // console.log(content)

    const handlePastedText = (text, html) => {
        // if they try to paste something they shouldn't let's handle it
        if (text.indexOf('text that should not be pasted') != -1) {
    
          // we'll add a message for the offending user to the editor state
          const newContent = Modifier.insertText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            'nice try, chump!'
          );
    
          // update our state with the new editor content
          this.onChange(EditorState.push(
            editorState,
            newContent,
            'insert-characters'
          ));
          return true;
        } else {
          return false;
        }
      }
    

    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={newState => {
                    setEditorState(newState);
                    setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                }}
                handlePastedText={handlePastedText}
            />
            {/* <Box margin={5}>
                <textarea
                    disabled
                    className="w-full mt-5"
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </Box> */}

        </div>
    );
}

export default RichEditor;