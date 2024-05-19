import Head from 'next/head';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';
import { usePageView } from '../../hooks/use-page-view';
import { useSettings } from '../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { AnalyticsStats } from '../../sections/dashboard/analytics/analytics-stats';
import { AnalyticsMostVisited } from '../../sections/dashboard/analytics/analytics-most-visited';
import { AnalyticsSocialSources } from '../../sections/dashboard/analytics/analytics-social-sources';
import { AnalyticsTrafficSources } from '../../sections/dashboard/analytics/analytics-traffic-sources';
import { AnalyticsVisitsByCountry } from '../../sections/dashboard/analytics/analytics-visits-by-country';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { useCallback, useEffect, useState } from 'react';
import { useMounted } from '../../hooks/use-mounted';
import { analyticsApi } from '../../api/analytics';



export const DashboardAdmin = () => {
    const settings = useSettings()
    const isMounted = useMounted();
    const [historyUser, setHistoryUser] = useState(null)
    const [historyLog, setHistoryLog] = useState(null)
    const [historyForum, setHistoryForum] = useState(null)

    const getApi = useCallback(async () => {
        try {
            const user = await analyticsApi.getHistoryUser()
            const log = await analyticsApi.getHistoryLog()
            const reponse = await analyticsApi.getHistoryForum()
            
            const forum = reponse.data.thisMonthLearnerForum.map(item => ({ x: item.forum_id, y: Number(item.total_access_time) }))

            if (isMounted()) {
                setHistoryUser(String(user.data.todayLogin));
                setHistoryLog(String(log.data.todayLearnerLog));
                setHistoryForum(forum);
            }
        } catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        getApi()
    }, [])

    return (
        <>
            <Box
                component="main"
            >
                <Container maxWidth={settings.stretch ? false : 'xl'}>
                <Grid
                    container
                    spacing={{
                        xs: 3,
                        lg: 4
                    }}
                >
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <AnalyticsStats title="Tổng lượt truy cập trong ngày" value = {historyUser}/>
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <AnalyticsStats title="Tổng lượt ghi nhận lịch sử học" value = {historyLog}/>
                    </Grid>
                    
                    <Grid
                        xs={12}
                        lg={12}
                        >
                        <AnalyticsTrafficSources
                            data={historyForum ? historyForum : []}
                        />
                    </Grid>
                    {/* <Grid
                        xs={12}
                        lg={4}
                    >
                    <AnalyticsVisitsByCountry
                        visits={[
                        {
                            id: 'us',
                            name: 'United States',
                            seoPercentage: 40,
                            value: 31200
                        },
                        {
                            id: 'uk',
                            name: 'United Kingdom',
                            seoPercentage: 47,
                            value: 12700
                        },
                        {
                            id: 'ru',
                            name: 'Russia',
                            seoPercentage: 65,
                            value: 10360
                        },
                        {
                            id: 'ca',
                            name: 'Canada',
                            seoPercentage: 23,
                            value: 5749
                        },
                        {
                            id: 'de',
                            name: 'Germany',
                            seoPercentage: 45,
                            value: 2932
                        },
                        {
                            id: 'es',
                            name: 'Spain',
                            seoPercentage: 56,
                            value: 200
                        }
                        ]}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    lg={8}
                    >
                    <AnalyticsMostVisited
                        pages={[
                        {
                            bounceRate: 16,
                            uniqueVisits: 8584,
                            url: '/',
                            visitors: 95847
                        },
                        {
                            bounceRate: 5,
                            uniqueVisits: 648,
                            url: '/auth/login',
                            visitors: 7500
                        },
                        {
                            bounceRate: 2,
                            uniqueVisits: 568,
                            url: '/dashboard',
                            visitors: 85406
                        },
                        {
                            bounceRate: 12,
                            uniqueVisits: 12322,
                            url: '/blog/top-5-react-frameworks',
                            visitors: 75050
                        },
                        {
                            bounceRate: 10,
                            uniqueVisits: 11645,
                            url: '/blog/understand-programming-principles',
                            visitors: 68003
                        },
                        {
                            bounceRate: 8,
                            uniqueVisits: 10259,
                            url: '/blog/design-patterns',
                            visitors: 49510
                        }
                        ]}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    lg={4}
                    >
                    <AnalyticsSocialSources
                        chartSeries={[10, 10, 20]}
                        labels={['Linkedin', 'Facebook', 'Instagram']}
                    />
                    </Grid> */}
                </Grid>
                </Container>
            </Box>
        </>
    )
}