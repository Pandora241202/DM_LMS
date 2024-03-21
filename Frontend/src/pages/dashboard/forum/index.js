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
import { forumApi } from '../../../api/forum';
import { userApi } from '../../../api/user';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { ForumCard } from '../../../sections/dashboard/forum/forum-card';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';

const useForums = () => {
  const isMounted = useMounted();
  const [forums, setForums] = useState([]);

  const getForums = useCallback(async () => {
    try {
      const response = await forumApi.getForums();
      const forumsInfo = await Promise.all(response.data.map(async r => {
        const userResponse = await userApi.getUser(r.userId);
        return {
          ...r, 
          author: {
            avatar: userResponse.avatar,
            name: userResponse.username
          }
        }
      }));

      if (isMounted()) {
        setForums(forumsInfo);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getForums();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return forums;
};

const FORUM_PER_PAGE = 6;

const Page = () => {
  const forums = useForums();
  const [page, setPage] = useState(0);

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
            <Input placeholder="Tìm kiếm chủ đề trên diễn đàn..." disableUnderline fullWidth sx={{marginLeft: 2}} inputProps={{ style: { fontSize: '17px' } }}/>
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
            {forums
            .slice(page*FORUM_PER_PAGE, page*FORUM_PER_PAGE + FORUM_PER_PAGE)
            .map((forum) => (
              <Grid
                key={forum.id}
                xs={12}
                md={6}
              >
                <ForumCard
                  id={forum.id} 
                  authorAvatar={forum.author.avatar}
                  authorName={forum.author.name}
                  label={forum.label}
                  cover={forum.cover}
                  createdAt={forum.createdAt}
                  readTimes={forum.readTimes}
                  shortDescription={forum.shortDescription}
                  title={forum.title}
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
              disabled={page == 0}
              startIcon={(
                <SvgIcon>
                  <ArrowLeftIcon />
                </SvgIcon>
              )}
              onClick={() => {
                setPage(page - 1);
                window.scrollTo(0,0);
              }}
            >
              Mới hơn
            </Button>
            <Button
              disabled={page == Math.floor(forums.length / FORUM_PER_PAGE)}
              endIcon={(
                <SvgIcon>
                  <ArrowRightIcon />
                </SvgIcon>
              )}
              onClick={() => {
                setPage(page + 1);
                window.scrollTo(0,0);
              }}
            >
              Cũ hơn
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
