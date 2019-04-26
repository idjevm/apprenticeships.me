const form = document.querySelector(".gh-form");
const formParent = form.parentNode;
const title = form.querySelector("#title");
const link = form.querySelector("#link");
const description = form.querySelector("#description");
const locations = form.querySelector("#locations");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const captcha = form.querySelector("#g-recaptcha-response");
  const URL = "/.netlify/functions/form";
  console.log(URL);

  const issue = {
    title: title.value.trim(),
    body:
      description.value.trim() +
      " \n " +
      link.value.trim() +
      " \n " +
      locations.value.trim(),
    labels: ["enhancement", "help wanted"],
    captcha: captcha.value
  };

  fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify(issue)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(data.msg);
    });
  // return fetch(`${hostname}.com/.netlify/functions/form`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(issue)
  // })
  //   .then((i) => {
  //     if (i.status !== 200) throw Error();
  //     return i;
  //   })
  //   .then((i) => {
  //     formParent.innerHTML = `
  //     <p>Thank you for your contribution!</p>
  //     `;
  //   })
  //   .catch((err) => {
  //     const paragraph = document.createElement("p");
  //     const classes = ["text-red", "text-base", "mb-6", "text-center"];
  //     paragraph.classList.add(...classes);
  //     paragraph.innerHTML = `Oh no, something went wrong. <br> Please try again or enter it directly <a class="font-bold text-green-dark hover-text-green-darker no-underline hover-underline transition"
  //       href="https://github.com/fvcproductions/apprenticeships.me/issues/new/choose">here</a>.`;
  //     form.prepend(paragraph);
  //   });
});
