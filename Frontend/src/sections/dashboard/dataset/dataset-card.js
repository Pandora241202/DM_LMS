import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { paths } from '../../../paths';
import { useState, useEffect } from 'react';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import { datasetApi } from '../../../api/dataset';

export const DatasetCard = (props) => {
  const {
    authorAvatar,
    authorName,
    filesCount,
    description,
    votes,
    title,
    id,
    updatedAt
  } = props;

  const [votesValue, setVotesValue] = useState(votes);
  const [upVote, setUpVote] = useState([]);

  useEffect(() => {
    const updateDataset = async() => {
      await datasetApi.putDataset(id, {votes: votesValue})
      .then((response) => {console.log(response);})
      .catch(error => {
        console.error('Error putting data:', error);
      })
    }
    updateDataset();
  }, [votesValue]); 

  return (
    <Card 
      variant="outlined"
      sx={{ width: 250, height: 235, borderColor: "text.disabled"}}
    >
      <CardActionArea href={paths.dashboard.model.details.replace(':modelId', id)}>
        <CardContent sx={{borderBottom: "1px solid", borderColor: "text.disabled"}}>
          <Typography color="text.primary" variant="h6" mb={2}>{title}</Typography>
          <Typography mb={1} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13, whiteSpace: 'nowrap' }} color="text.primary" variant="body2">{description?description:"No description"}</Typography>
          <Typography mb={1} color="text.primary" variant="body2" sx={{ fontSize: 13 }}>{filesCount} tệp</Typography> 
          <Typography color="text.primary" variant="body2" sx={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{authorName} - Cập nhật mới nhất {updatedAt}</Typography> 
        </CardContent>
      </CardActionArea>
      <CardContent sx={{py: 1}}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center">
            <ToggleButtonGroup
              value={upVote}
              onChange={(e, value) => {
                setVotesValue(value.length == 1 ? votesValue+1 : votesValue-1);
                setUpVote(value);
              }}
            >
              <ToggleButton size="small" value={true}><KeyboardDoubleArrowUpOutlinedIcon fontSize='small'/></ToggleButton>
            </ToggleButtonGroup>
            <Typography color="text.primary" variant="h6" sx={{ ml: 1 }}>{votesValue}</Typography>
          </Stack>
          <Avatar src={authorAvatar} style={{width: 30, height: 30}}/>
        </Stack>
      </CardContent>
    </Card>

    
  );
};

DatasetCard.propTypes = {
  id: PropTypes.number.isRequired,
  authorAvatar: PropTypes.string,
  authorName: PropTypes.string.isRequired,
  filesCount: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
