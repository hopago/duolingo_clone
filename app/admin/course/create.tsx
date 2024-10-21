import { SimpleForm, TextField, Create } from "react-admin";

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextField source="title" label="Title" />
        <TextField source="imageSrc" label="ImageSrc" />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;
