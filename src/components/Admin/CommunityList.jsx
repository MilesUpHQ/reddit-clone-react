import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, useRecordContext} from 'react-admin'
import {Edit, SimpleForm,TextInput,NumberInput, BooleanInput, DateInput, required} from 'react-admin'
const CommunityList = (props) => {
  const handleDelete = async (id) => {
    try {
      await props.dataProvider('DELETE', 'communities/${id}');
      props.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return <List {...props}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='url' />
      <TextField source='rules' />
      <TextField source='category' />
      <EditButton basePath='/communities' />
      <DeleteButton basePath='/communities' onClick={handleDelete} />
    </Datagrid>
  </List>
};

const CommunityTitle = () => {
  const record = useRecordContext();
  return <span>Edit {record ? `"${record.name}"` : ''} </span>;
  };


const validateNull = [required()];

export const CommunityEdit = () => (
  <Edit title={<CommunityTitle />}>
      <SimpleForm>
          <TextInput source="id" />
          <NumberInput source="account.id" />
          <TextInput source="name" validate={validateNull}/>
          <TextInput source="url"  />
          <TextInput source="rules" />
      </SimpleForm>
  </Edit>
);

export default CommunityList;
