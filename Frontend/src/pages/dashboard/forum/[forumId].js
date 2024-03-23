import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
import { userApi } from '../../../api/user';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { ForumComment } from '../../../sections/dashboard/forum/forum-comment';
import { ForumCommentAdd } from '../../../sections/dashboard/forum/forum-comment-add';
import { ForumContent } from '../../../sections/dashboard/forum/forum-content';

const useComments = () => {
  const isMounted = useMounted();
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const getComments = useCallback(async () => {
    try {
      if (router.isReady) {
        const forumId = router.query.forumId;
        const response = await forumApi.getComments(forumId);
        console.log(response);
        const commentsInfo = await Promise.all(response.data.map(async r => {
          const userResponse = await userApi.getUser(r.authenticatedUserId);
          return {
            ...r,
            replies: [], 
            authorAvatar: userResponse.avatar,
            authorName: userResponse.username,
            authorRole: "",
            isLiked: true,
            likes: 12,
          }
        }));

        if (isMounted()) {
          let commentsWithRep = [];
          let map = new Map();
          commentsInfo.map(c => {
            map.set(c.id, c);
          })
          commentsInfo.map(c => {
            if (c.statementId != null) {
              map.get(c.statementId).replies.push(c);
            } else {
              commentsWithRep.push(c);
            }
          })
          setComments(commentsWithRep);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted,router.isReady]);

  useEffect(() => {
      getComments();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]);

  return comments;

  /*return [
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
  ];*/
};

const useForumDetail = () => {
  const isMounted = useMounted();
  const [forumDetail, setForumDetail] = useState(null);
  const router = useRouter();

  const getForumDetail = useCallback(async () => {
    try {
      if (router.isReady) {
        const forumId = router.query.forumId;
        const response = await forumApi.getForumDetail(forumId);
        console.log(response);
        const userResponse = await userApi.getUser(response.data.userId);
        if (isMounted()) {
          setForumDetail({
            ...response.data, 
            cover: '/assets/covers/minimal-1-4x4-large.png',
            author: {
              avatar: userResponse.avatar,
              name: userResponse.username
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted,router.isReady]);

  useEffect(() => {
      getForumDetail();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]);

  return forumDetail;
};

const Page = () => {
  const forumDetail = useForumDetail();
  const comments = useComments();

  usePageView();

  if (!forumDetail) {
    return null;
  }

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
            <div style={{marginTop: 10}}>
             {forumDetail.label.map((l, index) => <Chip key={index} label={l} sx={{mr: 1, mb: 1}} />)}
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
                  {forumDetail.createdAt}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {forumDetail.readTimes} lượt đọc
                </Typography>
              </div>
            </Stack>
            {forumDetail.updatedAt !== forumDetail.createdAt && 
              <Typography
                variant="body2"
                color="text.secondary"
                sx ={{ fontStyle: 'italic' }}
              >
                • Cập nhật lần cuối {forumDetail.updatedAt}
              </Typography>
            }
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
