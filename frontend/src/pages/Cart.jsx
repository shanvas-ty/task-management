// import React, { useEffect, useContext } from "react";
// import { Card, Button } from "react-bootstrap";
// import { API_URL, IMAGE_URL } from "../components/Apiconfiguration/config.js";
// // import {  Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";

// const Cart = () => {
//   const { username, isAuthorized ,setload,cartProducts, setCartProducts,cartSubTotal,CartItemsCount} = useContext(AuthContext); // Access context values
//   // const [cartProducts, setCartProducts] = useState([]); // List of cart products

 
//   // function inside Products
//   const updateQty = async(id,operation) => {
//     let message = ""; // Initialize a message variable
//     const updatedProducts = cartProducts.map((item) =>     
//       item.cart_pid === id? { ...item, 
//       cart_qty: operation === "increment" ? 
//       item.cart_qty < 5 ? item.cart_qty + 1 : item.cart_qty
//       :
//        item.cart_qty > 1 ? item.cart_qty - 1 : item.cart_qty,
//        }
//        : item
//     );
    
//     // alert(message)We are sorry! Only 5 units are allowed for each orders
//     setCartProducts(updatedProducts);
//     const updatedItem = updatedProducts.find((item) => item.cart_pid === id);
//     const cartUpdateData = {
//       email: username,
//       // items: [cartProducts], // Pass the items array, here it's a single item
//       items: [{
//         cart_pid: updatedItem.cart_pid,
//         cart_qty: updatedItem.cart_qty,
//         cart_price: updatedItem.cart_price,
//         cart_pic: updatedItem.cart_pic,
//         cart_pname: updatedItem.cart_pname,
//       },
//     ],
//     };
//     try{
//     const response = await fetch(`${API_URL}/cart/update`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cartUpdateData),
//     });
//     // const data = await response.json();
//     if (response.ok) {
//       const data = await response.json();
//       // setCartProducts(data.updated_items || []);
//       setload(true)
//       console.log("Cart updated successfully:", data);
//     } else {
//       console.error("Failed to update cart");
//     }
//   } catch (error) {
//     console.error("Error updating cart:", error);
//   }
// };
 
//   // Fetch cart data when the component mounts
//   // useEffect(() => {
//   //   const fetchCartData = async () => {
//   //     if (username && isAuthorized) {
//   //       const response = await fetch(`${API_URL}/cart/${username}`);
//   //       const data = await response.json();
//   //       // setCartProducts(data.updated_items || []);
//   //     }
//   //   };
//   //   fetchCartData();
//   // }, [username, isAuthorized]);

  

//    // Delete product function
//        const handleDelete = async (pid) => {
//           // const pidExists = await checkProductExists(pid);
  
//           // if (!pidExists) return;  // Exit if the product does not exist
  
//           const confirmDelete = window.confirm(`Are you sure you want to delete this product with ID: ${pid}?`);
//           if (!confirmDelete) return;
  
//           try {
//             const response = await fetch(`${API_URL}/cart/${username}?cart_pid=${pid}`, {
//               method: "DELETE",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             });
        
//             if (!response.ok) {
//               const errorData = await response.json();
//               throw new Error(errorData.detail || "Failed to delete cart item.");
//             }
//             setload(true)
//             const data = await response.json();
//             return data;
//           } catch (error) {
//             console.error("Error deleting cart item:", error.message);
//             throw error;
//           }
//         };
          
      

//   return (
//     <div className="categories-container" >
      
//       {/* Left Content Section */}
//       <div>
//         {cartProducts.map((product, index) => (
//           <Prodboot product={product} key={index} updateQty={updateQty} handleDelete={handleDelete} />
//         ))}
//       </div>

//       {/* Right Content Section */}
//       <div className="sidebar" style={{ width: "40rem", margin: "11px", height: "26rem", textAlign:"left" }}> 
//       <h3>Price Details </h3>
//         <h3>Product Name              Unit Price        Quantity     SubTotal</h3>
//         {cartProducts.map((product, index) => (
//           // <Prodboot product={product} key={index} updateQty={updateQty} handleDelete={handleDelete} />
//           <h5>{product.cart_pname} {product.cart_price} {product.cart_qty} {product.cart_total} </h5> 
//         ))}
      
//         {/* <div className="sidebar-section" > */}
//         <h5>Price({CartItemsCount} items): ₹ {cartSubTotal}  </h5>
//         <h5>Delivery Charges : FREE Delivery  </h5>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         _____________________________________________
//         <h3>Total Amount : ₹ {cartSubTotal}  </h3>
//           {/* ₹ {cartSubTotal}        */}
//         {/* </div> */}
//       </div>

