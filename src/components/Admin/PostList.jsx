import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'
import {Edit, SimpleForm,TextInput,NumberInput, BooleanInput, DateInput} from 'react-admin'
const PostList = (props) => {
  const handleDelete = async (id) => {
    try {
      await props.dataProvider('DELETE', 'post/${id}');
      props.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return <List {...props}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='title' />
      <TextField source='body' />
      <EditButton basePath='/posts' />
      <DeleteButton basePath='/posts' onClick={handleDelete} />
    </Datagrid>
  </List>
};

export const PostEdit = () => (
  <Edit>
      <SimpleForm>
          <TextInput source="id" />
          <NumberInput source="community.id" />
          <NumberInput source="account.id" />
          <TextInput source="title" />
          <TextInput source="body" />
          <BooleanInput source="isclosed" />
          <BooleanInput source="is_drafted" />
          <NumberInput source="vote_count" />
          <NumberInput source="view_count" />
          <NumberInput source="upvotes" />
          <NumberInput source="downvotes" />
          <DateInput source="created_at" />
          <DateInput source="updated_at" />
      </SimpleForm>
  </Edit>
);

export default PostList;
