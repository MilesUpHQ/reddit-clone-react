import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, useRecordContext} from 'react-admin'
import {Edit, SimpleForm,TextInput,NumberInput, BooleanInput, DateInput, required, regex} from 'react-admin'
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


const validateNull = (sourceName) => [required(`${sourceName} is required`)];
const validateUrl = regex(/^(http|https):\/\//, 'Must be a valid URL');

export const CommunityEdit = () => (
  <Edit title={<CommunityTitle />}>
      <SimpleForm>
          <TextInput source="id" />
          <NumberInput source="account.id" />
          <TextInput source="name" validate={validateNull('Name')} />
          <TextInput source="url"  validatr={validateUrl()}/>
          <TextInput source="rules" validate={validateNull('Rule')}/>
      </SimpleForm>
  </Edit>
);

export default CommunityList;
