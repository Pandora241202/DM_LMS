import Head from 'next/head';
import { useState, useCallback, useEffect } from 'react';
import Shuffle01Icon from '@untitled-ui/icons-react/build/esm/Shuffle01';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { usePageView } from '../../../hooks/use-page-view';
import { useSettings } from '../../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { LearningPathDoneLOs } from '../../../sections/dashboard/learning-path/learning-path-done-LOs';
import { LearningPathProcessLOs } from '../../../sections/dashboard/learning-path/learning-path-process-LOs';
import { LearningPathLockedLOs } from '../../../sections/dashboard/learning-path/learning-path-locked-LOs';
import { useMounted } from '../../../hooks/use-mounted';
import { learningPathApi } from '../../../api/learning-path';
import { useRouter } from 'next/router';
import { paths } from '../../../paths';
import { useAuth } from '../../../hooks/use-auth';

import * as consts from '../../../constants';

const useLOs = () => {
  const isMounted = useMounted();
  const [LOs, setLOs] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getLearningPath = useCallback(async () => {
    try {
      const response = await learningPathApi.getLearningPath(user.id);

      if (isMounted()) {
        if (response.data.length == 0) {
          router.push(paths.dashboard.learningPaths.create);
        } else {
          setLOs(response.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getLearningPath();
  },[]);

  return LOs;
};

const Page = () => {
  const LOs = useLOs();
  const settings = useSettings();

  const [page, setPage] = useState(0);

  useEffect(() => {
    const onProcessingLOPage = LOs ? Math.floor((LOs.map(LO => LO.score == 0).indexOf(true) - 1) / consts.LOS_PER_PAGE) : 0;
    setPage(onProcessingLOPage >= 0 ? onProcessingLOPage : 0);
  },[LOs]);

  usePageView();

  return (
    <>
      <Head>
        <title>
          LearningPath: LOs list 
        </title>
      </Head> 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Lộ trình học của bạn
                  </Typography>
                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >
                    <Button
                      startIcon={(
                        <SvgIcon>
                          <Shuffle01Icon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      Thay đổi mục tiêu
                    </Button>
                  </Stack>
                </div>
              </Stack>
            </Grid>
            {LOs
            .slice(page*consts.LOS_PER_PAGE, page*consts.LOS_PER_PAGE + consts.LOS_PER_PAGE)
            .map((LO, index) => {
              const LearningPathLOs = LO.score*10 >= consts.PERCENTAGE_TO_PASS_LO ? LearningPathDoneLOs : (page*consts.LOS_PER_PAGE + index == 0 || LOs[page*consts.LOS_PER_PAGE + index - 1].score*10 >= consts.PERCENTAGE_TO_PASS_LO) ? LearningPathProcessLOs : LearningPathLockedLOs;
              console.log(LO.Topic)
              return (
                <Grid
                  xs={12}
                  md={4}
                  key={LO.id}
                >
                  <LearningPathLOs id={LO.id} topic={LO.Topic.title} learningObject={LO.name} finished={LO.score * 10} />
                </Grid>
              )
            })}
            <Grid xs={12}>
              <Box mt={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  disabled={page == 0}
                  onClick={() => {
                    setPage(page - 1);
                    window.scrollTo(0, 0);
                  }}
                  startIcon={(
                    <SvgIcon>
                      <ArrowLeftIcon />
                    </SvgIcon>
                  )}
                >
                </Button>
                <Typography variant="body1">
                  {page + 1} / {Math.ceil(LOs.length / consts.LOS_PER_PAGE)}
                </Typography>
                <Button
                  disabled={page == Math.floor(LOs.length / consts.LOS_PER_PAGE)}
                  onClick={() => {
                    setPage(page + 1);
                    window.scrollTo(0, 0);
                  }}
                  endIcon={(
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  )}
                >
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
