import React from "react";

 function Products() {

     return (
        <ul class="topnav" id="menu">
        <h1>Shop Name</h1>
        <div class="bottom-arrow"><a href="#index" class="active">Home</a></div>
          <a href="src/products.html">Products</a>
          <a href="Shipping/shipping.html">Shipping & Returns</a>
          <a href="Contact/contact.html">Contact</a>
            <button class="topButton">HEY FUCK</button>
            <button class="topButton" onclick="showLogin()">Login</button>
            <div class="cart"><a href="../Cart/cart.html" class="cartlink"><img src="https://i.ibb.co/0DkxSzb/cart.png" class="cartimg"></img></a></div>
        </ul>

     );

 }

 export default Products;