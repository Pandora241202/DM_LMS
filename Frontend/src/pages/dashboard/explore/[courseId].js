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
import { LMManageListSearch } from '../../../sections/dashboard/explore/explore-list-search';
import { LMManageListTable } from '../../../sections/dashboard/explore/explore-list-table';
import { applyPagination } from '../../../utils/apply-pagination';
import CollapsibleTable from '../../../sections/dashboard/explore/lesson-list-table';
import { exploreApi } from '../../../api/explore';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      type: [],
      topicId: [],
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


const useLMs = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    LMs: [],
    LMsCount: 0
  });

  const getLMs = useCallback(async () => {
    try {
      // const response = await lm_manageApi.getLMs(search);
      const response = await lm_manageApi.getLMs();
      let data = response.data;
      if (typeof search.filters !== 'undefined') {
        data = data.filter((lm) => {
          if (typeof search.filters.name !== 'undefined' && search.filters.name !== '') {
            const nameMatched = lm.name.toLowerCase().includes(filters.name.toLowerCase());
  
            if (!nameMatched) {
              return false;
            }
          }
  
          // It is possible to select multiple type options
          if (typeof search.filters.type !== 'undefined' && search.filters.type.length > 0) {
            const categoryMatched = search.filters.type.includes(lm.type);
  
            if (!categoryMatched) {
              return false;
            }
          }
  
          // It is possible to select multiple topicId options
          if (typeof search.filters.topicId !== 'undefined' && search.filters.topicId.length > 0) {
            const statusMatched = search.filters.topicId.includes(lm.topicId);
  
            if (!statusMatched) {
              return false;
            }
          }
  
          // Present only if filter required
          if (typeof search.filters.inStock !== 'undefined') {
            const stockMatched = lm.inStock === search.filters.inStock;
  
            if (!stockMatched) {
              return false;
            }
          }
  
          return true;
        });
      }
  
      // if (typeof search.page !== 'undefined' && typeof search.rowsPerPage !== 'undefined') {
      //   data = applyPagination(data, search.page, search.rowsPerPage);
      // }

      if (isMounted()) {
        setState({
          LMs: data,
          LMsCount: data.length
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



const LessonList = () => {
  const { search, updateSearch } = useSearch();
  const { LMs, LMsCount } = useLMs(search);
  const courseUrl = window.location.href.split('/');
  const courseId = (courseUrl[courseUrl.length - 1]);
  const [lessonList, setLessonList] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");

  useEffect(() => {(async () => {
    try {
      const response = await exploreApi.detailCourse(courseId);
      setLessonList(response.data.lessons)
      setCourseTitle(response.data.name)

    } catch (err) {
      console.error(err);
    }
  })()}, []);

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
                  {courseTitle}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.explore}
                    variant="subtitle2"
                  >
                    Trang chủ
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={`${paths.dashboard.explore}/create`}
                    variant="subtitle2"
                  >
                    Tạo khoá học mới
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
                  href={`${paths.dashboard.explore}/lesson/${courseId}`}
                  data = {10}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Thêm bài học mới
                </Button>
              </Stack>
            </Stack>
            <Card>
              {/* <LMManageListSearch onFiltersChange={handleFiltersChange} />
              <LMManageListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                LMs={LMs}
                LMsCount={LMsCount}
                rowsPerPage={search.rowsPerPage}
              /> */}
              <CollapsibleTable 
                rows={lessonList}  
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

LessonList.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default LessonList;
