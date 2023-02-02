import jsonToFormData from '../utils/jsonToFormData';

export const FileUploadRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  transformRequest: [jsonToFormData],
};
