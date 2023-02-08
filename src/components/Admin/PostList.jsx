import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

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
       < TextField source='id' />
       < TextField source='title' />
       < TextField source='body' />
       < EditButton basePath='/posts' />
       <DeleteButton basePath='/posts'  onClick={handleDelete} />
    </Datagrid>
  </List>
}

export default PostList
