let i = 0;
let index = 1;
let url = "http://localhost:3000/dummy/";
let dis = document.getElementById("display");
let mdis = document.getElementById("modelDisplay");
let models = document.getElementById("modalfoot");
let x5, x2, x3;
let testOne = document.getElementById("s1");
let testTwo = document.getElementById("s2");
let testThree = document.getElementById("s3");
let Id = i++;
let obj = {
  id: "",
  name: "",
  phoneNumber: "",
  Address: "",
};

//* ADD ROWS

function add1() {
  testOne.style.display = "block";
  testTwo.style.display = "none";
  testThree.style.display = "none";
}

function addRow() {
  let Name = document.getElementById("name1").value;
  let Pnum = document.getElementById("pnum1").value;
  let Addr = document.getElementById("address1").value;

  obj = {
    id: Id,
    name: Name,
    phoneNumber: Pnum,
    Address: Addr,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
}

//* SAVE (Post to Server)

fetch(url)
  .then((res) => res.json())
  .then((data) =>
    data.forEach((data) => {
      rows = document.createElement("tr");
      rows.innerHTML = `<td class="but-align" style="display: none"> ${
        data.id
      } </td>
      <td style="text-align:center">${index++}</td>
  <td class="buts-align"> <button class="btn btn-outline-primary"  data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="editRow(this)">Edit</button>
  <button class="btn btn-outline-info" data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="insertRowBelow(this)">Insert</button>
  <button class="btn btn-outline-danger" onclick="deleteRow(this)">Delete</button> </td>
  <td class="but-align">${data.name}</td>
  <td class="but-align">${data.phoneNumber}</td>
  <td class="but-align">${data.Address}</td>`;
      dis.appendChild(rows);
    })
  );

//* EDIT BUTTON

function editRow(event) {
  testOne.style.display = "none";
  testTwo.style.display = "block";
  testThree.style.display = "none";
  let Name2 = event.parentElement.parentElement.children[3].innerHTML;
  let Pnum2 = event.parentElement.parentElement.children[4].innerHTML;
  let Addr2 = event.parentElement.parentElement.children[5].innerHTML;
  document.getElementById("name1").value = Name2;
  document.getElementById("pnum1").value = Pnum2;
  document.getElementById("address1").value = Addr2;
  x2 = parseInt(event.parentElement.parentElement.firstChild.innerHTML); // get current Id here for edit data
}

function editRow1() {
  let Name3 = document.getElementById("name1").value;
  let Pnum3 = document.getElementById("pnum1").value;
  let Addr3 = document.getElementById("address1").value;
  obj = {
    id: Id,
    name: Name3,
    phoneNumber: Pnum3,
    Address: Addr3,
  };
  fetch(url + x2, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

//* INSERT ROW

function insertRowBelow(event) {
  testOne.style.display = "none";
  testTwo.style.display = "none";
  testThree.style.display = "block";
  x3 = parseInt(event.parentElement.parentElement.firstChild.innerHTML);
  x5 = event.parentElement.parentElement;
  console.log(x5);
}

function insertRow1() {
  let Id = ++x3;
  let Name4 = document.getElementById("name1").value;
  let Pnum4 = document.getElementById("pnum1").value;
  let Addr4 = document.getElementById("address1").value;
  rows = document.createElement("tr");
  rows.innerHTML = `<td class="but-align" style="display: none"> ${Id} </td>
  <td style="text-align:center">${index}</td>
  <td class="buts-align"> <button class="btn btn-outline-primary"  data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="editRow(this)">Edit</button>
  <button class="btn btn-outline-info" data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="insertRowBelow(this)">Insert</button>
  <button class="btn btn-outline-danger" onclick="deleteRow(this)">Delete</button> </td>
  <td class="but-align">${Name4}</td>
  <td class="but-align">${Pnum4}</td>
  <td class="but-align">${Addr4}</td>`;
  x5.parentNode.insertBefore(rows, x5.nextSibling); //Add a new row below
  obj = {
    id: Id,
    name: Name4,
    phoneNumber: Pnum4,
    Address: Addr4,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  //   .then((res) => res.json())
  //   .then((data) =>
  //     data.forEach((data) => {
  //       if (data.id > Id) {
  //         rows = document.createElement("tr");
  //         rows.innerHTML = `<td class="but-align" style="display: none"> ${
  //           data.id
  //         } </td>
  //     <td style="text-align:center">${index++}</td>
  // <td class="buts-align"> <button class="btn btn-outline-primary"  data-bs-toggle="modal"
  // data-bs-target="#exampleModal" onclick="editRow(this)">Edit</button>
  // <button class="btn btn-outline-info" data-bs-toggle="modal"
  // data-bs-target="#exampleModal" onclick="insertRowBelow(this)">Insert</button>
  // <button class="btn btn-outline-danger" onclick="deleteRow(this)">Delete</button> </td>
  // <td class="but-align">${data.name}</td>
  // <td class="but-align">${data.phoneNumber}</td>
  // <td class="but-align">${data.Address}</td>`;
  //         dis.appendChild(rows);
  //       }
  //     })
  //   );
}

//* DELETE ROW
function deleteRow(event) {
  let del = confirm("Are you sure? ");
  if (del === true) {
    event.parentElement.parentElement.remove();
    let x = parseInt(event.parentElement.parentElement.firstChild.innerHTML);

    fetch(url + x, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
