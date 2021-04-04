async function mail({ To, Subject, Body }) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: "chatter-box",
    to: To,
    subject: Subject,
    emailBody: Body,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch("https://ultimate-mail-api.vercel.app/api", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch(() => {
      return "error";
    });
}
