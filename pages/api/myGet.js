import router from "next/router";

async function myGet(url, context) {
  const cookie = context.req.headers.cookie;

  const response = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  });

  if (response.status === 401 && !context.req) {
    router.replace("/admin-login");
    return {};
  }

  if (response.status === 401 && context.req) {
    context.res.writeHead(302, {
      Location: "http://localhost:3000/admin",
    });
    context.res.end();
    return;
  }

  const json = await response.json();

  return json;
}

export default myGet;
