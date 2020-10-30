import React from 'react';
import PropTypes from 'prop-types';
import FormP from '../components/[r]FormP'
import FormConsumerExample from '../components/[r]FormConsumerExample'
import FormSubmitButton from '../components/[r]FormSubmitButton'
import { Provider } from "../components/FormContext";
import Greeting from '../components/Greeting'

CreateCourse.propTypes = {
    
};

function CreateCourse(props) {
    const validate = ({ name, age }) => {
        const errors = {};
        if (!name) errors["name"] = "이름을 입력해야 합니다.";
        if (age && age < 18) errors["age"] = "나이가 18세 이상이어야 합니다.";
        return errors;
      };

    return (
        <div>
          <Provider value="mike">
            <div>상단메뉴</div>
            <Profile />
            <div>하단메뉴</div>
            </Provider> 
        </div>
    );
}

function Profile() {
  return (
    <div>
      <Greeting />
    </div>
  )
}

export default CreateCourse;

/* <FormP validate={validate}>
       <FormConsumerExample name="name" label="이름" />
       <FormConsumerExample name="age" label="나이" />
       <FormConsumerExample name="totalAmount" label="금액" />
       <FormSubmitButton>전송</FormSubmitButton>
     </FormP> */