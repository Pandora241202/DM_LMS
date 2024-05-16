import { userApi } from "../../api/user"
import { useAuth } from "../../hooks/use-auth"
import { useMounted } from "../../hooks/use-mounted";
import { useCallback, useEffect, useState } from "react";
import { CourseCard } from "./academy/course-card";
import { usePageView } from "../../hooks/use-page-view";
import { Grid, Typography, backdropClasses } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { grey } from "@mui/material/colors";
import { AcademyDailyProgress } from "./academy/academy-daily-progress";

const useListCourses = (id) => {
  const isMounted = useMounted();
  const [listCourses, setListCourses] = useState([{
        lastestLessonPercentComplete: 0,
        lastestLesson: {
            id: 0,
            title: ""
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

export const DashboardLearner = () => {
    const { user } = useAuth()
    const listCourses = useListCourses(user.id)

    return (
        <>
            <Grid
                xs={12}
                md={9}
            >
                <AcademyDailyProgress
                    currentProgress={listCourses[0].lastestLessonPercentComplete}
                    lessonName={listCourses[0].lastestLesson? listCourses[0].lastestLesson.title : listCourses[0].course.name}
                />
            </Grid>
            <>
                <div>
                    <Typography variant="h5" marginBottom={3}>
                        Các khóa học gần đây
                    </Typography>
                </div>
                <Stack
                    direction={"row"}
                    spacing={2}
                >   
                    {
                        listCourses && listCourses.map(history => (
                            <Grid
                                key={history.course.id}
                                xs={12}
                                md={6}
                                border= {grey[50]}
                            >
                                <CourseCard course={history.course} />
                            </Grid>   
                        ))
                    }
                </Stack>
            </>
        </>
    )
}