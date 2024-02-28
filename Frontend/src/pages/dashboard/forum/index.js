import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Input,
} from '@mui/material';
import { blogApi } from '../../../api/blog';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { PostNewsletter } from '../../../sections/dashboard/blog/post-newsletter';
import { PostCard } from '../../../sections/dashboard/blog/post-card';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await blogApi.getPosts();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getPosts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return posts;
};

const Page = () => {
  const posts = usePosts();

  usePageView();

  return (
    <>
      <Head>
        <title>
          Forum: Forum List
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Typography variant="h3">
              Diễn đàn
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color="text.primary"
                component={NextLink}
                href={paths.dashboard.index}
                variant="subtitle2"
              >
                Dashboard
              </Link>
              <Link
                color="text.primary"
                component={NextLink}
                href={paths.dashboard.forum.index}
                variant="subtitle2"
              >
                Diễn đàn
              </Link>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                Danh sách
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              px: 3,
              py: 2, 
              mb: 8,
              mt: 6,
            }}
          >
            <SvgIcon fontSize="large" htmlColor="#848C97" >
              <SearchMdIcon />
            </SvgIcon>
            <Input placeholder="Tìm kiếm chủ đề trên diễn đàn..." autoComplete disableUnderline fullWidth sx={{marginLeft: 2}} inputProps={{ style: { fontSize: '17px' } }}/>
          </Card>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: 2, 
              position: 'fixed',
              bottom: 30,
              right : 100,
              width: 500,
            }}
          >
            <Typography variant="subtitle1">
              Tạo chủ đề mới để trao đổi cùng cộng đồng!
            </Typography>
            <Button
              component={NextLink}
              href={paths.dashboard.blog.postCreate}
              variant="contained"
            >
              Tạo ngay
            </Button>
          </Card>
          <Typography variant="h4">
            Bài đăng gần đây
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
            variant="body1"
          >
            Khám phá những bài viết mới về chủ đề Trí Tuệ Nhân Tạo từ cộng đông của chúng tôi.
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
          >
            Những thứ bạn quan tâm có thể được tìm thấy ngay đây thôi.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Grid
            container
            spacing={4}
          >
            {posts.map((post) => (
              <Grid
                key={post.title}
                xs={12}
                md={6}
              >
                <PostCard
                  authorAvatar={post.author.avatar}
                  authorName={post.author.name}
                  category={post.category}
                  cover={post.cover}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  shortDescription={post.shortDescription}
                  title={post.title}
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{
              mt: 4,
              mb: 8
            }}
          >
            <Button
              disabled
              startIcon={(
                <SvgIcon>
                  <ArrowLeftIcon />
                </SvgIcon>
              )}
            >
              Newer
            </Button>
            <Button
              endIcon={(
                <SvgIcon>
                  <ArrowRightIcon />
                </SvgIcon>
              )}
            >
              Older posts
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
