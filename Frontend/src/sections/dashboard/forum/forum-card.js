import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { paths } from '../../../paths';
import { getInitials } from '../../../utils/get-initials';

const initialCover = '/assets/covers/abstract-1-4x3-large.png';

export const ForumCard = (props) => {
  const {
    authorAvatar,
    authorName,
    label,
    cover,
    createdAt,
    readTimes,
    shortDescription,
    rating,
    title,
    id,
    ...other
  } = props;

  return (
    <Card {...other}>
      <CardMedia
        component={NextLink}
        href={paths.dashboard.forum.forumDetails.replace(':forumId', id)}
        image={cover?cover:initialCover}
        sx={{ height: 280 }}
      />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          {label.map((l, index) => <Chip key={index} label={l} sx={{mr: 1, mb: 1}} />)}
        </Box>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.dashboard.forum.forumDetails.replace(':forumId', id)}
          variant="h5"
        >
          {title}
        </Link>
        <Typography
          color="text.secondary"
          sx={{
            height: 48,
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2
          }}
          variant="body1"
        >
          {shortDescription}
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Avatar src={authorAvatar}>
              {getInitials(authorName)}
            </Avatar>
            <Typography variant="subtitle2">
              Đăng bởi
              {' '}
              {authorName}
              {' '}
              •
              {' '}
              {createdAt}
            </Typography>
          </Stack>
          <Typography
            align="right"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
            variant="body2"
          >
            {readTimes} lượt đọc
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

ForumCard.propTypes = {
  id: PropTypes.number.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  label: PropTypes.array.isRequired,
  cover: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  readTimes: PropTypes.number.isRequired,
  shortDescription: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
