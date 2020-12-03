import React, { useEffect, memo, useMemo } from 'react';
// import AccountWidget from '../components/AccountWidget';
import { firestore, firebase } from '../firebase';
import { Grid } from 'tabler-react';
import {
  Conversation,
  AddCommentForm,
  CommentsList,
} from '../components/Conversation';
import CommentsContainer from '../components/CommentsContainer';

const Authorized = (props) => {
  const user = useMemo(() => firebase.auth().currentUser, []);
  const userRef = useMemo(() => firestore.collection('users').doc(user.uid), [
    user.uid,
  ]);

  useEffect(() => {
    userRef.get().then((docSnapshot) => {
      if (!docSnapshot.exists) {
        userRef.set({
          name: user.displayName,
        });
      }
    });
  });

  return (
    <div
      style={{
        marginBottom: '30px',
      }}
    >
      <CommentsContainer videoId={props.videoId}>
        {(comments, handleFetchMore, handleAddComment, handleDeleteComment) => (
          <Grid.Col>
            <Conversation>
              <AddCommentForm
                onSubmit={handleAddComment}
                videoId={props.videoId}
              />
              <CommentsList
                videoId={props.videoId}
                comments={comments}
                onFetchMore={handleFetchMore}
                onDeleteComment={handleDeleteComment}
                vUser={props.vUser}
              />
            </Conversation>
          </Grid.Col>
        )}
      </CommentsContainer>
    </div>
  );
};

export default memo(Authorized);
