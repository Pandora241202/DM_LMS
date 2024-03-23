import FaceSmileIcon from '@untitled-ui/icons-react/build/esm/FaceSmile';
import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  useMediaQuery
} from '@mui/material';
import { useAuth } from '../../../hooks/use-auth';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';

export const ForumCommentAdd = (props) => {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const { user } = useAuth();

  return (
    <div {...props}>
      <Stack
        alignItems="flex-start"
        direction="row"
        spacing={2}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40
          }}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            multiline
            placeholder="Thêm bình luận..."
            rows={3}
          />
          <Stack
            alignItems="center"
            direction="row"
            spacing={3}
            justifyContent="space-between"
            sx={{ mt: 3 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              {!smUp && (
                <IconButton>
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                </IconButton>
              )}
              {smUp && (
                <>
                  <IconButton>
                    <SvgIcon>
                      <Image01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmileIcon />
                    </SvgIcon>
                  </IconButton>
                </>
              )}
            </Stack>
            <div>
              <Button variant="contained">
                Gửi
              </Button>
            </div>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};
