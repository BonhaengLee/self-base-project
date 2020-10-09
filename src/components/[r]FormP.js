import React, { useState } from "react";
import PropTypes from "prop-types";

import { Provider } from "./FormContext";

FormProvider.propTypes = {
  validate: PropTypes.func,
};

const UserContext = React.createContext({
  values: {}, // 입력 값을 모두 저장하는 객체
  errors: {},
});

export default function FormProvider(props) {
  const [state, setState] = useState({
    values: {}, // 입력 값을 모두 저장하는 객체
    errors: {}, // 유효성 검사 함수가 반환한 오류 메시지를 입력 항목 이름과 함께 해시맵 구조로 저장한 객체({name:'이름을입력해야합니다.',,})
  });

  function onChange(name, updateValue) {
    // Input comp에서 입력값이 변경될 때 실행될 콜백 함수
    setState(
      ({ values: { ...values, [name]: updateValue } },
      () => validate(state.values))
    );
  }

  function reset() {
    setState({ values: {}, errors: {} });
  }

  function submit() {
    props.onSubmit(state.values); // 소비자에서 submit() 함수가 호출되면 onSubmit 프로퍼티로 전달된 콜백함수를 실행하여 유효성 오류 결과값만을 저장
  }
  function validate(values) {
    const { validate } = props;
    if (!validate) {
      return;
    }
    const errors = validate(values); // 폼 공급자는 유효성 검사 로직을 포함하지 않고, validate 프로퍼티로 전달된 콜백 함수를 실행하여 유효성 오류 결과값만을 저장함
    setState({
      errors, // 유효성 검증 오류 메시지를 컨텍스트의 errors에 저장함
    });
  }

  const { values, errors } = state;

  return (
    <UserContext.Provider
      value={{
        errors, // 컨텍스트 데이터에 오류 메시지 포함
        values, // 컨텍스트 데이터에 입력값 포함
        onChange: { onChange }, // 입력된 컨텍스트값을 변경하는 콜백함수 onChange()를 전달
        reset: { reset },
        submit: { submit },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
