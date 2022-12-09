/**
 * REGEX FOR VALIDATING THE URL PATH
 *
 * ^\/${1stPathPart}\/${2ndPathPart}?(\?)[a-zA-Z0-9=]*
 *
 * For validating path dynamic route:
 *
 * ^\/users\/:[a-zA-Z0-9]*\/edit?(\?)[a-zA-Z0-9=]*
 *
 * EXAMPLES
 * /user/:id (/user/1) --> ^\/users\/[a-zA-Z0-9]*?(\?)[a-zA-Z0-9=]*
 * /user/:id/edit (/user/1/edit) --> ^\/users\/[a-zA-Z0-9]*\/edit?(\?)[a-zA-Z0-9=]*
 * /
 */

const paths = ["/user/:id", "/user/edit"];
const actualPaths = [
  "/user/123",
  "user/123/",
  "/users/123",
  "/user/",
  "/user/123/edit",
  "/user/123/edit?id=213",
  "/user/edit?id=123",
];

const regexForPaths = paths.map((p) => {
  const pathSplit = p.split("/");

  let regexString = "^";

  pathSplit.forEach((x) => {
    if (x === "") return;

    if (x.includes(":")) {
      regexString += "\\/[a-zA-Z0-9]+";
    } else {
      regexString += "\\/" + x;
    }
  });

  regexString += "((\\?)[a-zA-Z0-9=&]*)?";

  console.log("STRING", regexString);
  console.log("EXP", RegExp(regexString));

  return RegExp(regexString);
});

actualPaths.forEach((pat) => {
  console.log(pat.match(regexForPaths[1]));
});
