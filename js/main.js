var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var btnUpdate = document.getElementById("btnUpdate");
var btnAdd = document.getElementById("btnAdd");
var textAlert = document.getElementById("textAlert");
var priceAlert = document.getElementById("priceAlert");
var categoryAlert = document.getElementById("categoryAlert");
var descAlert = document.getElementById("descAlert");
var productdata = [];
var indexUpdate = 0;

if (localStorage.getItem("product") != null) {
  productdata = JSON.parse(localStorage.getItem("product"));
  displayData();
}

function addProduct() {
  if (
    productNameVallidation() == true &&
    productPriceVallidation() == true &&
    productCategoryVallidation() == true &&
    productDescVallidation() == true
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescriptionInput.value,
    };
    productdata.push(product);
    localStorage.setItem("product", JSON.stringify(productdata));
    displayData();
    cleardata();
  }
}

function cleardata() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
}

function displayData() {
  var cartonaa = "";
  for (let i = 0; i < productdata.length; i++) {
    cartonaa += `
    <tr>
      <td>${i + 1}</td>
      <td>${productdata[i].name}</td>
      <td>${productdata[i].price}</td>
      <td>${productdata[i].category}</td>
      <td>${productdata[i].desc}</td>
      <td><button class="btn btn-warning text-light" onclick="updateitem(${i})">update</button></td>
      <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = cartonaa;
}

function deleteProduct(index) {
  productdata.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productdata));
  displayData();
}

function searchProduct() {
  var text = searchInput.value;
  var cartonaa = "";
  var found = false;
  for (let i = 0; i < productdata.length; i++) {
    if (productdata[i].name.toLowerCase().includes(text.toLowerCase())) {
      found = true;
      cartonaa += `
      <tr>
        <td>${i + 1}</td>
        <td>${productdata[i].name}</td>
        <td>${productdata[i].price}</td>
        <td>${productdata[i].category}</td>
        <td>${productdata[i].desc}</td>
        <td><button class="btn btn-warning text-light" onclick="updateitem(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
      </tr>
      `;
    }
  }
  if (!found) {
    cartonaa = `
      <tr>
        <td colspan="7" class="text-center text-light bg-danger px-2">No matching products found.</td>
      </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = cartonaa;
}

function updateitem(index) {
  indexUpdate = index;
  var curentProduct = productdata[index];
  productNameInput.value = curentProduct.name;
  productPriceInput.value = curentProduct.price;
  productCategoryInput.value = curentProduct.category;
  productDescriptionInput.value = curentProduct.desc;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
   return true;
}

function updateProduct() {
  if (
    productNameVallidation() == true &&
    productPriceVallidation() == true &&
    productCategoryVallidation() == true &&
    productDescVallidation() == true
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescriptionInput.value,
    };
    productdata.splice(indexUpdate, 1, product);
    localStorage.setItem("product", JSON.stringify(productdata));
    displayData();
    cleardata();
    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
    return true;
  }
}

function productNameVallidation() {
  var vallidation = productNameInput.value;
  var regex = /^[A-Z][a-z]{4,12}$/;
  if (regex.test(vallidation) == true) {
    productNameInput.classList.remove("is-invalid");
    productNameInput.classList.add("is-valid");
    textAlert.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    textAlert.classList.remove("d-none");
    return false;
  }
}
function productPriceVallidation() {
  var vallidation = productPriceInput.value;
  var regex = /^([1-9]\d{2}|[1-9]\d{3,5}|1000000)$/;
  if (regex.test(vallidation) == true) {
    productPriceInput.classList.remove("is-invalid");
    productPriceInput.classList.add("is-valid");
    priceAlert.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
    return false;
  }
}

function productCategoryVallidation() {
  var vallidation = productCategoryInput.value;
  var regex = /^[A-Z][a-z]{5,13}$/;
  if (regex.test(vallidation) == true) {
    productCategoryInput.classList.remove("is-invalid");
    productCategoryInput.classList.add("is-valid");
    categoryAlert.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    categoryAlert.classList.remove("d-none");
    return false;
  }
}
function productDescVallidation() {
  var vallidation = productDescriptionInput.value;
  var regex = /^[a-z]{4,50}$/gim;
  if (regex.test(vallidation) == true) {
    productDescriptionInput.classList.remove("is-invalid");
    productDescriptionInput.classList.add("is-valid");
    descAlert.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    descAlert.classList.remove("d-none");
    return false;
  }
}
