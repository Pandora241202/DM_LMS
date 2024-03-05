import Head from 'next/head';
import { useState } from 'react'; // Import useState hook
import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
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
import { OverviewBanner } from '../../../sections/dashboard/overview/overview-banner';
import { OverviewDoneTasks } from '../../../sections/dashboard/overview/overview-done-tasks';
import { OverviewEvents } from '../../../sections/dashboard/overview/overview-events';
import { OverviewInbox } from '../../../sections/dashboard/overview/overview-inbox';
import { OverviewTransactions } from '../../../sections/dashboard/overview/overview-transactions';
import { OverviewPendingIssues } from '../../../sections/dashboard/overview/overview-pending-issues';
import { OverviewSubscriptionUsage } from '../../../sections/dashboard/overview/overview-subscription-usage';
import { OverviewHelp } from '../../../sections/dashboard/overview/overview-help';
import { OverviewJobs } from '../../../sections/dashboard/overview/overview-jobs';
import { OverviewOpenTickets } from '../../../sections/dashboard/overview/overview-open-tickets';
import { OverviewTips } from '../../../sections/dashboard/overview/overview-tips';
import { LearningObject } from '../../../sections/dashboard/overview/learning-object';
import { Learning_Path_List } from '../../../sections/dashboard/overview/learning-path-list';
const now = new Date();

const Page = () => {
  const settings = useSettings();
  const [page, setPage] = useState(1); // State to manage current page
  const tasksPerPage = 10; // Number of tasks per page

  usePageView();

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Overview | Devias Kit PRO
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
                    Your Learning Path
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
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      New Dashboard
                    </Button>
                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewDoneTasks amount={31} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewPendingIssues amount={12} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewOpenTickets amount={5} />
            </Grid>
            {/* Render Learning Path Lisi */}
            <Learning_Path_List page={page} />
            {/* Pagination controls */}
            <Grid xs={12}>
              <Box mt={4}
                display="flex"
                justifyContent="center"
              >
                <Button
                  disabled={page === 0}
                  onClick={handlePrevPage}
                >
                  Previous Page
                </Button>
                <Button
                  disabled={page * tasksPerPage >= 100}
                  onClick={handleNextPage}
                >
                  Next Page
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
