import React, { useState, useEffect, useCallback, memo } from 'react';
import { firestore, firebase } from '../../firebase';

const CommentsContainer = (props) => {
  const [comments, setComments] = useState([]);
  const user = firebase.auth().currentUser;

  const getComments = useCallback(() => {
    firestore
      .collection('comments' + props.videoId)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          let data = doc.data();
          data.id = doc.id;
          data.uId = doc.data().userId; //userId 아이콘
          return data;
        });
        setComments(data);
      });
  }, []);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const handleFetchMore = useCallback(() => {
    console.log('Todo: pagination');
  }, []);

  const handleAddComment = useCallback(
    (body) => {
      firestore
        .collection('comments' + props.videoId)
        .doc()
        .set({
          body,
          postedAt: Date.now().toString(),
          userId: user.uid,
          email: user.email,
          userName: user.displayName,
        })
        .then(() => {
          getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [user, getComments],
  );

  const handleDeleteComment = useCallback(
    (id) => {
      firestore
        .collection('comments' + props.videoId)
        .doc(id)
        .delete()
        .then(() => {
          getComments();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [getComments],
  );

  return (
    <>
      {props.children(
        comments,
        handleFetchMore,
        handleAddComment,
        handleDeleteComment,
      )}
    </>
  );
};

export default memo(CommentsContainer);
