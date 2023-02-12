import React,{useState,useEffect} from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, useRecordContext, Create} from 'react-admin'
import {Edit, SimpleForm,TextInput,NumberInput, BooleanInput, DateInput, required, regex, SelectInput} from 'react-admin'
import { useParams, useLocation } from 'react-router-dom';

const handleDelete = async (id) => {
  try {
    await props.dataProvider('DELETE', 'communities/${id}');
    props.refresh();
  } catch (error) {
    console.error(error);
  }
};

const CommunityList = (props) => (
      <List {...props}>
        <Datagrid>
          <TextField source='id' />
          <TextField source='name' />
          <TextField source='url' />
          <TextField source='category' />
          <TextField source='rules' />
          <EditButton basePath='/communities' />
          <DeleteButton basePath='/communities' onClick={(id) => {handleDelete(id)}} />
        </Datagrid>
      </List>
);

export const CommunityCreate = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get('name');
  return(
  <Create {...props}>
      <SimpleForm>
          <TextInput source="account_id" defaultValue={1} type="hidden" /> 
          <TextInput source="name" />
          <TextInput source="url" />
          <TextInput source="summary" />
          <SelectInput
          source='category'
          choices={categories.map(category => ({ id: category.id, name: category.name }))}
          />
          <TextInput source="rules" />
      </SimpleForm>
  </Create>
  );
};

const CommunityTitle = () => {
  const record = useRecordContext();
  return <span>Edit {record ? `"${record.name}"` : ''} </span>;
  };


const validateNull = (sourceName) => [required(`${sourceName} is required`)];
const validateUrl = regex(/^(http|https):\/\//, 'Must be a valid URL');

export const CommunityEdit = () => {
  const [categories, setCategories] = useState([]);
  const { record } = useParams();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  
  let defaultValue = '';
  if (record && categories.some(category => category.name === record.category)) {
    defaultValue = record.category;
  }

  return(
  <Edit title={<CommunityTitle />}>
      <SimpleForm>
          <TextInput source="id" />
          <NumberInput source="account.id" />
          <TextInput source="name" validate={validateNull('Name')} />
          <TextInput source="url"  validatr={validateUrl()}/>
          <SelectInput
            source='category'
            choices={categories.map(category => ({ id: category.name, name: category.name }))}
            defaultValue={defaultValue}
          />
          <TextInput source="rules" validate={validateNull('Rule')}/>
      </SimpleForm>
  </Edit>
  );
};

export default CommunityList;
