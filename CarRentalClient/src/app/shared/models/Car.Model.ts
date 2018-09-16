import { BranchModel } from "./Branch.model";
import { CartypeModel } from "./Cartype.model";

export interface CarModel {

  CarID: number;
  LicenseNumber: string;
  CurrentKilometers: number;
  IsOperative: boolean;
  BranchLocation: BranchModel;
  CarInfo: CartypeModel;
  CarPic: string;
  IsDeleted: boolean;
  
}