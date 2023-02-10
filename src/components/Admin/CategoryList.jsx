import React from 'react'
import { List, Datagrid, TextField, Create, SimpleForm, TextInput, DateField, EditButton, DeleteButton, Edit, required, useRecordContext } from 'react-admin';

const handleDelete = async (id) => {
    try {
      await props.dataProvider('DELETE', 'categories/${id}');
      props.refresh();
    } catch (error) {
      console.error(error);
    }
};

const CategoryList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton basePath='/categories' />
            <DeleteButton basePath='/categories' onClick={(id) => {handleDelete(id)}} />
        </Datagrid>
    </List>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

const CategoryName = () => {
  const record = useRecordContext();
  return <span>Edit {record ? `"${record.name}"` : ''} </span>;
};

const validateNull = (sourceName) => [required(`${sourceName} is required`)];

 export const CategoryEdit = () => (
    <Edit title={<CategoryName />}>
        <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" validate={validateNull('Name')} />
        </SimpleForm>
    </Edit>
);

export default CategoryList
