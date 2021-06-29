import Image from "next/image";
import Link from "next/link";
import styles from "./AdminSchemeCard.module.css";
import deleteBtn from "./../../Images/delete_btn.svg";

const AdminSchemeCard = (props) => {
  return (
    <div className={styles.admin_scheme_card}>
      <Link
        href={`/admin/admin-category/${props.scheme.type}/${props.scheme.id}`}
      >
        <a>
          <div className={styles.admin_scheme_card_top}>
            <h2>{props.scheme.name}</h2>
            <p>Last Edit - {props.scheme.addedOn}</p>
          </div>
        </a>
      </Link>
      <div className={styles.delete_button}>
        <button
          onClick={() => {
            props.onDeleteButtonPress(props.scheme.id, props.scheme.name);
          }}
        >
          <Image src={deleteBtn} />
        </button>
      </div>
    </div>
  );
};

export default AdminSchemeCard;
