import React from "react";
import PropTypes from "prop-types";

import { Consumer } from "./FormContext";
// import Button from "../04/Button";

FormSubmitButton.propTypes = { children: PropTypes.node.isRequired };

function FormSubmitButton(props) {
  const { children } = props;
  return (
    <Consumer>
      {({ submit }) => (
        // 컨텍스트의 폼 전송을 위한 submit() 콜백 함수를 Button comp의 onPress 프로퍼티로 전달함. 공급자 프로퍼티의 onSubmit 콜백 함수를 입력된 값과 함께 호출함
        <button primary onPress={submit}>
          {children}
        </button>
      )}
    </Consumer>
  );
}

export default FormSubmitButton;
