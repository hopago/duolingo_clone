import { SimpleForm, TextInput, Create } from "react-admin";

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" label="ID" required />
        <TextInput source="title" label="Title" required />
        <TextInput source="imageSrc" label="ImageSrc" required />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;
