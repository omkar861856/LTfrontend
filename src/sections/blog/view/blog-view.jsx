import { useState } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import Account from 'src/_mock/account';
import { posts, drafts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import TinyMceEditor from '../Editor';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------



export default function BlogView() {
  const [editor, setEditor] = useState(false)

  
const {user} = Account();

let displayDrafts=true;

if(user.role === 'student'){
  displayDrafts = false;
}


  function onPostClick(){
    setEditor(!editor)
  }
  return (
    <Container>
      {displayDrafts?<div>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>        
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        {editor?<TinyMceEditor initialValue='Start editing ...' />:null}
        </Grid>         
        <Grid item xs={6}>
        {editor?<Button onClick={()=>{setEditor(!editor)}} variant="contained" color="inherit" startIcon={<Iconify icon="eva:minus-fill" />}>
          {editor?'Close Editor':null}
        </Button>:<Button onClick={()=>{onPostClick()}} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button>}
        </Grid>      
      </Grid>



        </Box>     

       
        
      </Stack>
      <hr/>

      <h2>Drafts</h2>

      <Grid container spacing={3}>
        {drafts.map((post, index) => (
          <PostCard draft key={post.id} post={post} index={index} />
        ))}
      </Grid>
      <hr/>

      </div>:null}
      
      

      

      <h2>Published</h2>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard draft={false} key={post.id} post={post} index={index} />
        ))}
      </Grid>
      
    </Container>
  );
}
