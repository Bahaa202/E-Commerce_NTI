import productsSchema from "./products.schema";
import { IProducts } from "./products.interface";
import refactorService from "../refactor.service";

class ProductsService {
  getAll = refactorService.getAll<IProducts>(productsSchema);
  createOne = refactorService.createOne<IProducts>(productsSchema);
  getOne = refactorService.getOne<IProducts>(productsSchema);
  updateOne = refactorService.updateOne<IProducts>(productsSchema);
  deleteOne = refactorService.deleteOne<IProducts>(productsSchema);
}

const productsService = new ProductsService();
export default productsService;
