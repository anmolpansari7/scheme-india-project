import { MongoClient } from "mongodb";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBox from "../../../components/Common/SearchBox";
import SchemeCard from "../../../components/User/SchemeCard";
import styles from "./../../../styles/showAllSchemePage.module.css";

const ShowAllSchemePage = (props) => {
  const router = useRouter();
  let schemeType = router.query.schemetype;
  const [shownData, setShownData] = useState([...props.schemes]);

  const goBackHandler = () => {
    router.back();
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

    setShownData(searchFilters);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={styles.show_all_scheme_page}>
      <Head>
        <title>{capitalizeFirstLetter(schemeType)} Schemes</title>
      </Head>
      <div className={styles.top_container}>
        <SearchBox onChange={filterSearchHandler} />
        <button onClick={goBackHandler}>Go Back</button>
      </div>
      <div className={styles.scheme_card_list}>
        {shownData.length === 0 ? (
          <p>No Scheme found ...</p>
        ) : (
          shownData.map((scheme) => {
            return (
              <Link href={`/users/${scheme.type}/${scheme.id}`} key={scheme.id}>
                <a>
                  <SchemeCard scheme={scheme} />
                </a>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          schemetype: "health",
        },
      },
      {
        params: {
          schemetype: "education",
        },
      },
      {
        params: {
          schemetype: "startup",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const schemeTypeName = context.params.schemetype;
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
    revalidate: 1,
  };
}

export default ShowAllSchemePage;
