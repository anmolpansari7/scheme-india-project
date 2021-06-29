import { MongoClient } from "mongodb";

import Link from "next/link";
import Head from "next/head";
import styles from "./../../../styles/adminCategory.module.css";
import AdminCategoryCard from "./../../../components/Admin/AdminCategoryCard";
import healthDisplay from "./../../../Images/health_display.png";
import educationDisplay from "./../../../Images/education_display.png";
import startupDisplay from "./../../../Images/startup_display.png";

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

export async function getStaticProps() {
  let numberOfHealthSchemes = 0;
  let numberOfEducationSchemes = 0;
  let numberOfStartupSchemes = 0;

  const userPassword = process.env.MONGODB_PASSWORD;

  const client = new MongoClient(
    `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  ).connect();

  const db = (await client).db();

  const schemesCollection = db.collection("schemes");

  const schemes = await schemesCollection.find({}, { type: 1 }).toArray();

  (await client).close;

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
    revalidate: 1,
  };
}

export default AdminCategory;
