import { SimpleForm, TextInput, Create } from "react-admin";

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" />
        <TextInput source="imageSrc" label="ImageSrc" />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;
