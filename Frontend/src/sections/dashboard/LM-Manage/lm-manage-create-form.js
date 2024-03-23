import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { FileDropzoneVn } from '../../../components/file-dropzone-vn';
import { QuillEditor } from '../../../components/quill-editor';
import { paths } from '../../../paths';

const categoryOptions = [
  {
    label: 'Video',
    value: 'video'
  },
  {
    label: 'PDF',
    value: 'pdf'
  },
  {
    label: 'Quiz',
    value: 'quiz'
  },
  {
    label: 'Podcast',
    value: 'podcast'
  },
  {
    label: 'Khác',
    value: 'somethingelse'
  },
];

const initialValues = {
  id: '',
  category: '',
  description: '',
  images: [],
  name: '',
  duration : 0,
  difficulty: 0,
  // newPrice: 0,
  // oldPrice: 0,
  submit: null
};

const validationSchema = Yup.object({
  id: Yup.number().min(0),
  category: Yup.string().max(255),
  description: Yup.string().max(5000),
  images: Yup.array(),
  name: Yup.string().max(255).required(),
  duration : Yup.number().min(0).required(),
  difficulty: Yup.number().min(0).required(),
  // newPrice: Yup.number().min(0).required(),
  // oldPrice: Yup.number().min(0),
});

export const LMCreateForm = (props) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        toast.success('Tài liệu học tập đã được tạo');
        router.push(paths.dashboard.LM_Manage);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleFilesDrop = useCallback((newFiles) => {
    setFiles((prevFiles) => {
      return [...prevFiles, ...newFiles];
    });
  }, []);

  const handleFileRemove = useCallback((file) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file.path !== file.path);
    });
  }, []);

  const handleFilesRemoveAll = useCallback(() => {
    setFiles([]);
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}>
      <Stack spacing={4}>
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
                  Thông tin cơ bản
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Tên tài liệu học tập"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Phân loại"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    error={!!(formik.touched.duration && formik.errors.duration)}
                    fullWidth
                    label="Thời lượng"
                    name="duration"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.duration}
                  />
                  <TextField
                    error={!!(formik.touched.difficulty && formik.errors.difficulty)}
                    fullWidth
                    label="Độ khó (Trên thang 1-10)"
                    name="difficulty"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.difficulty}
                  />
                  <div>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2 }}
                      variant="subtitle2"
                    >
                      Mô tả
                    </Typography>
                    <QuillEditor
                      onChange={(value) => {
                        formik.setFieldValue('description', value);
                      }}
                      placeholder="Write something"
                      sx={{ height: 400 }}
                      value={formik.values.description}
                    />
                    {!!(formik.touched.description && formik.errors.description) && (
                      <Box sx={{ mt: 2 }}>
                        <FormHelperText error>
                          {formik.errors.description}
                        </FormHelperText>
                      </Box>
                    )}
                  </div>
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
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Tài liệu học
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    Tài liệu học sẽ xuất hiện trên hệ thống.
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <FileDropzoneVn
                  accept={{ '*/*': [] }}
                  caption="(PDF, SVG, JPG, PNG, or gif maximum 900x400, ...)"
                  files={files}
                  onDrop={handleFilesDrop}
                  onRemove={handleFileRemove}
                  onRemoveAll={handleFilesRemoveAll}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* <Card>
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
                  Pricing
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.oldPrice && formik.errors.oldPrice)}
                    fullWidth
                    label="Old price"
                    name="oldPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.oldPrice}
                  />
                  <TextField
                    error={!!(formik.touched.newPrice && formik.errors.newPrice)}
                    fullWidth
                    label="New Price"
                    name="newPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.newPrice}
                  />
                  <div>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Keep selling when stock is empty"
                    />
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
        {/* <Card>
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
                  Category
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Category"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button color="inherit">
            Huỷ thay đổi
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Tạo mới
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
