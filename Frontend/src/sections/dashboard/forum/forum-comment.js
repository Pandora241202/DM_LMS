import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const translation_dict = {
  "seconds": "giây",
  "minutes": "phút",
  "second": "giây",
  "minute": "phút",
  "hours": "giờ",
  "hour": "giờ",
  "day": "ngày",
  "week": "tuần",
  "month": "tháng",
  "year": "năm",
  "days": "ngày",
  "weeks": "tuần",
  "months": "tháng",
  "years": "năm",
  "ago": "trước",
  "yesterday": "hôm qua",
  "today": "hôm nay",
  "tomorrow": "ngày mai",
  "last week": "tuần trước",
  "next month": "tháng sau",
  "a few": "vài",
  "about": "khoảng"
}

function translateToVietnamese(sentence) {
  for (let enTerm in translation_dict) {
      if (Object.prototype.hasOwnProperty.call(translation_dict, enTerm)) {
          const viTerm = translation_dict[enTerm];
          const regex = new RegExp(enTerm, 'gi');
          sentence = sentence.replace(regex, viTerm);
      }
  }
  return sentence;
}

export const ForumComment = (props) => {
  const {
    authorAvatar,
    authorName,
    authorRole,
    content,
    updatedAt,
    isLiked: isLikedProp,
    likes: likesProp,
    forumId,
    authenticatedUserId,
    statementId,  
    ...other
  } = props;

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      spacing={2}
      {...other}>
      <Avatar src={authorAvatar} />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'neutral.900'
            : 'neutral.100',
          borderRadius: 1,
          p: 2,
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle2">
            {authorName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {translateToVietnamese(formatDistanceToNow(new Date(updatedAt), { addSuffix: true }))}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ mt: 1 }}
        >
          {content}
        </Typography>
      </Box>
    </Stack>
  );
};

ForumComment.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorRole: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  forumId: PropTypes.number.isRequired,
  authenticatedUserId: PropTypes.number.isRequired,
  statementId: PropTypes.number
};
