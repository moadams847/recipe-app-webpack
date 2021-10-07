// imports
// import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import Data from "./utils/data";
import DataUi from "./utils/ui";

// dom queries
const tableOutPut = document.querySelector(".tableOutPut");
const addRecipe = document.querySelector(".addRecipe");
const toggleArrow = document.querySelectorAll(".toggleArrow");
const header = document.querySelector(".header");
const editRecipe = document.querySelector(".editRecipe");
const search = document.querySelector("#search");

// add recipe
addRecipe.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = addRecipe.author.value.trim();
  const title = addRecipe.title.value.trim();
  const ingredients = addRecipe.ingredients.value.trim();
  const procedure = addRecipe.procedure.value.trim();

  data
    .addData(author, title, ingredients, procedure)
    .then(() => {
      addRecipe.reset();
    })
    .catch((e) => {
      console.log(e);
    });
});

//arrow actions
toggleArrow.forEach((th) => {
  th.addEventListener("mouseenter", () => {
    th.querySelector(".hide").classList.remove("d-none");
  });
});

toggleArrow.forEach((th) => {
  th.addEventListener("mouseleave", () => {
    th.querySelector(".hide").classList.add("d-none");
  });
});

// handle sort
let newArray = [];
const myArray = async (data, id) => {
  let newObject = {
    author: data.author,
    title: data.title,
    ingredients: data.ingredients,
    procedure: data.procedure,
    created_at: data.created_at,
    id,
  };
  newArray.push(newObject);
};

header.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi")) {
    let column =
      e.target.parentElement.parentElement.getAttribute("data-column");
    let order = e.target.parentElement.parentElement.getAttribute("data-order");
    let arrow = e.target.parentElement;

    if (order === "desc") {
      e.target.parentElement.parentElement.setAttribute("data-order", "asc");
      newArray = newArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      arrow.innerHTML = '<i class="bi bi-arrow-up"></i>';
    } else {
      e.target.parentElement.parentElement.setAttribute("data-order", "desc");
      newArray = newArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
      arrow.innerHTML = '<i class="bi bi-arrow-down"></i>';
    }

    dataUi.clearUi();
    newArray.forEach((item) => {
      dataUi.render(item, item.id);
    });
  }
});

//  filter
const filterRecipes = (term) => {
  Array.from(tableOutPut.children)
    .filter((recipe) => {
      return !recipe.textContent.toLowerCase().includes(term);
    })
    .forEach((recipe) => {
      recipe.classList.add("filtered");
    });

  Array.from(tableOutPut.children)
    .filter((recipe) => {
      return recipe.textContent.toLowerCase().includes(term);
    })
    .forEach((recipe) => {
      recipe.classList.remove("filtered");
    });
};

search.addEventListener("keyup", (e) => {
  const term = search.value.trim().toLowerCase();
  filterRecipes(term);
});

// modal activate
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var Btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
tableOutPut.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-edit")) {
    modal.style.display = "block";
    let author = e.target.parentElement.parentElement.children[0].textContent;
    let title = e.target.parentElement.parentElement.children[1].textContent;
    let ingredients =
      e.target.parentElement.parentElement.children[2].textContent;
    let procedure =
      e.target.parentElement.parentElement.children[3].children[0].getAttribute(
        "href"
      );
    let id = e.target.parentElement.parentElement.getAttribute("data-id");

    editRecipe.author.value = author;
    editRecipe.title.value = title;
    editRecipe.ingredients.value = ingredients;
    editRecipe.procedure.value = procedure;
    editRecipe.editID.value = id;
  } else if (e.target.classList.contains("fa-trash")) {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    data
      .deleteData(id)
      .then(() => {
        console.log("deleted");
      })
      .catch((e) => {
        console.log(e);
      });
  }
});

// edit
editRecipe.addEventListener("submit", (e) => {
  e.preventDefault();
  let author = editRecipe.author.value;
  let title = editRecipe.title.value;
  let ingredients = editRecipe.ingredients.value;
  let procedure = editRecipe.procedure.value;
  let id = editRecipe.editID.value;

  data
    .editData(id, author, title, ingredients, procedure)
    .then(() => {
      newArray = [];
      data.getData((data, id) => myArray(data, id));
      modal.style.display = "none";
      const idFromForm = editRecipe.editID.value;
      return data.getSingleRecord(idFromForm);
    })
    .then((data) => {
      dataUi.updateDom(data.data(), data.id);
    })
    .catch((e) => {
      console.log(e);
    });
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// class instances
const data = new Data("Recipes");
const dataUi = new DataUi(tableOutPut);

// class methods
data.getData((data, id) => myArray(data, id));
data.getData((data, id) => dataUi.render(data, id));
data.getData((id) => dataUi.removeFromDom(id));
