import Head from 'next/head';
import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  LinearProgress
} from '@mui/material';
import { usePageView } from '../../../hooks/use-page-view';
import { useSettings } from '../../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { ChooseGoalLearningPathDialog } from '../../../sections/dashboard/learning-path/choose-goal-learning-path-dialog';
import { BaseInfoLearningPathDialog } from '../../../sections/dashboard/learning-path/base-info-learning-path-dialog';
import { learningPathApi } from '../../../api/learning-path';
import { paths } from '../../../paths';
import { useRouter } from 'next/router';

const Page = () => {
  const settings = useSettings();
  const router = useRouter();

  const [openSelectGoalDialog, setOpenSelectGoalDialog] = useState(false);
  const [openBaseInfoDialog, setOpenBaseInfoDialog] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [baseInfoAnswer, setBaseInfoAnswer] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleConfirmButton = useCallback(async () => {
    setOpenBaseInfoDialog(false);
    setLoading(true);
    setTimeout(async function (){
      await learningPathApi.createLearningPath({
        "goal": selectedGoals[-1],
        "learningStyleQA": [...baseInfoAnswer.slice(2)],
        "backgroundKnowledge": baseInfoAnswer.length == 0 ? null : baseInfoAnswer[1],
        "qualification": baseInfoAnswer.length == 0 ? null : baseInfoAnswer[0]
      })
        .then((response) => {
          console.log(response);
          router.push(paths.dashboard.learningPaths.index);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error posting data:', error);
        })
    }, 2000);
    // await learningPathApi.createLearningPath({
    //   "goal": selectedGoals[-1],
    //   learningStyleQA: [...baseInfoAnswer.slice(2)],
    //   "backgroundKnowledge": baseInfoAnswer.length == 0 ? null : baseInfoAnswer[1],
    //   "qualification": baseInfoAnswer.length == 0 ? null : baseInfoAnswer[0]
    // })
    //   .then((response) => {
    //     console.log(response);
    //     router.push(paths.dashboard.learningPaths.index);
    //   })
    //   .catch(error => {
    //     setLoading(false);
    //     console.error('Error posting data:', error);
    //   })
  }, [selectedGoals, baseInfoAnswer])

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
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Lộ trình học của bạn
                  </Typography>
                </div>
                {!loading && 
                <Stack justifyContent="space-between" spacing={2}>
                  <div>
                    <Typography variant="body1">
                      Bạn hiện chưa có lộ trình học
                    </Typography>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => setOpenSelectGoalDialog(true)}
                    >
                      Tạo ngay!
                    </Button>
                  </div>
                </Stack>}
                {loading && 
                <Stack justifyContent="space-between" spacing={2}>
                  <div>
                    <Typography variant="body1">
                      Lộ trình học cá nhân của bạn đang được khởi tạo, vui lòng chờ...
                    </Typography>
                  </div>
                  <LinearProgress />
                </Stack>}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {openSelectGoalDialog && <ChooseGoalLearningPathDialog 
        onClose={() => {
          setSelectedGoals([]);
          setOpenSelectGoalDialog(false);
        }}
        onContinue={() => {
          setOpenSelectGoalDialog(false);
          setOpenBaseInfoDialog(true);
        }}
        open={openSelectGoalDialog}
        setSelectedGoals={setSelectedGoals}
        selectedGoals={selectedGoals}
      />}
      {openBaseInfoDialog && <BaseInfoLearningPathDialog 
        onClose={() => {
          setSelectedGoals([]);
          setBaseInfoAnswer([]);
          setOpenBaseInfoDialog(false);
        }}
        onContinue={() => {
          handleConfirmButton();
        }}
        onBack={() => {
          setOpenSelectGoalDialog(true);
          setOpenBaseInfoDialog(false);
          setBaseInfoAnswer([]);
        }}
        open={openBaseInfoDialog}
        setBaseInfoAnswer={setBaseInfoAnswer}
        baseInfoAnswer={baseInfoAnswer}
      />}
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
