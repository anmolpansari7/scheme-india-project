import ReactDOM from "react-dom";
import styles from "./MessageModal.module.css";

const Backdrop = () => {
  return <div className={styles.back_drop} />;
};

const MessageModalOverlay = (props) => {
  return (
    <div className={styles.message_modal}>
      <p>
        <strong>{props.message}</strong>
      </p>
    </div>
  );
};

const MessageModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <MessageModalOverlay message={props.message} />,
        document.getElementById("overlay_root")
      )}
    </>
  );
};

export default MessageModal;
