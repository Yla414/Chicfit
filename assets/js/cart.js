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

let cartPageTitle = document.getElementById("cart-page-title");
let shoppingCart = document.getElementById("shopping-cart");
let summaryPage = document.getElementById("summarySection");

let dataBasket = JSON.parse(localStorage.getItem("data")) || [];

console.log(dataBasket);

//create a function that sums up all the number of the selectedProduct
let cartSum = () => {
    let cartTotal = document.getElementById("cartCount");
    // Use the reduce function to calculate the sum total of the cart items
    cartTotal.innerHTML = dataBasket.map((investigator) => investigator.item).reduce((a, b) => a+b,0);
};
cartSum();

// Creat a function that generates cart Items on the page
let generateCartItems = () => {
    //check if there ia data in the dataBasket
    //If there is an item in the dataBasket, the if statement will run
    if(dataBasket.length !== 0) {
        // the investigator will target the objects in the data one by one, and then prints out the result on the page
        return (shoppingCart.innerHTML = dataBasket
            .map((investigator) => {
                let {id, item} = investigator
                // creat a search function that checks to see if the id from the basket
                // matches that in the database(shopData.js)
                let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="wrapper">
                <div class="cart-items">
                    <div class="cart-item">
                        <div class="top">
                            <div class="left">
                                <a href="#">
                                    <img width="135" src="${search.img}"" alt="">
                                </a>
                                <div class="details">
                                    <p class="brand">${search.brand}</p>
                                    <h3 class="name">${search.name}</h3>
                                    <p>Size: <span class="text-muted">XXL</span></p>
                                    <a href="#">Few available in stock</a>
                                </div>
                            </div>
                            <div class="right">
                                <div class="price">
                                    <h3 class="price">$ ${search.price}</h3>
                                </div>
                                <div class="discount">
                                    <p class="text-muted original">$ ${search.original}</p>
                                    <p class="discountPercent">${search.discount}%</p>
                                </div>
                            </div>
                        </div>
                        <!-- top -->

                        <div class="bottom">
                            <div class="left">
                                <div class="units">
                                    <button id="decrement" onclick=decrement(${id})>
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <p class="text-muted itemAmount" id=${id}>${item}</p>
                                    <button id="increment" onclick=increment(${id})>
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="right">
                                <div class="remove">
                                    <button id="removeItem" onclick=removeItem(${id})>
                                        Remove
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            `;
        }).join(""));
    }
    //the else stament will run, if the cart is empty
    else{
        console.log("basket is empty");
        // shoppingCart.innerHTML = ``;
        cartPageTitle.innerHTML = `
            <h1>Your Cart Is Empty!</h1>
            <a href="shop.html">
                <button class="shopBtn">Explore</button>
            </a>
        `;
        shoppingCart.innerHTML=`
        `;
    };
};
generateCartItems();


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
    generateCartItems();
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

    generateCartItems();
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
    TotalAmount();
};

// A remove function with an id is set here. the id serves to tell JS which specific cart Item it should delete
// completely from the database
let removeItem = (id) => {
    let selectedProduct = id
    console.log(selectedProduct.id);
    dataBasket = dataBasket.filter((investigator) => investigator.id !== selectedProduct.id);
    generateCartItems();

    //Note: the cartSum function will only work, when the updateCartQuantity function works
    cartSum();
    TotalAmount();

    // use the local storage to stor the shop data
    localStorage.setItem("data", JSON.stringify(dataBasket));
};

let TotalAmount = () => {
    // If the basket is not empty, then the following code will run
    if(dataBasket.length !== 0) {
        let amount = dataBasket.map((investigator) => {
            let {id, item} = investigator;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price + search.discount;
        }).reduce((x,y) => x+y,0);
        cartPageTitle.innerHTML = `
        <div class="wrapper">
            
            <div class="title">
                <h1>Shopping Cart</h1>
                <h2>Total Bill : $ ${amount}.00</h2>
                <div class="buttons">
                    <button class="clearCart" onclick="clearCart();">
                        Clear cart
                        <i class="fas fa-trash"></i>
                    </button>
                    <a href="checkout.html">
                        <button class="checkoutBtn">
                            Proceed to checkout
                            <img width="22" src="/assets/images/png_icons/checkout_64.png" alt="">
                        </button>
                    </a>
                </div>
            </div>
        </div>
        `;
    }
    else return;
};
TotalAmount();

let clearCart = () => {
    dataBasket = [];
    generateCartItems();
    //Note: the cartSum function will only work, when the updateCartQuantity function works
    cartSum();
    localStorage.setItem("data", JSON.stringify(dataBasket));
};


