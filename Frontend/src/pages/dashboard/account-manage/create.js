import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { AccountCreateForm } from '../../../sections/dashboard/account-manage/account-manage-create-form';

const AccountCreate = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Account Create
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
                Tạo một tài liệu học mới
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
                  href={paths.dashboard.account_manage}
                  variant="subtitle2"
                >
                  Quản lý tài liệu học tập
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Tạo mới
                </Typography>
              </Breadcrumbs>
            </Stack>
            <AccountCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

AccountCreate.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AccountCreate;
