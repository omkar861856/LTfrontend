import axios from 'axios';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, useEffect } from 'react';

import { Box, Grid, Button, TextField, LinearProgress } from '@mui/material';


export default function TinyMceEditor({ initialValue }) {
  const editorRef = useRef(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);


  function handleImageUpload(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

function handleTitleUpload(e) {
  console.log(e.target.value);
  setTitle((e.target.value));
}

  //  function to handle the file upload:

  const handleFileUpload = () => {
    
    axios
      .post('https://6666e9e8a2f8516ff7a57eb4.mockapi.io/images', {file, title}, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  function getUID() {
    return { id: Date.now().toString(36), date: new Date() };
  }

  async function draft(data) {
    const { id, date } = getUID();
    const submit = await fetch(`http://localhost:4000/editor/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        date,
        data,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  async function publish(data) {
    const { id, date } = getUID();
    const submit = await fetch(`http://localhost:4000/editor/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        date,
        data,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);
  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here
      console.log(content);
    }
  };

  return (
    <>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {' '}
              <TextField onChange={(e)=>{handleTitleUpload(e)}} fullWidth id="standard-basic" label="Title" variant="standard" required />
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={(e)=>handleImageUpload(e)} accept="image/png, image/jpeg" fullWidth type="file" />              
              <Button onClick={()=>{handleFileUpload()}} variant="contained" color="primary" component="span">
                Upload
              </Button> 
              <img alt="Uploaded" src={file} />           
            </Grid>
          </Grid>
        </Box>

        <LinearProgress variant="determinate" value={uploadProgress} />
      </>      
      <Editor
        apiKey="zhzildsevxu908vvx41jeauf9bkbbd7n0cibey4517zdxxdo"
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={initialValue}
        onDirty={() => setDirty(true)}
        init={{
          height: 500,
          menubar: true,
          fixed_toolbar_container: '#mytoolbar',
          plugins: [
            'codesample',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'earchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'edia',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          link_title: true,

          toolbar:
            'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      {/* <button type="button" onClick={log}>
        Log editor content
      </button> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <button type="button" onClick={save} disabled={!dirty}>
              Save
            </button>
          </Grid>
          <Grid item xs={3}>
            <button type="button" onClick={draft}>
              Save as Draft
            </button>
          </Grid>
          <Grid item xs={3}>
            <button type="button" onClick={publish}>
              Publish
            </button>
          </Grid>
        </Grid>
      </Box>

      {dirty && <p>You have unsaved content!</p>}
    </>
  );
}

TinyMceEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
};
