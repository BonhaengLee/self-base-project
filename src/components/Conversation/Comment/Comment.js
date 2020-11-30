import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import styles from './Comment.module.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { IconButton } from '@material-ui/core';
import { useAuth } from 'contexts/AuthContext';
import FaceIcon from '@material-ui/icons/Face';

const Comment = ({
  comment: { id, body, postedAt, userName, uId, email },
  onDelete,
  vUser,
}) => {
  const intDate = parseInt(postedAt);
  const date = new Date(intDate).toUTCString();
  const { currentUser } = useAuth();

  const deleteComment = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  function userTag(userName) {
    if (vUser === email) {
      return (
        <>
          <FaceIcon style={{ marginRight: '5px', color: 'red' }} />
          {userName}
        </>
      );
    } else if (uId === currentUser.uid) {
      return (
        <>
          <FaceIcon style={{ marginRight: '5px', color: 'blue' }} />
          {userName}
        </>
      );
    } else {
      return (
        <>
          <PersonOutlineIcon style={{ marginRight: '5px' }} />
          {userName}
        </>
      );
    }

    // else if (userName === currentUser.email) {

    // } else if (userName === currentUser.email) {

    // }
  }

  console.log(vUser);

  return (
    <div className={styles.Comment}>
      <span className={styles.Username}>
        {userTag(userName)}
        <span className={styles.Time}>
          <TimeAgo date={date} />
          <IconButton onClick={deleteComment}>
            <DeleteOutlineIcon />
          </IconButton>
        </span>
      </span>
      <p className={styles.CommentBody}>{body}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(Comment);
