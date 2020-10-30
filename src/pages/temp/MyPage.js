import React, { useState } from 'react';

import MyPageTemplate from '../components/MyPageTemplate';
import Form from '../components/Form';
import MyPageItem from '../components/MyPageItem';
import MyPageItemList from '../components/MyPageItemList';
import Mp from '../components/Mp';

function MyPage() {
  const [courseId, setCourseId] = useState(3); // 0, 1, 2가 존재하므로 3으로 설정
  const [courseNoteId, setCourseNoteId] = useState(3); // 0, 1, 2가 존재하므로 3으로 설정
  const [profileId, setProfileId] = useState(3); // 0, 1, 2가 존재하므로 3으로 설정

  function incrementC() {
    setCourseId((courseId) => courseId + 1);
  }
  function incrementCn() {
    setCourseNoteId((courseNoteId) => courseNoteId + 1);
  }
  function incrementP() {
    setProfileId((profileId) => profileId + 1);
  }

  const [state, setState] = useState({
    inputC: '',
    inputCN: '',
    inputP: '',
    mypagesCourse: [
      { id: 0, text: '자기주도프로젝트', checked: false },
      { id: 1, text: '캡스톤디자인', checked: false },
      { id: 2, text: '집중교육', checked: false },
    ],
    mypagesCourseNote: [
      { id: 0, text: '#1 Introduction', checked: false },
      { id: 1, text: '#2 Classification', checked: false },
      { id: 2, text: '#3 Regression', checked: false },
    ],
    mypagesProfile: [
      { id: 0, text: '미정1', checked: false },
      { id: 1, text: '미정2', checked: false },
      { id: 2, text: '미정3', checked: false },
    ],
  });

  const handleChangeC = (e) => {
    setState({ ...state, inputC: e.target.value });
  };

  const handleChangeCn = (e) => {
    setState({ ...state, inputCn: e.target.value });
  };

  const handleChangeP = (e) => {
    setState({ ...state, inputP: e.target.value });
  };

  const handleCreateC = () => {
    const { inputC, mypagesCourse } = state;
    incrementC(); // const id는 ++할 수 없고 const만 사용하는 것이 권장되므로 함수로 id를 증가시킴
    setState({
      ...state,
      inputC: '', // 인풋비우고
      // concat으로 배열에 추가
      mypagesCourse: mypagesCourse.concat({
        id: courseId, // id++
        text: inputC,
        checked: false,
      }),
    });
  };

  const handleCreateCn = () => {
    const { inputCn, mypagesCourseNote } = state;
    incrementCn(); // const id는 ++할 수 없고 const만 사용하는 것이 권장되므로 함수로 id를 증가시킴
    setState({
      ...state,
      inputCn: '', // 인풋비우고
      // concat으로 배열에 추가
      mypagesCourseNote: mypagesCourseNote.concat({
        id: courseNoteId, // id++
        text: inputCn,
        checked: false,
      }),
    });
  };

  const handleCreateP = () => {
    const { inputP, mypagesProfile } = state;
    incrementP(); // const id는 ++할 수 없고 const만 사용하는 것이 권장되므로 함수로 id를 증가시킴
    setState({
      ...state,
      inputP: '', // 인풋비우고
      // concat으로 배열에 추가
      mypagesProfile: mypagesProfile.concat({
        id: profileId, // id++
        text: inputP,
        checked: false,
      }),
    });
  };

  const handleKeyPressC = (e) => {
    // 눌려진 키가 enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      handleCreateC();
    }
  };

  const handleKeyPressCn = (e) => {
    // 눌려진 키가 enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      handleCreateCn();
    }
  };

  const handleKeyPressP = (e) => {
    // 눌려진 키가 enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      handleCreateP();
    }
  };
  // 체크를 하거나 푸는 함수
  const handleToggleC = (courseId) => {
    const { mypagesCoures } = state;

    // 파라미터로 받은 id를 갖고 몇번째 항목인지 찾음
    const index = mypagesCoures.findIndex(
      (mypage) => mypage.courseId === courseId,
    );
    const selected = mypagesCoures[index]; // 선택한 객체

    const nextMypages = [...mypagesCoures]; // 배열 복사, push와 마찬가지로 배열 직접 수정 절대 안됨.

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextMypages[index] = {
      ...selected,
      checked: !selected.checked,
    };

    setState({
      mypages: nextMypages,
    });
  };

  const handleToggleCn = (courseNoteId) => {
    const { mypagesCouresNote } = state;

    // 파라미터로 받은 id를 갖고 몇번째 항목인지 찾음
    const index = mypagesCouresNote.findIndex(
      (mypage) => mypage.courseNoteId === courseNoteId,
    );
    const selected = mypagesCouresNote[index]; // 선택한 객체

    const nextMypages = [...mypagesCouresNote]; // 배열 복사, push와 마찬가지로 배열 직접 수정 절대 안됨.

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextMypages[index] = {
      ...selected,
      checked: !selected.checked,
    };

    setState({
      mypages: nextMypages,
    });
  };

  const handleToggleP = (profileId) => {
    const { mypagesProfile } = state;

    // 파라미터로 받은 id를 갖고 몇번째 항목인지 찾음
    const index = mypagesProfile.findIndex(
      (mypage) => mypage.profileId === profileId,
    );
    const selected = mypagesProfile[index]; // 선택한 객체

    const nextMypages = [...mypagesProfile]; // 배열 복사, push와 마찬가지로 배열 직접 수정 절대 안됨.

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextMypages[index] = {
      ...selected,
      checked: !selected.checked,
    };

    setState({
      mypages: nextMypages,
    });
  };

  // 아이템을 제거하는 함수
  const handleRemoveC = (courseId) => {
    const { mypagesCourse } = state;
    setState({
      mypages: mypagesCourse.filter((mypage) => mypage.courseId !== courseId),
    });
  };

  const handleRemoveCn = (courseNoteId) => {
    const { mypagesCourseNote } = state;
    setState({
      mypages: mypagesCourseNote.filter(
        (mypage) => mypage.courseNoteId !== courseNoteId,
      ),
    });
  };

  const handleRemoveP = (profileId) => {
    const { mypagesProfile } = state;
    setState({
      mypages: mypagesProfile.filter(
        (mypage) => mypage.profileId !== profileId,
      ),
    });
  };

  const {
    inputC,
    inputCn,
    inputP,
    mypagesCourse,
    mypagesCourseNote,
    mypagesProfile,
  } = state;

  return (
    <div>
      <Mp
        formC={
          <Form
            title="내 강의"
            value={inputC}
            onKeyPress={handleKeyPressC}
            onChange={handleChangeC}
            onCreate={handleCreateC}
          />
        }
        formCn={
          <Form
            title="강의 노트"
            value={inputCn}
            onKeyPress={handleKeyPressCn}
            onChange={handleChangeCn}
            onCreate={handleCreateCn}
          />
        }
        formP={
          <Form
            title="프로필 설정"
            value={inputP}
            onKeyPress={handleKeyPressP}
            onChange={handleChangeP}
            onCreate={handleCreateP}
          />
        }
        childC={
          <MyPageItemList
            mypages={mypagesCourse}
            onToggle={handleToggleC}
            onRemove={handleRemoveC}
          />
        }
        childCn={
          <MyPageItemList
            mypages={mypagesCourseNote}
            onToggle={handleToggleCn}
            onRemove={handleRemoveCn}
          />
        }
        childP={
          <MyPageItemList
            mypages={mypagesProfile}
            onToggle={handleToggleP}
            onRemove={handleRemoveP}
          />
        }
      ></Mp>
    </div>
  );
}

export default MyPage;
