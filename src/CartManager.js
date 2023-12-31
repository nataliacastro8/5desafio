import fs from "fs";

class CartManager {
  constructor() {
    this.carts = []; 
    this.path= "Carrito.json";
    this.createFile();
  }

  createFile(){
    if(!fs.existsSync(this.path)){
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    }
  }

  newCart(){
    const cart = ({id:this.generateId(), products: []});
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    this.carts.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(this.carts));
    console.log("Cart creado");

    return true;
  }

  addCart(product) {
    if (this.validateCode(product.code)) {
      console.log("El code del producto ya existe");

      return false;
    } else {
      const producto = {id:this.generateId(), title:product.title, description:product.description, code:product.code, price:product.price, status:product.status, stock:product.stock, category:product.category, thumbnail:product.thumbnail };
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      this.products.push(producto);
      fs.writeFileSync(this.path, JSON.stringify(this.carts));
      console.log("Producto agregado!")

      return true;
    }
  }

  getCart(id) {    
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    return this.carts.find(item => item.id === id);
  }

  getCarts() {    
    let carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    return carts;
  }

  generateId() {
    let max = 0;
    let carts = this.getCarts();

    carts.forEach(item => {
      if (item.id > max){
        max = item.id;
      }

    });

    return max+1;
  }

  addProductToCart(cid, pid) {
    this.carts = this.getCarts();
    const cart = this.carts.find (item => item.id === cid) ;
    let product = cart.products.find (item => item.product === pid) ;

    if (product) {
      product.quantity += 1; 
    } else{
      cart.products.push({product:pid, quantity:1});
    }

    fs.writeFileSync(this.path, JSON.stringify(this.carts));
    console.log("Producto agregado");

    return true;
  }
}



export default CartManager;

