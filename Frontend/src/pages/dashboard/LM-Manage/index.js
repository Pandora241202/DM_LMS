import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { lm_manageApi } from '../../../api/LM-Manage';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { LMManageListSearch } from '../../../sections/dashboard/LM-Manage/lm-manage-list-search';
import { LMManageListTable } from '../../../sections/dashboard/LM-Manage/lm-manage-list-table';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined
    },
    page: 0,
    rowsPerPage: 5
  });

  return {
    search,
    updateSearch: setSearch
  };
};

// const useProducts = (search) => {
//   const isMounted = useMounted();
//   const [state, setState] = useState({
//     products: [],
//     productsCount: 0
//   });

//   const getProducts = useCallback(async () => {
//     try {
//       const response = await productsApi.getProducts(search);

//       if (isMounted()) {
//         setState({
//           products: response.data,
//           productsCount: response.count
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [search, isMounted]);

//   useEffect(() => {
//       getProducts();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [search]);

//   return state;
// };
const useLMs = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    LMs: [],
    LMsCount: 0
  });

  const getLMs = useCallback(async () => {
    try {
      const response = await lm_manageApi.getLMs(search);

      if (isMounted()) {
        setState({
          LMs: response.data,
          LMsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
      getLMs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);

  return state;
};

const LMList = () => {
  const { search, updateSearch } = useSearch();
  const { LMs, LMsCount } = useLMs(search);

  usePageView();

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters
    }));
  }, [updateSearch]);

  const handlePageChange = useCallback((event, page) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }));
  }, [updateSearch]);

  const handleRowsPerPageChange = useCallback((event) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, [updateSearch]);

  return (
    <>
      <Head>
        <title>
          Dashboard: Quản lý tài liệu học tập
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
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Quản lý tài liệu học tập
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
                    Quản lý tài liệu học tập
                  </Link>
                </Breadcrumbs>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={NextLink}
                  // Thay đổi đường dẫn để lưu vào db
                  href={`${paths.dashboard.LM_Manage}/create`}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Thêm tài liệu học tập
                </Button>
              </Stack>
            </Stack>
            <Card>
              <LMManageListSearch onFiltersChange={handleFiltersChange} />
              <LMManageListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                LMs={LMs}
                LMsCount={LMsCount}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

LMList.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default LMList;
