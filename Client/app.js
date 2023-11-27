document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    document.getElementById("createForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("createName").value;
        const price = document.getElementById("createPrice").value;

        fetch("http://localhost:5252/api/Crud/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, price: price }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(() => {
            loadProducts();
            document.getElementById("createForm").reset();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    function loadProducts() {
        fetch("http://localhost:5252/api/Crud/AllProducts", {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    function displayProducts(products) {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";

        products.forEach(product => {
            const listItem = document.createElement("li");
            listItem.textContent = `ID: ${product.productId}, Name: ${product.name}, Price: ${product.price}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                // Show confirmation dialog before deleting
                const confirmDelete = confirm("Are you sure you want to delete this product?");
                if (confirmDelete) {
                    deleteProduct(product.productId);
                }
            });
            listItem.appendChild(deleteButton);

            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", function () {
                showUpdateForm(product);
            });
            listItem.appendChild(updateButton);

            productList.appendChild(listItem);
        });
    }

    function showUpdateForm(product) {
        const updateForm = document.getElementById("updateForm");
        updateForm.style.display = "block";

        document.getElementById("updateProductId").value = product.productId;
        document.getElementById("updateName").value = product.name;
        document.getElementById("updatePrice").value = product.price;

        document.getElementById("updateForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const productId = document.getElementById("updateProductId").value;
            const updatedName = document.getElementById("updateName").value;
            const updatedPrice = document.getElementById("updatePrice").value;

            fetch(`http://localhost:5252/api/Crud/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: updatedName, price: updatedPrice }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                loadProducts();
                hideUpdateForm();
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    }

    function hideUpdateForm() {
        document.getElementById("updateForm").style.display = "none";
    }
    
    function deleteProduct(productId) {
        fetch(`http://localhost:5252/api/Crud/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(() => {
            loadProducts();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});
