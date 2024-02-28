import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { format, subHours } from 'date-fns';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { forumApi } from '../../../api/forum';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { ForumComment } from '../../../sections/dashboard/forum/forum-comment';
import { ForumCommentAdd } from '../../../sections/dashboard/forum/forum-comment-add';
import { ForumContent } from '../../../sections/dashboard/forum/forum-content';

const useComments = () => {
  return [
    {
      id: 'd0ab3d02ef737fa6b007e35d',
      authorAvatar: '/assets/avatars/avatar-alcides-antonio.png',
      authorName: 'Alcides Antonio',
      authorRole: 'Product Designer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: subHours(new Date(), 2).getTime(),
      isLiked: true,
      likes: 12
    },
    {
      id: '3ac1e17289e38a84108efdf3',
      authorAvatar: '/assets/avatars/avatar-jie-yan-song.png',
      authorName: 'Jie Yan Song',
      authorRole: 'Web Developer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      createdAt: subHours(new Date(), 8).getTime(),
      isLiked: false,
      likes: 8
    }
  ];
};

const useForumDetail = () => {
  const isMounted = useMounted();
  const [forumDetail, setForumDetail] = useState(null);

  const getForumDetail = useCallback(async () => {
    try {
      const response = await forumApi.getForumDetail();

      if (isMounted()) {
        setForumDetail(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getForumDetail();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return forumDetail;
};

const Page = () => {
  const forumDetail = useForumDetail();
  const comments = useComments();

  usePageView();

  if (!forumDetail) {
    return null;
  }

  const publishedAt = format(forumDetail.publishedAt, 'dd-MM-yyyy');

  return (
    <>
      <Head>
        <title>
          Forum: Forum Detail
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
                {forumDetail.title}
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Stack spacing={3}>
            <div>
              <Chip label={forumDetail.category} />
            </div>
            <Typography variant="h3">
              {forumDetail.title}
            </Typography>
            <Typography
              color="text.secondary"
              variant="subtitle1"
            >
              {forumDetail.shortDescription}
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Avatar src={forumDetail.author.avatar} />
              <div>
                <Typography variant="subtitle2">
                  Đăng bởi
                  {' '}
                  {forumDetail.author.name}
                  {' '}
                  •
                  {' '}
                  {publishedAt}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {forumDetail.readTime} lượt đọc
                </Typography>
              </div>
            </Stack>
          </Stack>
          <Box
            sx={{
              backgroundImage: `url(${forumDetail.cover})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3
            }}
          />
          {forumDetail.content && (
            <Container sx={{ py: 3 }}>
              <ForumContent content={forumDetail.content} />
            </Container>
          )}
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            {comments.map((comment) => (
              <ForumComment
                key={comment.id}
                {...comment} />
            ))}
          </Stack>
          <Divider sx={{ my: 3 }} />
          <ForumCommentAdd />
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
