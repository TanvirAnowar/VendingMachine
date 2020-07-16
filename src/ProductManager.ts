import { ExceptionCode } from './Common/ExceptionCode';
import Product from "./Models/Product";

// This class is responsible for managing product information
export default class ProductManager {

    private ProductInfoArray: Array<Product>;
    public constructor(productInfoArray: Array<Product>)
    {
        this.ProductInfoArray = productInfoArray;
    }

    // Return all products
    public GetProducts():Array<Product>{
        return this.ProductInfoArray;
    }

    // Check whether the given item is available or not
    public IsProductAvailable(name:string):boolean{
        let productInfo = this.GetProductInfoByName(name);

        if(productInfo.ProductInStock < 1)
        {
            return false;
        }

        return true;
    }

    // Get the product information by name
    public GetProductInfoByName(name:string):Product{
        let product = this.ProductInfoArray.find(i=>i.ProductName == name);
        if(product == null)
        {
            throw new Error(ExceptionCode.INVALID_PRODUCT_NAME);
        }

        return product as Product;
    }

    // Update the product stock information and return true for successful update 
    public UpdateProductStock(name:string):boolean{

        if (!this.IsProductAvailable(name)) {
          return false;
        }

        let productIndex = this.ProductInfoArray.findIndex(i => i.ProductName == name);

        this.ProductInfoArray[productIndex].ProductInStock -= 1;

        return true;
    }
}