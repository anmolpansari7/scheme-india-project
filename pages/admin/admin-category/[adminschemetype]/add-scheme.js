import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import AddSchemeForm from "../../../../components/Admin/AddSchemeForm";
import styles from "./../../../../styles/addSchemePage.module.css";
import MessageModal from "../../../../components/Layout/MessageModal";

const AddSchemePage = () => {
  const [addingStage, setAddingStage] = useState(false);
  const router = useRouter();
  const schemeType = router.query.adminschemetype;

  const goBackHandler = () => {
    router.back();
  };

  const logOutHandler = () => {
    router.push("/admin");
  };

  const addSchemeHandler = async (newScheme) => {
    setAddingStage(true);
    const response = await fetch("/api/new-scheme", {
      method: "POST",
      body: JSON.stringify(newScheme),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAddingStage(false);
    router.push(`/admin/admin-category/${schemeType}`);
  };

  return (
    <>
      {addingStage && (
        <MessageModal message="Awesome ! Congratulation on adding a new scheme. Work in progress... Do you know I still watch Schinchan... ;-)" />
      )}
      <div className={styles.add_scheme_page}>
        <Head>
          <title>Scheme India - Add Scheme</title>
        </Head>
        <button className={styles.go_back} onClick={goBackHandler}>
          Go Back
        </button>
        <button className={styles.log_out} onClick={logOutHandler}>
          Log Out
        </button>
        <AddSchemeForm onAddScheme={addSchemeHandler} schemeType={schemeType} />
      </div>
    </>
  );
};

export default AddSchemePage;
