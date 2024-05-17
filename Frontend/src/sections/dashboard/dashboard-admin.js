import { Button, Grid, SvgIcon } from "@mui/material"
import { AnalyticsStats } from "./analytics/analytics-stats"
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Stack } from "@mui/system";
import { useState } from "react";

export const DashboardAdmin = () => {
    const [data, setData] = useState([
        {
            data: [0, 170, 242, 98, 63, 56, 85, 171, 209, 163, 204, 21, 264, 0]
        }
    ])
    return (
        <>
            <Stack>
                <Grid
                    xs={12}
                    md={4}
                    >
                    <AnalyticsStats
                        action={(
                        <Button
                            color="inherit"
                            endIcon={(
                            <SvgIcon>
                                <ArrowRightIcon />
                            </SvgIcon>
                            )}
                            size="small"
                        >
                            See sources
                        </Button>
                        )}
                        chartSeries={data}
                        title="Impressions"
                        value="36,6K"
                    />
                    </Grid>
            </Stack>
        </>
    )
}