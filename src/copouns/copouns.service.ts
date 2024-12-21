import refactorService from "../refactor.service";
import { ICopouns } from "./copouns.interface";
import copounsSchema from "./copouns.schema";

class CopounsService {
  getAll = refactorService.getAll<ICopouns>(copounsSchema);
  createOne = refactorService.createOne<ICopouns>(copounsSchema);
  getOne = refactorService.getOne<ICopouns>(copounsSchema);
  updateOne = refactorService.updateOne<ICopouns>(copounsSchema);
  deleteOne = refactorService.deleteOne<ICopouns>(copounsSchema);
}

const copounsService = new CopounsService();
export default copounsService;
