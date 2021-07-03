import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import addBtn from "./../../../../Images/add_btn.svg";
import SearchBox from "../../../../components/Common/SearchBox";
import AdminSchemeCard from "../../../../components/Admin/AdminSchemeCard";
import ConfirmModal from "../../../../components/Layout/ConfirmModal";
import styles from "./../../../../styles/adminSchemeType.module.css";
import MessageModal from "../../../../components/Layout/MessageModal";
import myGet from "../../../api/myGet";

const AdminSchemeType = (props) => {
  const [shownData, setShownData] = useState([...props.schemes]);
  const [deletePermission, setDeletePermission] = useState(false);
  const [deletingSchemeId, setDeletingSchemeId] = useState("");
  const [deletingSchemeName, setDeletingSchemeName] = useState("");
  const [deletingStage, setDeletingStage] = useState(false);

  const router = useRouter();
  const schemeType = router.query.adminschemetype;
  const goBackHandler = () => {
    router.back();
  };

  const logOutHandler = () => {
    router.push("/admin");
  };

  const addButtonHandler = () => {
    router.push(`/admin/admin-category/${schemeType}/add-scheme`);
  };

  const filterSearchHandler = (e) => {
    const searchedValue = e.target.value;
    const searchFilters = props.schemes.filter((scheme) => {
      if (shownData === "") {
        return scheme;
      } else if (
        scheme.name.toLowerCase().includes(searchedValue.toLowerCase())
      ) {
        return scheme;
      }
    });

    router.reload();
    setShownData(searchFilters);
  };

  const openCofirmOverlay = (schemeid, schemeName) => {
    setDeletePermission(true);
    setDeletingSchemeId(schemeid);
    setDeletingSchemeName(schemeName);
  };

  const deleteScheme = async () => {
    setDeletePermission(false);
    setDeletingStage(true);
    const response = await fetch("/api/delete-scheme", {
      method: "DELETE",
      body: JSON.stringify({ id: deletingSchemeId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    await setDeletingSchemeId("");
    await setDeletingSchemeName("");
    await setDeletingStage(false);

    router.reload();
  };

  const cancelDeletion = () => {
    setDeletePermission(false);
    setDeletingSchemeId("");
    setDeletingSchemeName("");
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Head>
        <title>{capitalizeFirstLetter(schemeType)} Schemes</title>
      </Head>
      {deletePermission && (
        <ConfirmModal
          onConfirm={deleteScheme}
          onCancel={cancelDeletion}
          schemeName={deletingSchemeName}
        />
      )}
      {deletingStage && (
        <MessageModal message="Deletion work in progress. Hope you will add new scheme soon." />
      )}
      <div className={styles.wrapper}>
        <button className={styles.go_back} onClick={goBackHandler}>
          Go Back
        </button>
        <button className={styles.log_out} onClick={logOutHandler}>
          Log Out
        </button>
        <div className={styles.admin_scheme_type_top_container}>
          <SearchBox onChange={filterSearchHandler} />
          <button onClick={addButtonHandler}>
            <Image src={addBtn} alt="add scheme button" />
          </button>
        </div>
        <div className={styles.admin_schem_type_card_list}>
          {shownData.length === 0 ? (
            <p>No Scheme found ...</p>
          ) : (
            shownData.map((scheme) => {
              return (
                <AdminSchemeCard
                  scheme={scheme}
                  onDeleteButtonPress={openCofirmOverlay}
                  key={scheme.id}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const schemeTypeName = context.params.adminschemetype;
  const json = await myGet(
    `http://localhost:3000/api/admin-scheme-type?adminschemetype=${schemeTypeName}`,
    context
  );

  const schemes = await json.message;

  return {
    props: {
      schemes: schemes.map((scheme) => ({
        type: scheme.type,
        name: scheme.name,
        link: scheme.link,
        details: scheme.details,
        eligibility: scheme.eligibility,
        addedOn: scheme.addedOn,
        id: scheme._id.toString(),
      })),
    },
  };
}

export default AdminSchemeType;
