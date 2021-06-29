import Image from "next/image";
import searchIcon from "./../../Images/search_icon.svg";
import styles from "./SearchBox.module.css";

const SearchBox = (props) => {
  return (
    <div className={styles.search_form}>
      <form>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Search"
          onChange={props.onChange}
        />
        <Image src={searchIcon} />
      </form>
    </div>
  );
};

export default SearchBox;
