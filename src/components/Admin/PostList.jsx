import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, useRecordContext} from 'react-admin'
import {Edit, SimpleForm,TextInput,NumberInput, BooleanInput, DateInput, ReferenceInput, required} from 'react-admin'
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

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Edit {record ? `"${record.title}"` : ''} </span>;
  };


const validateNull = [required()];

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
      <SimpleForm>
          <TextInput source="id" />
          <NumberInput source="community.id" />
          <NumberInput source="account.id" />
          <TextInput source="title" validate={validateNull}/>
          <TextInput source="body" multiline rows={3} validate={validateNull}/>
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
