"use strict";

const btn = document.querySelector(".btn");
const allTables = document.querySelector(".all__tables");

const td = function (post, headings) {
  let tdata = "";
  headings.forEach((val) => {
    let data = post[val];

    let temp = "";
    if (typeof data === "object") {
      data.forEach((val) => {
        temp += `${val} \n`;
      });
      data = temp;
    }

    tdata += `<td>${data}</td>`;
  });
  return tdata;
};

const API = async function (parameter) {
  try {
    const firstApi = await fetch(`https://dummyjson.com/${parameter}`);
    console.log(firstApi);
    if (!firstApi.ok) {
      return false;
    }

    const firstApiJson = await firstApi.json();
    console.log(firstApiJson);
    const firstApiData = firstApiJson[parameter];
    console.log(firstApiData[0]);


    const headings = Object.keys(firstApiData[0]);
    let headingsHtml = "";
    headings.forEach((val) => {
      headingsHtml += `<th>${val}</th>`;
    });
    const tablePosts = document.createElement("table");
    tablePosts.insertAdjacentHTML("beforeend", headingsHtml);

    firstApiData.forEach((post) => {
      let row = document.createElement("tr");
      let tdData = td(post, headings);
      tablePosts.insertAdjacentHTML("beforeend", tdData);
    });
    allTables.insertAdjacentHTML("beforeend", `<h2>${parameter} table </h2>`);
    allTables.appendChild(tablePosts);

    return true;
  } catch (err) {
    console.error(err);
  }
};

const callAPIs = function () {
  btn.style.display = "none";
  setTimeout(async () => {
    const PromiseAPI1 = await API("posts");
    if (!PromiseAPI1) return;
  }, 1000);

  setTimeout(async () => {
    const PromiseAPI2 = await API("products");
    if (!PromiseAPI2) return;
  }, 2000);

  setTimeout(async () => {
    const PromiseAPI3 = await API("todos");
  }, 3000);
};

btn.addEventListener("click", callAPIs);
