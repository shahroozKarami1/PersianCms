import Home from "./../pages/home/Home"
import Comments from "./../pages/comments/Comments"
import Products from "./../pages/products/Products"
import Users from "./../pages/users/Users"
import  DisCounts  from  "./../pages/discounts/DisCounts"
import  Orders  from  "./../pages/orders/Orders"
let Routes = [

    { path: "/", element: <Home></Home> },
    { path: "/comments", element: <Comments></Comments> },
    { path: "/products", element: <Products></Products> },
    { path: "/Users", element: <Users></Users> },
    { path: "/orders", element: <Orders></Orders> },
    { path: "/disCounts", element: <DisCounts></DisCounts> },


]

export  default  Routes