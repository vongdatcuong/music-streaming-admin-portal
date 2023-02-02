const jsonToFormData = (data: Record<string, string | Blob>) => {
  const form = new FormData();
  for (const key of Object.keys(data)) {
    if (data[key] != null) {
      form.append(key, data[key]);
    }
  }
  return form;
};

export default jsonToFormData;
