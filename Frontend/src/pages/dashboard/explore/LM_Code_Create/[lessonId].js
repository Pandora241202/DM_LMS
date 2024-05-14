import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsSeparator } from '../../../../components/breadcrumbs-separator';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { paths } from '../../../../paths';
import { LMCreateForm } from '../../../../sections/dashboard/explore/LM-Manage/lm-manage-create-code';

const LMCreate = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: LM Create | Devias Kit PRO
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
                Tạo tài liệu code mới
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
                  href={paths.dashboard.LM_Manage}
                  variant="subtitle2"
                >
                  Danh sách bài học
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Tạo mới
                </Typography>
              </Breadcrumbs>
            </Stack>
            <LMCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

LMCreate.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default LMCreate;
