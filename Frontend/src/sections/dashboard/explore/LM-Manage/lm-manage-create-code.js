import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Autocomplete, { createFilterOptions }from '@mui/material/Autocomplete';
import {
  Box,
  Button,
  Chip,
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
import { FileDropzoneVn } from '../../../../components/file-dropzone-vn';
import { QuillEditor } from '../../../../components/quill-editor';
import { paths } from '../../../../paths';
import { topic_manageApi } from '../../../../api/topic-manage';
import { lm_manageApi } from '../../../../api/lm-manage';
import { useMounted } from '../../../../hooks/use-mounted';
import axios from 'axios';


const typeOptions = [
  {
    label: 'VIDEO',
    value: 'VIDEO'
  },
  {
    label: 'PDF',
    value: 'PDF'
  },
  {
    label: 'QUIZ',
    value: 'QUIZ'
  },
  {
    label: 'WORD',
    value: 'WORD'
  },
  {
    label: 'CODE',
    value: 'CODE'
  },
  {
    label: 'PPT',
    value: 'PPT'
  }
];

const initialValues = {
  // id: '',
  type: '',
  // description: '',
  // images: [],
  name: '',
  time : 0,
  difficulty: 0,
  // newPrice: 0,
  // oldPrice: 0,
  score: 10,
  rating: 5,
  topicId: 0,
  fileId: 0,
  // submit: null
};

const validationSchema = Yup.object({
  // id: Yup.number().min(0),
  type: Yup.string().max(255),
  description: Yup.string().max(5000),
  // images: Yup.array(),
  name: Yup.string().max(255).required(),
  time : Yup.number().min(0).required(),
  difficulty: Yup.number().min(0).required(),
  rating: Yup.number().min(0).max(5),
  score: Yup.number().min(0),
  topicId: Yup.number().required(),
  fileId: Yup.number(),
  // newPrice: Yup.number().min(0).required(),
  // oldPrice: Yup.number().min(0),
});

function FileUploadSection({ caption, setIdLMList }) {
  const [files, setFiles] = useState([]);
  const [disabled, setDisabled] = useState(false);


  const handleFilesDrop = useCallback((newFiles) => {
    setFiles((prevFiles) => {
      return [...prevFiles, ...newFiles];
    });
    setDisabled(false);
  }, []);

  const handleFileRemove = useCallback((file) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file.path !== file.path);
    });
    setDisabled(false);
  }, []);

  const handleFilesRemoveAll = useCallback(() => {
    setFiles([]);
    setDisabled(false);

  }, []);

  const handleFilesUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', files[0]);
    try {
        // NOTE: Make API request
        // console.log(formik.values);
        // console.log(files.map((_file) => _file.path))
        const response = await axios.post('http://localhost:8080/files',
            formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
          });
        console.log(response.data["id"])

        setIdLMList([response.data["id"]])
        setDisabled(true);
        toast.success('File đã đăng tải thành công');
        // router.push(`${paths.dashboard.explore}/course`);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        console.error('Error uploading file:', err);
      }
  };

  return (
    <div>
      <Typography color="text.secondary" sx={{ mb: 2 }} variant="subtitle2">
        {caption}
      </Typography>
      <FileDropzoneVn
        accept={{ '*/*': [] }}
        caption="(PDF, SVG, JPG, PNG, or gif maximum 900x400, ...)"
        files={files}
        disabled={disabled}
        onDrop={handleFilesDrop}
        onRemove={handleFileRemove}
        onRemoveAll={handleFilesRemoveAll}
        onUpload={handleFilesUpload}
      />
    </div>
  );
}

export const LMCreateForm = (props) => {
  const lmcreateformUrl = window.location.href.split('/');
  const lessonId = (lmcreateformUrl[lmcreateformUrl.length - 1]);
  // const courseId = (lmcreateformUrl[lmcreateformUrl.length - 2]);
  const isMounted = useMounted();
  const router = useRouter();
  const [topicIds, setTopicIds] = useState([])
  const [newTopicId, setNewTopicId] = useState('');
  const [files, setFiles] = useState([]);
  const filter = createFilterOptions();
  const [topicOptions, setTopicOptions] = useState([]);
  const [inputFileId, setInputFileId] = useState([]);
  const [outputFileId, setOutputFileId] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await lm_manageApi.createLM({
          name: values.name,
          difficulty: values.difficulty,
          type: "CODE",
          score: values.score,
          // rating: values.rating,
          time: values.time,
          // topicIds: topicIds.map((topicIds) => topicIds.id)
          topicId: values.topicId,
          code: {
            question: values.description,
            inputId: inputFileId[0],
            outputId: outputFileId[0],
          },
          lessonId: parseInt(lessonId,10)
      })
        // await lm_manageApi.createLM(values);
        toast.success('Tài liệu code đã được tạo');
        // router.push(`${paths.dashboard.explore}/${courseId}`);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const getTopics = useCallback(async () => {
    try {
      const response = await topic_manageApi.getListTopic();

      if (isMounted()) {
        setTopicOptions([...response.data]);
      }
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    getTopics();
  },[]);

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
                    error={!!(formik.touched.time && formik.errors.time)}
                    fullWidth
                    label="Thời lượng (phút)"
                    name="time"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.time}
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
                  <TextField
                    error={!!(formik.touched.topicId && formik.errors.topicId)}
                    fullWidth
                    label="Chủ đề học liên quan"
                    name="topicId"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.topicId}
                    select
                  >
                    {topicOptions.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        selected
                      >
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    Tài liệu code
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
                <Stack spacing={3}>
                  <div>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2 }}
                      variant="subtitle2"
                    >
                      Mô tả bài toán
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
                  <div>
                  <FileUploadSection caption="Thông tin đầu vào (Input file)" setIdLMList={setInputFileId} />
                  {console.log(inputFileId[0])}
                  </div>
                  <div>
                  <FileUploadSection caption="Thông tin đầu ra (Output file)" setIdLMList={setOutputFileId}/>
                  {console.log(outputFileId)}
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
