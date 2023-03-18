document.addEventListener("click", e => {
    //Dropdown Category Menu
    var isDropdownButton = e.target.matches("[data-dropdown-button]");
    if(!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

    let currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("menuactive");
    };

    document.querySelectorAll("[data-dropdown].menuactive").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("menuactive");
    });
});

// Preloader
const preloader = document.getElementById("preloader");

if(window.onload) {
    preloader.classList.add("current-preloader");
} else {
    preloader.classList.remove("current-preloader");
}

//Mobile Bottom Navbar
var submenu = document.querySelectorAll(".has-child .fa-chevron-right");
submenu.forEach((menu) => menu.addEventListener("click", toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest(".has-child").classList.remove('expand') : null)
    if (this.closest(".has-child").classList != "expand");
    this.closest(".has-child").classList.toggle("expand");    
}
// Sidebar Open & Close Function
let sidebar = document.getElementById("sidebar");
    menuBtn = document.getElementById("menuBtn");
    closeBtn = document.getElementById("sidebarClose");
//Open the sidemenu
menuBtn.addEventListener("click", function(){
    sidebar.classList.toggle("sidemenuActive");
});
//This statement closes the sidemenu
closeBtn.addEventListener("click", function(){
    sidebar.classList.remove("sidemenuActive");
});

//Shop product generation
let shopProducts = document.getElementById("shopProducts");


//Creat an arrayFunction that Stores the data of any selected item
//if there is a data in the local storage, it retrieves it. If not, an empty array is parsed.
let dataBasket = JSON.parse(localStorage.getItem("data")) || []

//Set a function that generates the shop products
let generateShopProducts = () => {
    //target a place where the products should be generated in
    //In this case, we generate the products inside of the shopProducts section
    return (shopProducts.innerHTML = shopItemsData
        //here, a map function is created, it then loops through the number of shopItemsData available
        .map((product) => {
            let {id,name,price,original,brand,reviewCount,discount,img} = product;
            let search = dataBasket.find((investigator) => investigator.id === id) || [];
        return `
        <div id=product-id-${id} class="product">
            <div class="product-image">
                <a href="#">
                    <img src=${img} id="pimage" alt="">
                </a>
            </div>
            <div class="prodcut-brand">
                <p class="text-muted">${brand}</p>
            </div>
            <div class="product-title">
                <h4>${name}</h4>
            </div>
            <div class="product-review-stat">
                <i class="fas fa-star gold"></i>
                <i class="fas fa-star gold"></i>
                <i class="fas fa-star gold"></i>
                <i class="fas fa-star gold"></i>
                <i class="fas fa-star gold"></i>
                <span class="review-count text-muted">${reviewCount} (1k+)</span>
            </div>
            <div class="product-price">
                <div class="price-tag">
                    <p class="danger price-count" id="productPrice">$ ${price}</p>
                    <small class="text-muted">$ ${original}</small>
                </div>
                <div class="percent-off">
                    <p class="danger" id="percentCount">${discount} %</p>
                </div>
            </div>
            <div class="add">
                <button class="cta add" id="addToCartBtn" title="Add To Cart">
                    <i onclick="decrement(${id});" class="fas fa-minus" id="decrement"></i>
                    <p class="text-muted itemAmount" id=${id}>
                    ${search.item === undefined ? 0 : search.item}
                    </p>
                    <i onclick="increment(${id});" class="fas fa-plus" id="increment"></i>
                </button>
            </div>
        </div><!--product-->
        `;
    }).join(""));//the ".join("") function removes the back ticks"
};
generateShopProducts();

//Create the cart increment and decrement function
//increment
let increment = (id) => {
    //Only increase the value inside of the selected item, NOT others!
    let selectedProduct = id;
    //A searchFunction is created here. if the selectedProduct already exists,
    //the only the item number should increase
    let search = dataBasket.find((investigator) => investigator.id === selectedProduct.id);
    //if the item does not exist, the dataBasket.push function will run i.e. adds a new object the DB
    if(search === undefined) {
        dataBasket.push({
            id: selectedProduct.id,
            item: 1,
        });
        //Whenever a user clicks the increment button, the above statements will run,
        //and then the data is stored inside of the dataBasket, then logged on to the console
    }
    //if the item already exists, then add to the item number
    else{
        search.item += 1;
    }
    // console.log(dataBasket);
    updateCartQuantity(selectedProduct.id);

    localStorage.setItem("data", JSON.stringify(dataBasket));
};
let decrement = (id) => {
    //Only decrease the value inside of the selected item, NOT others!
    let selectedProduct = id;
    //A searchFunction is created here. if the selectedProduct already exists,
    //the only the item number should decrease
    let search = dataBasket.find((investigator) => investigator.id === selectedProduct.id);
    if(search === undefined) return;
    //if the item does not exist, the dataBasket.push function will run i.e. adds a new object the DB
    else if(search.item === 0) return;
    //also, whenever the search.item hits zero, the whole decrement function stops(above)
    else{
        search.item -= 1;
    }
    updateCartQuantity(selectedProduct.id);
    //to remove the item with an item number of zero, from inside the local storage
    dataBasket = dataBasket.filter((investigator) => investigator.item !== 0);
    //the above statement targets all products with an item number greater than zero,
    //and we only require the item; hence, investigator.item

    // use the local storage to stor the shop data
    localStorage.setItem("data", JSON.stringify(dataBasket));
};
let updateCartQuantity = (id) => {
    //if the item exists, and matches the id, the number will increase
    let search = dataBasket.find((investigator) => investigator.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    //Note: the cartSum function will only work, when the updateCartQuantity function works
    cartSum();
};
//create a function that sums up all the number of the selectedProduct
let cartSum = () => {
    let cartTotal = document.getElementById("cartCount");
    // Use the reduce function to calculate the sum total of the cart items
    cartTotal.innerHTML = dataBasket.map((investigator) => investigator.item).reduce((a, b) => a+b,0);
};
cartSum();
