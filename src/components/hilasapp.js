import Product from './components/product';
import Header from "./components/header";
import Cart from './components/cart';




const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleRangeChange = ([minVal, maxVal]) => {
    console.log(minVal, maxVal);
    console.log(products.filter((p) => p.price >= minVal && p.price <= maxVal));
    setPriceRange([minVal, maxVal]);
  };

  useEffect(() => {
    axios.get("https://quilt-flax-chemistry.glitch.me/products").then((res) => {
      //console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Cart">
        <h2>Cart (total items {totalProductsInCart})</h2>
        {cart.map((p, index) => (
          <Product
            key={p.id}
            id={p.id}
            title={p.title}
            image={p.image}
            cartQuantity={p.cartQuantity}
            quantity={p.quantity}
            price={p.price}
            isCartProduct={true}
            onRemoveCart={() => {
              const prodInd = products.findIndex((pr) => pr.id === p.id);
              const updatedProducts = JSON.parse(JSON.stringify(products));
              let updProd = updatedProducts[prodInd];
              updProd.quantity += p.cartQuantity;
              updatedProducts[prodInd] = updProd;
              setProducts(updatedProducts);

              setTotalProductsInCart(totalProductsInCart - p.cartQuantity);
              setCart(
                cart.filter((productInCart) => p.id !== productInCart.id)
              );
            }}
          />
        ))}
      </div>
      <div className="Products">
        <h2>Products</h2>
        <Slider
          range
          defaultValue={[0, 100]}
          onChange={handleRangeChange}
          tooltipVisible
        >
          price filter
        </Slider>
        {products
          .filter(function (pr) {
            return pr.price >= priceRange[0] && pr.price <= priceRange[1];
          })
          .map((p, index) => (
            <Product
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              cartQuantity={p.cartQuantity}
              quantity={p.quantity}
              price={p.price}
              isCartProduct={false}
              onAdd={(pId) => {
                console.log(p.id);
                setTotalProductsInCart(totalProductsInCart + 1);

                const prodInd = products.findIndex((pr) => pr.id === pId);
                const updatedProducts = JSON.parse(JSON.stringify(products));
                let updProd = updatedProducts[prodInd];
                updProd.quantity -= 1;
                updatedProducts[prodInd] = updProd;
                setProducts(updatedProducts);

                const ind = cart.findIndex((pr) => pr.id === pId);

                if (ind === -1) {
                  let productToAdd = products.find((pr) => pr.id === pId);
                  productToAdd.cartQuantity = 1;
                  setCart([...cart, productToAdd]);
                } else {
                  const updatedCart = JSON.parse(JSON.stringify(cart));
                  let newProd = { ...updatedCart[ind] };
                  newProd.cartQuantity += 1;
                  updatedCart[ind] = newProd;
                  console.log("updatedCart", updatedCart);
                  setCart(updatedCart);
                  console.log("cart = ", cart);
                }
              }}
              onRemove={(pId) => {
                const prodInd = products.findIndex((pr) => pr.id === pId);
                const updatedProducts = JSON.parse(JSON.stringify(products));
                let updProd = updatedProducts[prodInd];
                updProd.quantity += 1;
                updatedProducts[prodInd] = updProd;
                setProducts(updatedProducts);

                const indCart = cart.findIndex((pr) => pr.id === pId);
                if (totalProductsInCart > 0 && indCart !== -1) {
                  setTotalProductsInCart(totalProductsInCart - 1);
                  let updatedCart = [...cart];
                  updatedCart[indCart].cartQuantity -= 1;
                  if (updatedCart[indCart].cartQuantity === 0) {
                    setCart(
                      cart.filter((productInCart) => p.id !== productInCart.id)
                    );
                  }
                }
              }}
            />
          ))}
      </div>
    </div>
  );
};