//     </div>
    
//   );
// };

// export default Cart;

// function Prodboot({ product,updateQty,handleDelete }) {
//   const image = `${IMAGE_URL}/${product.cart_pic}`;

//   // // Check if product is in cart
//   // const cartItem = cartProducts.find((item) => item.cart_pid === product.pid);
//   // const isInCart = cartItem && cartItem.cart_qty > 0;

//   return (
//     <div className="d-inline-flex">
//       <Card
//         className="shadow p-3 m-2 bg-body rounded"
//         style={{ width: "13rem", margin: "11px", height: "26rem" }}
//       >
//         {product.cart_pic && (
//           <Card.Img
//             className="p-2"
//             variant="top"
//             src={image}
//             alt={product.cart_pid}
//             style={{ height: "11rem" }}
//           />
//         )}
//         <Card.Body>
//           <Card.Title className="text-primary text-center" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
//             {product.cart_pname}</Card.Title>
//           <Card.Text style={{ padding: "1px", textAlign: "left" }}>
//             {/* <div>{product.car}</div> */}
//             <div style={{ fontWeight: "bold" }}>
//               {/* <h5>{product.cart_pname}</h5> */}
//               <h5>Price : ₹ {product.cart_price}</h5>
//             </div>
//           </Card.Text>
//         </Card.Body>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           className="mb-2"
//         >
//           <div>
//             <p>
//               Qty:
//               <Button onClick={() => updateQty(product.cart_pid,"decrement")} className="m-1">-</Button>{product.cart_qty}
//               <Button onClick={() => updateQty(product.cart_pid,"increment")} className="m-1">
//                 +
//               </Button>
//               <Button style={{width:'80px', height:'40px' , margin:'5px'}}  variant="danger" onClick={() => handleDelete(product.cart_pid)}>Delete</Button>
//             </p>
//           </div>
//           {/* <Button
//             style={{ width: "107.6px", height: "40px", margin: "1px" }}
//             variant="success"
//             onClick={() => handleCart(product.cart_pid, product.cart_price,product.cart_pic)}
//           >
//             Add to Cart
//           </Button> */}
//         </div>
//       </Card>
//     </div>
//   );
// }
//----------------------------------------------------

