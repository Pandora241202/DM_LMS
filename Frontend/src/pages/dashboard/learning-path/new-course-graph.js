import Head from 'next/head';
import { useState, useCallback, useEffect, useMemo } from 'react';
import Shuffle01Icon from '@untitled-ui/icons-react/build/esm/Shuffle01';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  LinearProgress
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
import { ChooseGoalLearningPathDialog } from '../../../sections/dashboard/learning-path/choose-goal-learning-path-dialog';
import { BaseInfoLearningPathDialog } from '../../../sections/dashboard/learning-path/base-info-learning-path-dialog';

const initialLOs = [
    [
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code49",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"}
    ],
    [
        {"Topic": {id: 1, title: 'Fundamentals', subject: 'EXPERT'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code53",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"}, 
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"},
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"},
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"},
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"},
    ],
    [
        {"Topic": {id: 1, title: 'Fundamentals', subject: 'EXPERT'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code53",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"}, 
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"},
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"}
    ],
    [
        {"Topic": {id: 1, title: 'Fundamentals', subject: 'EXPERT'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code53",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"}, 
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"},
        {"Topic": {id: 1, title: 'Matrices and linear algebra fundamentals', subject: 'FUNDAMENTALS'} ,
        "attempts" : 0,
        "difficulty" : 0.07954297954178513,
        "id" : 260,
        "name" : "Code59",
        "rating" : 5,
        "score" : 0,
        "time": 0,
        "type": "CODE"}
    ]
]

const TopicRow = ({LOs, page}) => {  
    console.log(LOs[0])  
    return (
        // <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                {LOs.map((LO, index) => {
                    const LearningPathLOs = LO.score >= consts.PERCENTAGE_TO_PASS_LO ? LearningPathDoneLOs 
                                                                                    : (page*consts.LOS_PER_PAGE + index == 0 || LOs[page*consts.LOS_PER_PAGE + index - 1].score >= consts.PERCENTAGE_TO_PASS_LO) ? LearningPathProcessLOs 
                                                                                    : LearningPathLockedLOs;
                    return (
                        <Grid
                            xs={12}
                            md={4}
                            key={LO.id}
                        >
                            <LearningPathLOs id={LO.id} topic={LO.Topic.title} learningObject={LO.name} finished={LO.score} />
                        </Grid>
                    );
                })}
            </Stack>
        // </Box>
    );
}

export const TopicGraph = ({LOs = initialLOs, page}) => {
    return (
        <>
            <Stack direction="row">
                <Stack direction="column" spacing={5}>
                    {LOs.map((rowLOs, rowIndex) => (
                        <TopicRow key={rowIndex} LOs={rowLOs} page={page} />
                    ))}
                </Stack>
            </Stack>
        </>
    )
}
