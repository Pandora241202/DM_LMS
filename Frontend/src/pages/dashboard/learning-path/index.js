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
import { usePageView } from '../../../hooks/use-page-view';
import { useSettings } from '../../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { LearningPathDoneLOs } from '../../../sections/dashboard/learning-path/learning-path-done-LOs';
import { LearningPathProcessLOs } from '../../../sections/dashboard/learning-path/learning-path-process-LOs';
import { LearningPathLockedLOs } from '../../../sections/dashboard/learning-path/learning-path-locked-LOs';
import { useMounted } from '../../../hooks/use-mounted';
import { learningPathApi } from '../../../api/learning-path';

const consts = require('../../../constants');

const useLOs = () => {
  const isMounted = useMounted();
  const [LOs, setLOs] = useState([]);

  const getLOs = useCallback(async () => {
    try {
      const response = await learningPathApi.getLOs();

      if (isMounted()) {
        setLOs(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getLOs();
  },[]);

  return LOs;
};

const Page = () => {
  const LOs = useLOs();
  const settings = useSettings();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const onProcessingLOPage = Math.floor((LOs.map(LO => LO.finished == 0).indexOf(true) - 1) / consts.LOS_PER_PAGE)
    setPage(onProcessingLOPage >= 0 ? onProcessingLOPage : 0);
  },[LOs]);

  console.log(page);
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
            .map(LO => {
              const LearningPathLOs = LO.finished >= 80 ? LearningPathDoneLOs : LO.finished == 0 ? LearningPathLockedLOs : LearningPathProcessLOs;
              return (
                <Grid
                  xs={12}
                  md={4}
                  key={LO.id}
                >
                  <LearningPathLOs id={LO.id} topic={LO.topic} learningObject={LO.learningObject} finished={LO.finished} />
                </Grid>
              )
            })}
            <Grid xs={12}>
              <Box mt={4}
                display="flex"
                justifyContent="center"
              >
                <Button
                  disabled={page == 0}
                  onClick={() => {
                    setPage(page - 1);
                    window.scrollTo(0, 0);
                  }}
                >
                  Trước
                </Button>
                <Button
                  disabled={page == Math.floor(LOs.length / consts.LOS_PER_PAGE)}
                  onClick={() => {
                    setPage(page + 1);
                    window.scrollTo(0, 0);
                  }}
                >
                  Sau
                </Button>
              </Box>
            </Grid>
          </Grid>
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
