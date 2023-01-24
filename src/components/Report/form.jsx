import React, { useState } from "react";
import FlashMessage from './flash'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const ReportPostForm = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit the form data here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {categories.map((category) => (
          <div key={category.id}>
            <Label check>
              <Input
                type="radio"
                name="reportCategory"
                value={category.id}
                onChange={handleCategoryChange}
                data-toggle="collapse"
                data-target={`#${category.name.parameterize()}`}
              />
              {category.name}
            </Label>
            <div
              id={category.name.parameterize()}
              className="collapse sub-comment"
            >
              {category.report_reasons.map((reason) => (
                <div key={reason.id}>
                  <Label check>
                    <Input
                      type="radio"
                      name="reportReason"
                      value={reason.id}
                      onChange={handleReasonChange}
                    />
                    {reason.reason}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </FormGroup>
      <FormGroup>
        <Button type="submit" color="primary">
          Report Post
        </Button>
      </FormGroup>
    </Form>
  );}
