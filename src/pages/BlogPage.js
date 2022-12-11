import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [newsData, setNewsData] = useState();

  const getNewsData = async () =>{
    const response = await axios.get('http://127.0.0.1:5000/war_news');
    setNewsData(response.data);
    return response.data;
  }

  useEffect(()=> {
    async function fetchData() {
      const DataArray = await getNewsData();
      setNewsData(DataArray);
    };
    fetchData();
  }, []);

  if (newsData) {
    console.log(newsData);
    return (
      <>
        <Helmet>
          <title> News </title> {/* ADRIAN */}
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Latest news
            </Typography>
            {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button> */}
          </Stack>

          {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
            <BlogPostsSort options={SORT_OPTIONS} />
          </Stack> */}

          <Grid container spacing={3}>
            {POSTS.map((post, index) => (
              <BlogPostCard key={post.id} cover={newsData[index].urlToImage} title={newsData[index].title} view={faker.datatype.number(1000)} comment={faker.datatype.number(1000)} share={faker.datatype.number(1000)} author={newsData[index].author} createdAt={newsData[index].publishedAt} index={index} url={newsData[index].url} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}
