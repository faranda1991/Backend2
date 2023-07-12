const fs = require('fs');
const ProductManager = require('./index.js');

class EnhancedProductManager extends ProductManager {
    constructor(path) {
        super();
        this.path = path;
    }

    loadData() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.constructor.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            this.products = [];
            this.constructor.id = 0;
        }
    }

    saveData() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    addProduct(title, description, price, thumbmail, code, stock) {
        this.loadData();
        super.addProduct(title, description, price, thumbmail, code, stock);
        this.saveData();
    }

    getProduct() {
        this.loadData();
        return super.getProduct();
    }

    getProductById(id) {
        this.loadData();
        const product = super.getProductById(id);
        if (product === 'Not Found') {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, updatedProduct) {
        this.loadData();
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products[index] = { id, ...updatedProduct };
        this.saveData();
    }

    deleteProduct(id) {
        this.loadData();
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products.splice(index, 1);
        this.saveData();
    }
}

module.exports = EnhancedProductManager;
