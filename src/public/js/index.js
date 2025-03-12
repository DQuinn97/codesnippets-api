const datarows = document.querySelectorAll(".data-row");
let taalFilter = document.getElementById("filter_taal");
let tagFilter = document.getElementById("filter_tags");

console.log(taalFilter, tagFilter);
taalFilter.addEventListener("change", (e) => getTaal(e.target));
tagFilter.addEventListener("change", (e) => getTags(e.target));

let TaalFilter = "alle";
let TagFilter = "alle";

const hideFiltered = () => {
  datarows.forEach((element) => {
    if (
      (element.querySelectorAll(".snippet_language")[0].innerText !==
        TaalFilter &&
        TaalFilter !== "alle") ||
      (!element
        .querySelectorAll(".snippet_tags")[0]
        .innerText.split(", ")
        .includes(TagFilter) &&
        TagFilter !== "alle")
    )
      element.className = "hidden";
    else {
      element.className = "";
    }
  });
};
const getTaal = (filter) => {
  TaalFilter = filter.value;
  hideFiltered();
};
const getTags = (filter) => {
  TagFilter = filter.value;
  hideFiltered();
};
