import { ICategories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import refactorService from "../refactor.service";

class CategoriesService {
  // Get All Categories
  getAllCategories = refactorService.getAll<ICategories>(categoriesSchema);

  // Create a new Category
  createCategory = refactorService.createOne<ICategories>(categoriesSchema);

  // Get One Category
  getOneCategory = refactorService.getOne<ICategories>(categoriesSchema);

  // Update Category
  updateCategory = refactorService.updateOne<ICategories>(categoriesSchema);

  // Delete Category
  deleteCategory = refactorService.deleteOne<ICategories>(categoriesSchema);
}

const categoriesService = new CategoriesService();
export default categoriesService;