import React, { useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { API_URL, IMAGE_URL } from "../components/Apiconfiguration/config.js";
// import {  Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Cart.css";

const Cart = () => {
  const { username, isAuthorized ,setload,cartProducts, setCartProducts,cartSubTotal,CartItemsCount} = useContext(AuthContext); // Access context values
  // const [cartProducts, setCartProducts] = useState([]); // List of cart products
  
 
  // function inside Products
  const updateQty = async(id,operation) => {
    let message = ""; // Initialize a message variable
    const updatedProducts = cartProducts.map((item) =>     
      item.cart_pid === id? { ...item, 
      cart_qty: operation === "increment" ? 
      item.cart_qty < 5 ? item.cart_qty + 1 : item.cart_qty
      :
       item.cart_qty > 1 ? item.cart_qty - 1 : item.cart_qty,
       }
       : item
    );
    
    // alert(message)We are sorry! Only 5 units are allowed for each orders
    setCartProducts(updatedProducts);
    const updatedItem = updatedProducts.find((item) => item.cart_pid === id);
    const cartUpdateData = {
      email: username,
      // items: [cartProducts], // Pass the items array, here it's a single item
      items: [{
        cart_pid: updatedItem.cart_pid,
        cart_qty: updatedItem.cart_qty,
        cart_price: updatedItem.cart_price,
        cart_pic: updatedItem.cart_pic,
        cart_pname: updatedItem.cart_pname,
      },
    ],
    };
    try{
    const response = await fetch(`${API_URL}/cart/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartUpdateData),
    });
    // const data = await response.json();
    if (response.ok) {
      const data = await response.json();
      // setCartProducts(data.updated_items || []);
      setload(true)
      console.log("Cart updated successfully:", data);
    } else {
      console.error("Failed to update cart");
    }
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};
 
  // Fetch cart data when the component mounts
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     if (username && isAuthorized) {
  //       const response = await fetch(`${API_URL}/cart/${username}`);
  //       const data = await response.json();
  //       // setCartProducts(data.updated_items || []);
  //     }
  //   };
  //   fetchCartData();
  // }, [username, isAuthorized]);

  

   // Delete product function
       const handleDelete = async (pid) => {
          // const pidExists = await checkProductExists(pid);
  
          // if (!pidExists) return;  // Exit if the product does not exist
  
          const confirmDelete = window.confirm(`Are you sure you want to delete this product with ID: ${pid}?`);
          if (!confirmDelete) return;
  
          try {
            const response = await fetch(`${API_URL}/cart/${username}?cart_pid=${pid}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.detail || "Failed to delete cart item.");
            }
            setload(true)
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error deleting cart item:", error.message);
            throw error;
          }
        };
          
      
  
  return (
    <div className="categories-container" >
      
      {/* Left Content Section */}
      <div style={{right: "20px"}}>
        <h1>Left</h1>
        {cartProducts.map((product, index) => (
          <Prodboot product={product} key={index} updateQty={updateQty} handleDelete={handleDelete} />
        ))}
      </div>

      {/* Right Content Section */}
      <div className="responsive-div"
  // className="sidebar"
  // style={{
  //   width: "100rem",
  //   margin: "11px",
  //   height: "auto",
  //   textAlign: "left",
  //   padding: "10px",
  //   border: "1px solid #ccc",
  //   borderRadius: "8px",
  //   backgroundColor: "#f9f9f9",
  //   position: "sticky", // Fix the div
  //   top: "100px", // Adjust vertical position as needed
  //   right: "20px", // Align to the right side
  //   zIndex: "1000", // Ensure it stays above other elements
  //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  // }}
>
  <h3>Price Details</h3>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Product Name</th>
        {/* <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Image</th> */}
        <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Unit Price</th>
        <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Quantity</th>
        <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>SubTotal</th>
      </tr>
    </thead>
    <tbody>
      {cartProducts.map((product, index) => (
        
        <tr key={index}>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
            {product.cart_pname}
          </td>
           {/* <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
           <img src={`${IMAGE_URL}/${product.cart_pic}`} alt="Product" style={{ width: "50px", height: "50px" }} />
          </td>  */}
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
            ₹{product.cart_price}
          </td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
            {product.cart_qty}
          </td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
            ₹{product.cart_total}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div style={{ marginTop: "20px" }}>
    <h5>Price ({CartItemsCount} items): ₹ {cartSubTotal}</h5>
    <h5>Delivery Charges: FREE Delivery</h5>
    <hr style={{ margin: "20px 0", border: "1px solid #ddd" }} />
    <h3>Total Amount: ₹ {cartSubTotal}</h3>
  </div>
</div>


    </div>
    
  );
};

export default Cart;
// function prodtable({ product,updateQty,handleDelete }) {
//   return (
//     <div>Cart</div>
//   )
// }
function Prodboot({ product,updateQty,handleDelete }) {
  const image = `${IMAGE_URL}/${product.cart_pic}`;

  // // Check if product is in cart
  // const cartItem = cartProducts.find((item) => item.cart_pid === product.pid);
  // const isInCart = cartItem && cartItem.cart_qty > 0;

  return (
    <div className="d-inline-flex">
      <Card
        className="shadow p-3 m-2 bg-body rounded"
        style={{ width: "13rem", margin: "11px", height: "26rem" }}
      >
        {product.cart_pic && (
          <Card.Img
            className="p-2"
            variant="top"
            src={image}
            alt={product.cart_pid}
            style={{ height: "11rem" }}
          />
        )}
        <Card.Body>
          <Card.Title className="text-primary text-center" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {product.cart_pname}</Card.Title>
          <Card.Text style={{ padding: "1px", textAlign: "left" }}>
            {/* <div>{product.car}</div> */}
            <div style={{ fontWeight: "bold" }}>
              {/* <h5>{product.cart_pname}</h5> */}
              <h5>Price : ₹ {product.cart_price}</h5>
            </div>
          </Card.Text>
        </Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mb-2"
        >
          <div>
            <p>
              Qty:
              <Button onClick={() => updateQty(product.cart_pid,"decrement")} className="m-1">-</Button>{product.cart_qty}
              <Button onClick={() => updateQty(product.cart_pid,"increment")} className="m-1">
                +
              </Button>
              <Button style={{width:'80px', height:'40px' , margin:'5px'}}  variant="danger" onClick={() => handleDelete(product.cart_pid)}>Delete</Button>
            </p>
          </div>
          {/* <Button
            style={{ width: "107.6px", height: "40px", margin: "1px" }}
            variant="success"
            onClick={() => handleCart(product.cart_pid, product.cart_price,product.cart_pic)}
          >
            Add to Cart
          </Button> */}
        </div>
      </Card>
    </div>
  );
}




