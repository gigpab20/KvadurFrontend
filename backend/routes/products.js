"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mock_products_json_1 = __importDefault(require("../mockdata/mock_products.json"));
var router = (0, express_1.Router)();
router.get('/', (req, res) => {
    console.log(mock_products_json_1.default);
    res.json(mock_products_json_1.default);
});
router.get("/filter/:mode/", (req, res) => {
    let mode = req.params.mode;
    let value = req.query.value;
    let filteredProducts = [...mock_products_json_1.default.products];
    console.log(value + " + " + value);
    if (mode === "color") {
        filteredProducts = filteredProducts.filter(product => product.color.toLowerCase() === (value === null || value === void 0 ? void 0 : value.toString().toLowerCase()));
        console.log(filteredProducts);
    }
    else if (mode === "size") {
        filteredProducts = filteredProducts.filter(product => product.sizes.some(size => size.size.toLowerCase() === (value === null || value === void 0 ? void 0 : value.toString().toLowerCase())));
    }
    else if (mode === "price-range") {
        const [min, max] = value.split("-").map(Number);
        if (!isNaN(min) && !isNaN(max)) {
            filteredProducts = filteredProducts.filter(product => {
                const price = parseFloat(product.price);
                return price >= min && price <= max;
            });
        }
        else {
            return res.status(400).json({ error: "Invalid price range format. Use 'min-max' format." });
        }
    }
    else if (mode === "fabric") {
        filteredProducts = filteredProducts.filter(product => product.fabric.toLowerCase() === (value === null || value === void 0 ? void 0 : value.toString().toLowerCase()));
    }
    else {
        return res.status(400).json({ error: "Invalid filter mode" });
    }
    res.json(filteredProducts);
});
module.exports = router;
