import React from 'react'
import {List, Datagrid, TextField, NumberField, EditButton, DeleteButton, useRecordContext} from 'react-admin'
import {Create,Edit, SimpleForm,TextInput,NumberInput, BooleanInput, DateInput, ReferenceInput, required} from 'react-admin'
const PostList = (props) => {
  const handleDelete = async (id) => {
    try {
      await props.dataProvider('DELETE', 'communities/1/post/${id}');
      props.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  
  return <List {...props}>
    <Datagrid>
      <NumberField source='id' />
      <TextField source='title' />
      <TextField source='body' />
      <EditButton basePath='/posts' />
      <DeleteButton basePath='/posts' onClick={handleDelete} />
    </Datagrid>
  </List>
};

export const PostCreate = (props) => {

  return(
  <Create {...props}>
      <SimpleForm>
          <TextInput source="account_id" defaultValue={1} type="hidden" /> 
          <NumberInput source="community_id" />
          <TextInput source="title" />
          <TextInput source="body" />
          <BooleanInput source="is_drafted" />
      </SimpleForm>
  </Create>
  );
};


const PostTitle = () => {
  const record = useRecordContext();
  return <span>Edit {record ? `"${record.title}"` : ''} </span>;
  };


  const validateNull = (sourceName) => [required(`${sourceName} is required`)];

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
      <SimpleForm>
          <TextInput source="id" />
          <NumberInput source="community.id" />
          <NumberInput source="account.id" />
          <TextInput source="title" validate={validateNull('Title')}/>
          <TextInput source="body" multiline rows={3} validate={validateNull('Body')}/>
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
