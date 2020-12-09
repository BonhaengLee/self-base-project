import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import { v4 as uuid } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import { firestore, firebaseApp } from '../../firebase';

Survey.StylesManager.applyTheme('stone');
export default function Review(props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  const postReview = async (details) => {
    const id = uuid();
    await firestore
      .collection('reviews')
      .doc(id)
      .set(
        {
          ...details,
          // postedOn: firebaseApp.firestore.FieldValue.serverTimestamp(),
          videoId: props.match.params.ID,
          postId: id,
          userId: currentUser.email,
          username: currentUser.displayName,
          photo: currentUser.photoURL,
        },
        { merge: true },
      );
    // fetchJobs();
    history.push('/landing');
  };

  function onCompleteComponent() {
    setIsCompleted(true);
  }
  let json = {
    questions: [
      {
        type: 'rating',
        name: 'satisfaction',
        title: '강의 영상 만족도는 어떠셨나요?',
        mininumRateDescription: '매우 불만족',
        maximumRateDescription: '매우 만족',
      },
      {
        type: 'rating',
        name: 'understanding',
        title: '강의 내용을 이해하기 쉬웠습니까?',
        mininumRateDescription: '매우 쉬움',
        maximumRateDescription: '매우 어려움',
      },
      {
        type: 'comment',
        name: 'suggestions',
        title: '이번 강의에서 보완해서 듣고 싶은 내용이 무엇인가요?',
      },
      {
        type: 'comment',
        name: 'complement',
        title: '이번 강의 영상에서 어떤 점이 만족스러웠나요?',
      },
    ],
  };
  var surveyRender = !isCompleted ? (
    <Survey.Survey
      json={json}
      showCompletedPage={false}
      onComplete={onComplete}
    />
  ) : null;
  // var onCompleteComponent = isCompleted
  //   ? console.log("Survey results: " + JSON.stringify(Survey.data))(
  //       <div style={{ fontSize: "30px" }}>완료되었습니다.</div>
  //     )
  //   : null;
  var arr = [];
  async function onComplete(survey, options) {
    //Write survey results into database
    console.log('Survey results: ' + JSON.stringify(survey.data));
    arr.push(JSON.stringify(survey.data));
    await postReview(arr);
  }
  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      {surveyRender}
      {onCompleteComponent}
    </div>
  );
}
