import React, { useState, useEffect } from 'react'
import { List, Datagrid, TextField, NumberField, EditButton, DeleteButton, useRecordContext } from 'react-admin'
import { Create, Edit, SelectInput, SimpleForm, TextInput, NumberInput, BooleanInput, DateInput, ReferenceInput, required } from 'react-admin'

const ReportList = (props) => {
    const handleDelete = async (id) => {
        try {
            await props.dataProvider('DELETE', 'communities/1/post/1/reports/${id}');
            props.refresh();
        } catch (error) {
            console.error(error);
        }
    };


    const LinkField = ({ source, target, to }) => {
        const post = useRecordContext();
        return <a href={`${to}/${post.post_id}`} target={target}> {<NumberField source='post_id' />}</a>;
    };


    return <List {...props}>
        <Datagrid>
            <NumberField source='id' />
            <LinkField source='post_id' target="_blank" to={`http://localhost:3001/communities/1/posts`} />
            <NumberField source='account_id' />
            <TextField source='report_categories_name' />
            <TextField source='report_reason_name' />
            <EditButton basePath='/reports' />
            <DeleteButton basePath='/reports' onClick={handleDelete} />
        </Datagrid>
    </List>

};

export const ReportCreate = (props) => {
    const [reportCategories, setReportCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/report_categories")
            .then((response) => response.json())
            .then((data) => setReportCategories(data));
    }, []);

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="account_id" defaultValue={1} type="hidden" />
                <NumberInput source="post_id" />
                <SelectInput
                    source="report_categories_name"
                    choices={reportCategories.map((category) => ({
                        id: category.name,
                        name: category.name,
                    }))}
                    onChange={(event) => {
                        console.log(event.target);
                        const selected = reportCategories.find((category) => category.name === event.target.value);
                        setSelectedCategory(selected);
                        console.log(selected);
                    }}
                />
                {selectedCategory && selectedCategory.report_reasons.length > 0 &&(
                    <SelectInput
                        source="report_reason_name"
                        choices={selectedCategory.report_reasons.map((reason) => ({
                            id: reason.reason,
                            name: reason.reason,
                        }))}
                    />
                )}
            </SimpleForm>
        </Create>
    );
};


export default ReportList;