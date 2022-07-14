import axios from "axios"

export default class ProductsService {


  async findAllProducts() {
    try {
      const res = await axios.get('http://localhost:3000/produtos');
      return res;
      //this.produtos = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async addNewProduct(produto){
    try{
      const res = await axios.post('http://localhost:3000/produtos',produto);
      return res;
    }catch(error){
      console.log(error);
    }
  }
  async removeProduct(id){
    try{
      const res = axios.delete(`http://localhost:3000/produtos/${id}`);
      return res;
    }catch(error){
      console.log(error);
    }
  }
  async updateProduct(id,produto){
    try{
      const res = axios.put(`http://localhost:3000/produtos/${id}`,produto);
      return res;
    }catch(error){
      console.log(error);
    }
  }
  
}