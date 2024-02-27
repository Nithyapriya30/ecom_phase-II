var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  Name = document.getElementById("name"),
  capacity = document.getElementById("capacity"),
  Status = document.getElementById("status");
price = document.getElementById("price"),
  offer = document.getElementById("offer"),
  description = document.getElementById("description"),
  suitable = document.getElementById("suitable"),
  sDate = document.getElementById("sDate"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser");
  deleteConfirmationModal=document.getElementById('deleteConfirmationModal');
let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

let isEdit = false,
  editId;
showInfo();

newUserBtn.addEventListener("click", () => {
  (submitBtn.innerText = "Submit"), (modalTitle.innerText = "Fill the Form");
  isEdit = false;
  imgInput.src = "/ADMIN/public/Profile Icon.webp";
  form.reset();
});

file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };

    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("This file is too large!");
  }
};

function showInfo() {
  document.querySelectorAll(".hallDetails").forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class="hallDetails">
            <td>${index + 1}</td>
            <td><img src="${
              element.picture
            }" alt="" width="50" height="50"></td>
            <td>${element.Name}</td>
            <td>${element.Quantity}</td>
            <td>${element.category}</td>
            <td>
                <button class="btn text-white" onclick="readInfo('${
                  element.picture
                }', '${element.Name}', '${element.Quantity}', '${
      element.category
    }', '${element.Price}', '${element.offer}', '${
      element.description
    }', '${
      element.size
    }')" data-bs-toggle="modal" data-bs-target="#readData"><i class="fa-regular fa-eye"></i></button>
               

                <button class="btn text-white" onclick="editInfo(${index}, '${
      element.picture
    }', '${element.Name}', '${element.Quantity}', '${
      element.category
    }', '${element.Price}', '${element.offer}', '${
      element.description
    }','${
      element.size
    }')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="fa-regular fa-pen-to-square"></i></button>

                <button class="btn text-white" onclick="deleteInfo(${index})"><i class="fa-regular fa-trash-can"></i></button>
                            
            </td>
        </tr>`;

    userInfo.innerHTML += createElement;
  });
}
showInfo();

function readInfo(
  pic,
  name,
  capacity,
  status,
  price,
  offer,
  description,
  suitable
) {
  (document.querySelector(".showImg").src = pic),
    (document.querySelector("#Name").value = name),
    (document.querySelector("#Quantity").value = capacity),
    (document.querySelector("#category").value = status),
    (document.querySelector("#Price").value = price),
    (document.querySelector("#offer").value = offer),
    (document.querySelector("#description").value = description),
    (document.querySelector("#size").value = suitable);
}

function editInfo(
  index,
  pic,
  name,
  Capacity,
  status,
  Price,
  offer,
  description,
  Suitable
) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  Name.value = name;
  (capacity.value = Capacity),
    (Status.value = status),
    (price.value = Price),
    (offer.value = offer);
  description.value = description;
  suitable.value = Suitable;

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update The Form";
}

// function deleteInfo(index) {
//   if (confirm("Are you sure want to delete?")) {
//     getData.splice(index, 1);
//     localStorage.setItem("userProfile", JSON.stringify(getData));
//     showInfo();
//   }
// }

function deleteInfo(index) {
  // Set a global variable to store the index you want to delete
  window.deleteIndex = index;
  console.log('in')
  // Show the Bootstrap Modal
  $('#deleteConfirmationModal').modal('show');
}

function confirmDelete() {
  // Get the index to delete from the global variable
  var index = window.deleteIndex;

  // Perform the deletion
  getData.splice(index, 1);

  // Update local storage
  localStorage.setItem("userProfile", JSON.stringify(getData));

  // Close the Bootstrap Modal
  $('#deleteConfirmationModal').modal('hide');

  // Refresh your UI
  showInfo();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    const information = {
      picture:
        imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
      Name: Name.value,
      Quantity: capacity.value,
      category: Status.value,
      Price: price.value,
      offer: offer.value,
      description: description.value,
      size: suitable.value,
    };

    if (!isEdit) {
      getData.unshift(information);
    } else {
      isEdit = false;
      getData[editId] = information;
    }

    localStorage.setItem("userProfile", JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();

    imgInput.src = "./image/Profile Icon.webp";

    modal.style.display = "none";
    document.querySelector(".modal-backdrop").remove();
  }
});

function validateForm() {
  var isValid = true;

  // Reset previous error messages
  var errorElements = document.querySelectorAll(".error");
  errorElements.forEach(function (element) {
    element.textContent = "";
  });

  // Validate each input field
  var name = document.getElementById("name").value;
  if (!name || !/^[A-Za-z ]+$/.test(name)) {
    document.getElementById("name-error").textContent =
      "Please enter a valid name (alphabetic characters only)";
    isValid = false;
  }

  var capacity = document.getElementById("capacity").value;
  if (!capacity || isNaN(capacity)) {
    document.getElementById("capacity-error").textContent =
      "Please enter a valid capacity";
    isValid = false;
  }

  var status = document.getElementById("status").value;
  if (!status || !/^[A-Za-z]+$/.test(status)) {
    document.getElementById("status-error").textContent =
      "Please enter a valid status (alphabetic characters only)";
    isValid = false;
  }

  var price = document.getElementById("price").value;
  if (!price || isNaN(price)) {
    document.getElementById("price-error").textContent =
      "Please enter a valid price";
    isValid = false;
  }

  var offer = document.getElementById("offer").value;
  if (!offer || isNaN(offer)) {
    document.getElementById("offer-error").textContent =
      "Please enter a valid offer";
    isValid = false;
  }

  var description = document.getElementById("description").value;
  if (!description || !/^[A-Za-z]+$/.test(description)) {
    document.getElementById("description-error").textContent =
      "Please enter a valid amenities ";
    isValid = false;
  }

  var suitable = document.getElementById("suitable").value;
  if (!suitable || !/^[A-Za-z]+$/.test(suitable)) {
    document.getElementById("suitable-error").textContent =
      "Please enter valid suitable details (alphabetic characters only)";
    isValid = false;
  }

  return isValid;
  // Additional validation for file upload can be added if needed

  // if (isValid) {
  //   console.log("Form is valid. Submitting...");
  //   // Close the modal
  //   $("#userForm").modal("hide");
}
