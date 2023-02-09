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



export default CommunityList;
