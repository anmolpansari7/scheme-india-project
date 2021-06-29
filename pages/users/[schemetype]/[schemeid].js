import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import SchemeDetails from "../../../components/Common/SchemeDetails";

const viewSchemeDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.scheme.name}</title>
        <meta name="description" content={props.scheme.details} />
        <meta name="keywords" content={props.scheme.name} />
      </Head>
      <SchemeDetails scheme={props.scheme} />
    </>
  );
};

export async function getStaticPaths() {
  const userPassword = process.env.MONGODB_PASSWORD;

  const client = new MongoClient(
    `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  ).connect();

  const db = (await client).db();

  const schemesCollection = db.collection("schemes");

  const schemes = await schemesCollection
    .find({}, { _id: 1, type: 1 })
    .toArray();

  (await client).close;

  return {
    fallback: "blocking",
    paths: schemes.map((scheme) => ({
      params: {
        schemetype: scheme.type.toString(),
        schemeid: scheme._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const schemeId = context.params.schemeid;
  const userPassword = process.env.MONGODB_PASSWORD;

  const client = new MongoClient(
    `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  ).connect();
  const db = (await client).db();

  const schemesCollection = db.collection("schemes");

  const selectedScheme = await schemesCollection.findOne({
    _id: ObjectId(schemeId),
  });

  (await client).close;

  return {
    props: {
      scheme: {
        type: selectedScheme.type,
        name: selectedScheme.name,
        link: selectedScheme.link,
        details: selectedScheme.details,
        eligibility: selectedScheme.eligibility,
        addedOn: selectedScheme.addedOn,
        id: selectedScheme._id.toString(),
      },
    },
    revalidate: 1,
  };
}
export default viewSchemeDetails;
