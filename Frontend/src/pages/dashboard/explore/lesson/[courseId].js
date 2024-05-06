import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsSeparator } from '../../../../components/breadcrumbs-separator';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { paths } from '../../../../paths';
import { LessonCreateForm } from '../../../../sections/dashboard/explore/lesson-create-form';

const LessonCreate = (props) => {
  console.log(props)
  const courseUrl = window.location.href.split('/');
  const courseId = (courseUrl[courseUrl.length - 1]);
  usePageView();

  return (
    <>
      <Head>
        <title>
        Dashboard: Lesson Create
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
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">
                Tạo một bài học mới
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.index}
                  variant="subtitle2"
                >
                  Trang chủ
                </Link>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={`${paths.dashboard.explore}/${courseId}`}
                  variant="subtitle2"
                >
                  Khoá học
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Tạo bài học mới
                </Typography>
              </Breadcrumbs>
            </Stack>
            <LessonCreateForm 
              courseid = {courseId}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

LessonCreate.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default LessonCreate;
