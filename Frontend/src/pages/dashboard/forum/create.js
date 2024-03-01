import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { FileDropzoneVn } from '../../../components/file-dropzone-vn';
import { QuillEditor } from '../../../components/quill-editor';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { fileToBase64 } from '../../../utils/file-to-base64';

const initialCover = '/assets/covers/abstract-1-4x3-large.png';

const Page = () => {
  const [cover, setCover] = useState(initialCover);

  usePageView();

  const handleCoverDrop = useCallback(async ([file]) => {
    const data = await fileToBase64(file);
    setCover(data);
  }, []);

  const handleCoverRemove = useCallback(() => {
    setCover(null);
  }, []);

  return (
    <>
      <Head>
        <title>
          Forum: Forum Create
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Typography variant="h3">
              Tạo diễn đàn mới
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color="text.primary"
                component={NextLink}
                href={paths.dashboard.index}
                variant="subtitle2"
              >
                Dashboard
              </Link>
              <Link
                color="text.primary"
                component={NextLink}
                href={paths.dashboard.forum.index}
                variant="subtitle2"
              >
                Diễn đàn
              </Link>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                Tạo mới
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Stack spacing={3}>
            <Card sx={{mt: 6}}>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Thông tin căn bản
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                  >
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Tiêu đề"
                        name="title"
                      />
                      <TextField
                        fullWidth
                        label="Mô tả ngắn"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Ảnh minh họa
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                  >
                    <Stack spacing={3}>
                      {cover
                        ? (
                          <Box
                            sx={{
                              backgroundImage: `url(${cover})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              borderRadius: 1,
                              height: 230,
                              mt: 3
                            }}
                          />
                        )
                        : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              border: 1,
                              borderRadius: 1,
                              borderStyle: 'dashed',
                              borderColor: 'divider',
                              height: 230,
                              mt: 3,
                              p: 3
                            }}
                          >
                            <Typography
                              align="center"
                              color="text.secondary"
                              variant="h6"
                            >
                              Chọn ảnh minh họa
                            </Typography>
                            <Typography
                              align="center"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                              variant="subtitle1"
                            >
                              Hình ảnh được sử dụng để minh họa cho bài đăng
                            </Typography>
                          </Box>
                        )}
                      <div>
                        <Button
                          color="inherit"
                          disabled={!cover}
                          onClick={handleCoverRemove}
                        >
                          Bỏ hình ảnh
                        </Button>
                      </div>
                      <FileDropzoneVn
                        accept={{ 'image/*': [] }}
                        maxFiles={1}
                        onDrop={handleCoverDrop}
                        caption="(SVG, JPG, PNG, hoặc gif tối đa 900x400)"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Nội dung
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                  >
                    <QuillEditor
                      placeholder="Viết nội dung"
                      sx={{ height: 330 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Meta
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Thẻ tiêu đề"
                        name="title"
                      />
                      <TextField
                        fullWidth
                        label="Mô tả thẻ tiêu đề"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2
            }}
          >
            <Typography variant="subtitle1">
              
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Button
                color="inherit"
                component={NextLink}
                href={paths.dashboard.blog.index}
              >
                Hủy
              </Button>
              <Button
                component={NextLink}
                href={paths.dashboard.blog.postDetails}
                variant="contained"
              >
                Đăng bài
              </Button>
              <IconButton>
                <SvgIcon>
                  <DotsHorizontalIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </Card>
          <Box
            sx={{
              display: {
                sm: 'none'
              },
              mt: 2
            }}
          >
            <Button
              component={NextLink}
              href={paths.dashboard.forum.forumDetails}
              variant="contained"
            >
              Đăng bài
            </Button>
          </Box>
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
