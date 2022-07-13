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


import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, addDoc, getDocs, where } from 'firebase/firestore'
import { getStorage, ref } from "firebase/storage";
import firebaseConfig from 'src/config/firebase.config'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage();
const storageRef = ref(storage, 'images/rivers.jpg');

function uploadImageCallBack(file) {
    console.log("Inside callback function", file);
    return new Promise(
        (resolve, reject) => {
            console.log("Inside Promise")
            // const xhr = new XMLHttpRequest();
            // xhr.open('POST', 'https://api.imgur.com/3/image');
            // xhr.setRequestHeader('Authorization', 'Client-ID ##clientid###');
            // const data = new FormData();
            // data.append('image', file);
            // xhr.send(data);
            // xhr.addEventListener('load', () => {
            //   const response = JSON.parse(xhr.responseText);
            //   console.log(response)
            //   resolve(response);
            // });
            // xhr.addEventListener('error', () => {
            //   const error = JSON.parse(xhr.responseText);
            //   console.log(error)
            //   reject(error);
            // });

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log("Error ->", error)
                    reject(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve({ data: { link: downloadURL } })
                    });
                }
            );

            // resolve({ data: { link: 'imagelink'} })
        }
    );
}

function RichEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [content, setContent] = useState('')

    console.log(content)
    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="card"
                editorClassName="card-body"
                onEditorStateChange={newState => {
                    setEditorState(newState);
                    setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                }}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'embedded', 'emoji', 'image'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
                    // image: {
                    //     uploadEnabled: true,
                    //     uploadCallback: uploadImageCallBack,
                    //     previewImage: true,
                    //     inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    //     alt: { present: false, mandatory: false },
                    //     defaultSize: {
                    //          height: 'auto',
                    //          width: 'auto',
                    //     },
                    // }
                }}
            />
        </div>
    );
}

export default RichEditor;