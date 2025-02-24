import {Router, Response, Request} from "express";
import productsData from "../mockdata/mock_products.json";

interface Review {
  starAmount: number;
  title: string;
  text: string;
}

interface Size {
  size: string;
  stock: number;
}

interface Product {
  title: string;
  color: string;
  img: string;
  desc: string[];
  guidance: string;
  sizes: Size[];
  price: string;
  currency: string;
  reviews: Review[];
  fabric: string;
}

var router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log(productsData);
  res.json(productsData);
});


router.get("/filter/:mode/", (req: Request, res: Response) => {
  let mode = req.params.mode;
  let value = req.query.value;
  let filteredProducts: Product[] = [...productsData.products];
  console.log(value + " + " + value);

  if (mode === "color") {
    filteredProducts = filteredProducts.filter(product =>
        product.color.toLowerCase() === value?.toString().toLowerCase()
    );
    console.log(filteredProducts);
  } else if (mode === "size") {
    filteredProducts = filteredProducts.filter(product =>
        product.sizes.some(size => size.size.toLowerCase() === value?.toString().toLowerCase())
    );
  } else if (mode === "price-range") {
    const [min, max] = (value as string).split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filteredProducts = filteredProducts.filter(product => {
        const price = parseFloat(product.price);
        return price >= min && price <= max;
      });
    } else {
      return res.status(400).json({ error: "Invalid price range format. Use 'min-max' format." });
    }
  } else if (mode === "fabric") {
    filteredProducts = filteredProducts.filter(product =>
        product.fabric.toLowerCase() === value?.toString().toLowerCase()
    );
  } else {
    return res.status(400).json({ error: "Invalid filter mode" });
  }

  res.json(filteredProducts);
});

module.exports = router;