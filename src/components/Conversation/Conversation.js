import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "./Conversation.module.css";

const Conversation = ({ children }) => {
  return <div className={styles.Conversation}>{children}</div>;
};

Conversation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default memo(Conversation);
