import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { usePageView } from '../../../hooks/use-page-view';
import { useSettings } from '../../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { AcademyDailyProgress } from '../../../sections/dashboard/academy/academy-daily-progress';
import { AcademyFind } from '../../../sections/dashboard/academy/academy-find';
import { CourseCard } from '../../../sections/dashboard/academy/course-card';
import { CourseSearch } from '../../../sections/dashboard/academy/course-search';
import { useMounted } from '../../../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { userApi } from '../../../api/user';
import { useAuth } from '../../../hooks/use-auth';
import * as consts from '../../../constants';

const useCourses = (id) => {
  const isMounted = useMounted();
  const [listCourses, setListCourses] = useState([{
        lastestLessonMinuteComplete: 0,
        lastestLesson: {
            id: 0,
            title: "",
            amountOfTime: 0,
        },
        course: {
            id: 0,
            name: ""
        }
    }]);

  const getListCourses = useCallback(async () => {
    try {
        const response = await userApi.getUserCourses(id)
        if (isMounted()) {
          setListCourses(response.data);
        }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getListCourses();
  }, [id]);
  return listCourses; 
};

const Page = () => {
  const settings = useSettings();
  const {user} = useAuth()
  const courses = useCourses(user.id);
  const [page, setPage] = useState(0);

  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Academy Dashboard
        </title>
      </Head>
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Box sx={{ py: '64px' }}>
          <Container maxWidth={settings.stretch ? false : 'xl'}>
             <Grid
              container
              spacing={{
                xs: 3,
                lg: 4
              }}
            >
              <Grid xs={12}>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Typography variant="h3">
                    Các khóa học đã đăng kí
                  </Typography>
                </Stack>
              </Grid>
              {courses
              .slice(page*consts.FORUMS_PER_PAGE, page*consts.FORUMS_PER_PAGE + consts.FORUMS_PER_PAGE)
              .map((history) => (
                <Grid
                  key={history.course.id}
                  xs={12}
                  md={4}
                >
                  <CourseCard course={history.course} />
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
              />
              <Typography variant="body1">
                {page + 1} / {Math.ceil(courses.length / consts.FORUMS_PER_PAGE)}
              </Typography>
              <Button
                disabled={page == Math.floor(courses.length / consts.FORUMS_PER_PAGE)}
                endIcon={(
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                )}
                onClick={() => {
                  setPage(page + 1);
                  window.scrollTo(0,0);
                }}
              />
            </Stack>
          </Container>
        </Box>
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
