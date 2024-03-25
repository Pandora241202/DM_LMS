import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import ArrowNarrowDownLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowNarrowDownLeft';
import ArrowNarrowDownRightIcon from '@untitled-ui/icons-react/build/esm/ArrowNarrowDownRight';
import ArrowNarrowDownIcon from '@untitled-ui/icons-react/build/esm/ArrowNarrowDown';
import ArrowNarrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowNarrowRight';
import { useSettings } from '../../../hooks/use-settings';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  Button,
  Grid,
  Container
} from '@mui/material';

import * as consts from '../../../constants';

export const ChooseGoalLearningPathDialog = (props) => {
  const { onClose, onContinue, open = false, selectedGoals, setSelectedGoals, ...other } = props;
  const settings = useSettings();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h6">
          Chọn mục tiêu của bạn
        </Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <Typography variant="subtitle1">Click chọn mục tiêu của bạn:</Typography>
        <Typography variant="body1" fontStyle="italic" fontSize={13} mb={2}>*Di chuột vào để xem thông tin chi tiết</Typography>
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            mb={2}
          >
            <Grid item xs={12} mb={1}>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <Button
                  variant="outlined"
                  sx = {{
                    borderColor: selectedGoals.includes(consts.LEARNER_GOAL_FUNDAMENTALS) ? "Highlight" : "lightgrey",
                    borderWidth: selectedGoals.includes(consts.LEARNER_GOAL_FUNDAMENTALS) ? 2 : 1,
                    
                    color: "text.primary",
                  }}
                  onClick={() => {
                    setSelectedGoals([consts.LEARNER_GOAL_FUNDAMENTALS]);
                  }}
                >
                  Kiến thức Căn bản (Fundamentals)
                </Button> 
              </div>
            </Grid>  
            <Grid item xs={4} mb={1}>
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <SvgIcon>
                  <ArrowNarrowDownLeftIcon />
                </SvgIcon>
              </div>
            </Grid>  
            <Grid item xs={4}></Grid>  
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "flex-start"}}>
                <SvgIcon>
                  <ArrowNarrowDownRightIcon />
                </SvgIcon>
              </div>
            </Grid>      
            <Grid item xs={4} mb={1}>
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="outlined"
                  sx = {{
                    borderColor: selectedGoals.includes(consts.LEARNER_GOAL_DATA_SCIENCE) ? "Highlight" : "lightgrey",
                    borderWidth: selectedGoals.includes(consts.LEARNER_GOAL_DATA_SCIENCE) ? 2 : 1,
                    color: "text.primary",
                  }}
                  onClick={() => {
                    setSelectedGoals([consts.LEARNER_GOAL_FUNDAMENTALS, consts.LEARNER_GOAL_DATA_SCIENCE]);
                  }}
                >
                  Khoa học dữ liệu (Data Science)
                </Button> 
              </div>
            </Grid>  
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="outlined"
                  sx = {{
                    borderColor: selectedGoals.includes(consts.LEARNER_GOAL_DATA_ENGINEER) ? "Highlight" : "lightgrey",
                    borderWidth: selectedGoals.includes(consts.LEARNER_GOAL_DATA_ENGINEER) ? 2 : 1,
                    color: "text.primary",
                  }}
                  onClick={() => {
                    setSelectedGoals([consts.LEARNER_GOAL_FUNDAMENTALS, consts.LEARNER_GOAL_DATA_ENGINEER]);
                  }}
                >
                  Kỹ thuật dữ liệu (Data Engineer)
                </Button> 
              </div>
            </Grid>
            <Grid item xs={4} mb={1}>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <SvgIcon>
                  <ArrowNarrowDownIcon />
                </SvgIcon>
              </div>
            </Grid>  
            <Grid item xs={4}></Grid>  
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <SvgIcon>
                  <ArrowNarrowDownIcon />
                </SvgIcon>
              </div>
            </Grid>   
            <Grid item xs={4} mb={1}>
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="outlined"
                  sx = {{
                    borderColor: selectedGoals.includes(consts.LEARNER_GOAL_MACHINE_LEARNING) ? "Highlight" : "lightgrey",
                    borderWidth: selectedGoals.includes(consts.LEARNER_GOAL_MACHINE_LEARNING) ? 2 : 1,
                    color: "text.primary",
                  }}
                  onClick={() => {
                    setSelectedGoals([consts.LEARNER_GOAL_FUNDAMENTALS, consts.LEARNER_GOAL_DATA_SCIENCE, consts.LEARNER_GOAL_MACHINE_LEARNING]);
                  }}
                >
                  Học máy (Machine Learning)
                </Button> 
              </div>
            </Grid>  
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="outlined"
                  sx = {{
                    borderColor: selectedGoals.includes(consts.LEARNER_GOAL_BIG_DATA_ENGINEER) ? "Highlight" : "lightgrey",
                    borderWidth: selectedGoals.includes(consts.LEARNER_GOAL_BIG_DATA_ENGINEER) ? 2 : 1,
                    color: "text.primary",
                  }}
                  onClick={() => {
                    setSelectedGoals([consts.LEARNER_GOAL_FUNDAMENTALS, consts.LEARNER_GOAL_DATA_ENGINEER, consts.LEARNER_GOAL_BIG_DATA_ENGINEER])
                  }}
                >
                  Kỹ thuật dữ liệu lớn (Big Data Engineer)
                </Button> 
              </div>
            </Grid>
            <Grid item xs={4} mb={1}>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <SvgIcon>
                  <ArrowNarrowDownIcon />
                </SvgIcon>
              </div>
            </Grid>  
            <Grid item xs={4}></Grid>  
            <Grid item xs={4}></Grid>  
            <Grid item xs={4} mb={1}>
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="outlined"
                  sx = {{
                    borderColor: selectedGoals.includes(consts.LEARNER_GOAL_DEEP_LEARNING) ? "Highlight" : "lightgrey",
                    borderWidth: selectedGoals.includes(consts.LEARNER_GOAL_DEEP_LEARNING) ? 2 : 1,
                    color: "text.primary",
                  }}
                  onClick={() => {
                    setSelectedGoals([consts.LEARNER_GOAL_FUNDAMENTALS, consts.LEARNER_GOAL_DATA_SCIENCE, consts.LEARNER_GOAL_MACHINE_LEARNING, consts.LEARNER_GOAL_DEEP_LEARNING]);
                  }}
                >
                  Học sâu (Deep Learning)
                </Button> 
              </div>
            </Grid>  
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Container>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Button
            variant="inherit"
            endIcon={(
              <SvgIcon>
                <ArrowNarrowRightIcon />
              </SvgIcon>
            )}
            disabled={selectedGoals.length == 0}
            onClick={onContinue}
          >
            Tiếp theo
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
};

ChooseGoalLearningPathDialog.propTypes = {
  onClose: PropTypes.func,
  onContinue: PropTypes.func,
  open: PropTypes.bool,
  setSelectedGoals: PropTypes.func,
  selectedGoals: PropTypes.array
};
