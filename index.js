class ProductManager{
    constructor(){
        this.products=[]
    }

    static id=0

    addProduct(title, description, price, thumbmail, code, stock){
        ProductManager.id++
        this.products.push({title, description, price, thumbmail, code, stock, id:ProductManager.id});
    }

    getProduct(){
        return this.products
    }

    getProductById(id){
        if(!this.products.find((product)=> product.id === id)){
            return 'Not Found'
        }else{
            return this.products.find((product)=> product.id === id)
        }
    }
}

const productos = new ProductManager();

console.log(productos.getProduct());

productos.addProduct('notebook', 'para trabajar', 350000, 'imagenNotebook.jpg', 'sku839234', 15)
productos.addProduct('impresora', 'para imprimir documentos', 130000, 'imagenImpresora.jpg', 'sku38302', 25)

console.log(productos.getProduct());

console.log(productos.getProductById(2));

console.log(productos.getProductById(3));
