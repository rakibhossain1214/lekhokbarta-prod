import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const storage = getStorage();

function FirebaseImageUpload() {

    const [file, setFile] = useState("");
    
    // Handles input change event and updates state
    function handleChange(event) {
        setFile(event.target.files[0]);
        blah.src = URL.createObjectURL(event.target.files[0]);
        // console.log("Firebase Upload: ", event)
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }

        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    // blah.src = url;
                });
            }
        ); 
    }
 
    const [percent, setPercent] = useState(0);
    
    return (
        <div>
            <input type="file" onChange={handleChange} accept="image/*" />
            {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
            <img id="blah" src="" alt="" max-height={300} max-width={250}/>
            {/* <Image
              src="#"
              alt="cover"
              width="400"
              height="350"
              id="blah"
            /> */}
            {/* <p>{percent} "% done"</p> */}
        </div>
    );
}

export default FirebaseImageUpload;