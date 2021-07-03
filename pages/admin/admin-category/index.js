import Link from "next/link";
import Head from "next/head";
import styles from "./../../../styles/adminCategory.module.css";
import AdminCategoryCard from "./../../../components/Admin/AdminCategoryCard";
import healthDisplay from "./../../../Images/health_display.png";
import educationDisplay from "./../../../Images/education_display.png";
import startupDisplay from "./../../../Images/startup_display.png";
import myGet from "../../api/myGet";

const AdminCategory = (props) => {
  return (
    <div className={styles.admin_category_page}>
      <Head>
        <title>Scheme India - Welcome Admin!</title>
      </Head>
      <p>Welcome! Admin...</p>
      <div className={styles.admin_category_card_list}>
        <Link href="/admin/admin-category/health">
          <a>
            <AdminCategoryCard
              image={healthDisplay}
              heading="Health"
              totalSchemes={props.numberOfHealthSchemes}
              color="#6dbe66"
            />
          </a>
        </Link>
        <Link href="/admin/admin-category/education">
          <a>
            <AdminCategoryCard
              image={educationDisplay}
              heading="Education"
              totalSchemes={props.numberOfEducationSchemes}
              color="#fe6666"
            />
          </a>
        </Link>
        <Link href="/admin/admin-category/startup">
          <a>
            <AdminCategoryCard
              image={startupDisplay}
              heading="Startup"
              totalSchemes={props.numberOfStartupSchemes}
              color="#66b6b8"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const json = await myGet(
    "https://scheme-india-project.vercel.app/api/get-schemes",
    context
  );

  let numberOfHealthSchemes = 0;
  let numberOfEducationSchemes = 0;
  let numberOfStartupSchemes = 0;

  const schemes = await json.message;

  schemes.forEach((scheme) => {
    if (scheme.type === "health") {
      numberOfHealthSchemes++;
    } else if (scheme.type === "education") {
      numberOfEducationSchemes++;
    } else if (scheme.type === "startup") {
      numberOfStartupSchemes++;
    }
  });

  return {
    props: {
      numberOfHealthSchemes: numberOfHealthSchemes,
      numberOfEducationSchemes: numberOfEducationSchemes,
      numberOfStartupSchemes: numberOfStartupSchemes,
    },
  };
}

export default AdminCategory;
