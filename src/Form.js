import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
`

const FieldWrapper = ButtonWrapper.extend`
  display: flex;
  flex-direction: column;
`

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FieldWrapper>
    <Input label={label} {...input} type={type} error={touched && error} focus placeholder={label }/>
  </FieldWrapper>
);



let NodeForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, initialValues } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        {initialValues && Object.keys(initialValues).map((attribute, index) => attribute !=='id' && 
          <Field
            key={index}
            name={attribute}
            type="text"
            component={renderField}
            label={attribute}
          />
        )
        }
      </FieldWrapper>
      <ButtonWrapper>
        <Button type="submit" disabled={submitting}>Submit</Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </ButtonWrapper>
    </form>
  );
};

NodeForm = reduxForm({
  form: 'NodeForm', // a unique identifier for this form
  enableReinitialize: true,
})(NodeForm);

NodeForm = connect()(NodeForm)

export default NodeForm
