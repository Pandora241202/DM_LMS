import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { TopicCreateForm } from '../../../sections/dashboard/Topic-Manage/topic-create-form';

const TopicCreate = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Topic Create 
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
                Create a new product
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
                  href={paths.dashboard.products.index}
                  variant="subtitle2"
                >
                  Products
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Create
                </Typography>
              </Breadcrumbs>
            </Stack>
            <TopicCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

TopicCreate.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TopicCreate;
