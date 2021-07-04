import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import previousBtn from "./../../../../Images/previousBtn.svg";
import NextButton from "../../../../components/Common/NextButton";
import Card from "./../../../../components/User/Card";
import schoolBoy from "../../../../Images/school_boy.png";
import styles from "./../../../../styles/FoundSchemesPage.module.css";

const FoundSchemesPage = (props) => {
  const router = useRouter();
  const previousPageHandler = () => {
    router.back();
  };

  return (
    <div className={styles.found_schemes_page}>
      <Head>
        <title>Scheme India - Found Schemes</title>
      </Head>
      <NextButton
        onClick={previousPageHandler}
        image={previousBtn}
        type="mobile_bottom_center_button"
      />
      <div className={styles.right_side}>
        <p>We have found following schemes using your details.</p>
        <div className={styles.scheme_card_list}>
          {props.schemes.map((scheme) => {
            return (
              <Link
                href={`/users/fill-details/found-schemes/${scheme.id}`}
                key={scheme.id}
              >
                <a>
                  <Card
                    image={schoolBoy}
                    heading={scheme.name}
                    color={"#6db24f"}
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const schemeTypeName = "health";
  const userPassword = process.env.MONGODB_PASSWORD;

  const client = new MongoClient(
    `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  ).connect();

  const db = (await client).db();

  const schemesCollection = db.collection("schemes");

  const schemes = await schemesCollection
    .find({ type: schemeTypeName })
    .toArray();

  (await client).close;

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
    revalidate: 10,
  };
}

export default FoundSchemesPage;
