import { Datagrid as DataGrid, List, TextField } from "react-admin";

const CourseList = () => {
  return (
    <List>
      <DataGrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
      </DataGrid>
    </List>
  );
};

export default CourseList;
