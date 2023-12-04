import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./routes/home";
import About from "./routes/about";
import Contact from "./routes/contact";
import Login from "./routes/login";
import ShoppingCart from "./routes/shopping-cart";
import Signup from "./routes/signup";
import Policy from "./routes/policy";
import Collection from "./routes/collection";
import Root from "./routes/root";
import ProductDetail from "./routes/product-detail";
import CartProvider from "./providers/cart-provider";
import Search from "./routes/search";
import Checkout from "./routes/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "shopping-cart", element: <ShoppingCart /> },
      { path: "signup", element: <Signup /> }, // Thêm đường dẫn và component "Signup"
      { path: "policy", element: <Policy /> },
      { path: "collection", element: <Collection /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "search", element: <Search /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
