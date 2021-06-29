import { useRef } from "react";
import Image from "next/image";
import styles from "./AddSchemeForm.module.css";
import addBtn from "./../../Images/add_btn.svg";

const AddSchemeForm = (props) => {
  const nameInputRef = useRef();
  const linkInputRef = useRef();
  const detailsInputRef = useRef();
  const eligibilityInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const newScheme = {
      type: props.schemeType,
      name: nameInputRef.current.value,
      link: linkInputRef.current.value,
      details: detailsInputRef.current.value,
      eligibility: eligibilityInputRef.current.value,
      addedOn: new Date().toLocaleDateString(),
    };

    props.onAddScheme(newScheme);

    nameInputRef.current.value = "";
    linkInputRef.current.value = "";
    detailsInputRef.current.value = "";
    eligibilityInputRef.current.value = "";
  };

  return (
    <form onSubmit={submitFormHandler} className={styles.add_scheme_form}>
      <input ref={nameInputRef} type="text" placeholder="Name" required />
      <input ref={linkInputRef} type="text" placeholder="Links" required />
      <div className={styles.longFields}>
        <textarea
          ref={detailsInputRef}
          className={styles.details_section}
          type="text"
          placeholder="Details"
          required
        />
        <textarea
          ref={eligibilityInputRef}
          className={styles.eligibility_section}
          type="text"
          placeholder="Eligibility"
        />
      </div>
      <button type="submit" className={styles.add_btn}>
        <Image src={addBtn} />
      </button>
    </form>
  );
};

export default AddSchemeForm;
