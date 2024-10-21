import { SimpleForm, List, TextField } from "react-admin";

const CourseCreate = () => {
  return (
    <List>
      <SimpleForm>
        <TextField source="title" label="Title" />
        <TextField source="imageSrc" label="ImageSrc" />
      </SimpleForm>
    </List>
  );
};

export default CourseCreate;
