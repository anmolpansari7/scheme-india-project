import ReactDOM from "react-dom";
import styles from "./ConfirmModal.module.css";

const Backdrop = (props) => {
  return <div className={styles.back_drop} onClick={props.onCancel} />;
};

const ConfirmModalOverlay = (props) => {
  return (
    <div className={styles.confirm_modal}>
      <div className={styles.modal_content}>
        <p>
          Are you sure you want to delete
          <strong> {props.schemeName} </strong>. ?
        </p>
      </div>
      <div className={styles.modal_buttons}>
        <button onClick={props.onConfirm}>Delete</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const ConfirmModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCancel={props.onCancel} />,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <ConfirmModalOverlay
          onCancel={props.onCancel}
          onConfirm={props.onConfirm}
          schemeName={props.schemeName}
        />,
        document.getElementById("overlay_root")
      )}
    </>
  );
};
export default ConfirmModal;
