const main = document.getElementById("main");
document.getElementById("newCard").style.border = "1px solid white";

document.getElementById("newCard").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("nodata").style.display = "none";

  document.getElementById("yourCardsDiv").style.display = "none";
  document.getElementById("newCardDiv").style.display = "flex";
  document.getElementById("newCard").style.border = "1px solid white";
  document.getElementById("yourCards").style.border = "none";
});

function updatePreviewBox(handler, type, event) {
  let handlerOf;
  if (type === "title") handlerOf = handler[0];
  else {
    handlerOf = handler[1];
  }
  if (event.target.value.trim() === "") {
    document.getElementById(type).innerText = "'Empty'";
    document.getElementById(type).setAttribute("class", "empty");

    return;
  }

  if (handlerOf) clearTimeout(handlerOf);
  handlerOf = setTimeout(function () {
    console.log(event.target.value);
    document.getElementById(type).innerText = event.target.value;
    document.getElementById(type).setAttribute("class", "");
  }, 500);
  if (type === "title") handler[0] = handlerOf;
  else {
    handler[1] = handlerOf;
  }

  console.log(event.target.value);
}

let handlerArray = [];
document
  .getElementById("titleFiled")
  .addEventListener(
    "input",
    updatePreviewBox.bind(null, handlerArray, "title")
  );

document
  .getElementById("descriptionField")
  .addEventListener(
    "input",
    updatePreviewBox.bind(null, handlerArray, "description")
  );

document
  .getElementById("formOfData")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (
      document.getElementById("titleFiled").value.trim() === "" ||
      document.getElementById("descriptionField").value.trim() === ""
    ) {
      console.log("empty");
      document.getElementById("overlay").style.display = "flex";
      document.getElementById("errorMessage").innerText =
        "You must add some data";
      return;
    }

    const data = {
      title: document.getElementById("titleFiled").value.trim(),
      description: document.getElementById("descriptionField").value.trim(),
    };
    document.getElementById("spinner").style.display = "flex";
    fetch("https://task2-dbe23-default-rtdb.firebaseio.com/Cards.json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "applecation/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("spinner").style.display = "none";

        document.getElementById("titleFiled").value = "";
        document.getElementById("descriptionField").value = "";
        document.getElementById("title").innerText = "'Empty'";
        document.getElementById("title").setAttribute("class", "empty");
        document.getElementById("description").innerText = "'Empty'";
        document.getElementById("description").setAttribute("class", "empty");
      })
      .catch((err) => {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("errorMessage").innerText = err.message;
        document.getElementById("overlay").style.display = "flex";
        console.log(err.message);
      });
  });

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "none";
});
document.getElementById("bluroverlay").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "none";
});

document
  .getElementById("yourCards")
  .addEventListener("click", function (event) {
    document.getElementById("newCardDiv").style.display = "none";
    document.getElementById("yourCardsDiv").style.display = "grid";
    document.getElementById("newCard").style.border = "none";
    document.getElementById("yourCards").style.border = "1px solid white";

    document.getElementById("spinner").style.display = "flex";
    event.preventDefault();
    fetch("https://task2-dbe23-default-rtdb.firebaseio.com/Cards.json")
      .then((respnse) => respnse.json())
      .then((data) => {
        document.getElementById("yourCardsDiv").innerHTML = "";
        if (data === null) {
          document.getElementById("yourCardsDiv").style.display = "none";
          document.getElementById("nodata").style.display = "block";
        } else {
          Object.entries(data).map((e, i) => {
            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "previeww");
            const innerDiv = document.createElement("div");
            innerDiv.setAttribute("class", "firstinner");

            const h1Tag = document.createElement("h1");
            h1Tag.innerText = `Card ${i}`;

            const innerinnerDiv = document.createElement("div");
            innerinnerDiv.setAttribute("class", "previewwBox");

            const spanOne = document.createElement("div");
            spanOne.setAttribute("id", "title2");
            spanOne.setAttribute("title", `${e[1].title}`);
            spanOne.setAttribute("data", e[1].title);

            spanOne.innerText = e[1].title;

            const spanTwo = document.createElement("span");
            spanTwo.setAttribute("id", "description2");
            spanTwo.innerText = e[1].description;
            spanTwo.setAttribute("title", `${e[1].description}`);

            innerinnerDiv.appendChild(spanOne);
            innerinnerDiv.appendChild(spanTwo);

            innerDiv.appendChild(h1Tag);
            innerDiv.appendChild(innerinnerDiv);
            newDiv.appendChild(innerDiv);
            document.getElementById("yourCardsDiv").appendChild(newDiv);
          });
        }
        document.getElementById("spinner").style.display = "none";
      })
      .catch((err) => {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("errorMessage").innerText = err.message;
        document.getElementById("overlay").style.display = "flex";
        console.log(err.message);
      });
  });
