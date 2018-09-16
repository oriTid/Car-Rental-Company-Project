using _01_DAL;
using _02_BOL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _03_BLL
{
    public static class CarManager
    {
        /// getAllCars reads all the Cars from the DB by the EF ref
        /// and maps the DAL objects to BOL objects

        public static List<CarModel> GetAllCars()
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    return db.Cars.Where(w => !w.IsDeleted).Select(x =>
                    new CarModel
                    {
                        CarID = x.CarID,
                        LicenseNumber = x.LicenseNumber,
                        CurrentKilometers = x.CurrentKilometers,
                        IsOperative = x.IsOperative,
                        CarPic = x.CarPic,

                        CarInfo = new CarTypeModel()
                        {
                            CarTypeID = x.CarTypeID,
                            Manufacturer = x.CarType.Manufacturer,
                            Model = x.CarType.Model,
                            IsAutomatic = x.CarType.IsAutomatic,
                            CarYear = x.CarType.CarYear,
                            DailyRate = x.CarType.DailyRate,
                            LateDailyRate = x.CarType.LateDailyRate
                        },
                        BranchLocation = new BranchModel()
                        {
                            BranchID = x.Branch.BranchID,
                            BranchName = x.Branch.BranchName,
                            BranchAddress = x.Branch.BranchAddress,
                            BranchTel = x.Branch.BranchTel,
                            BranchLatitude = x.Branch.BranchLatitude,
                            BarnchLongitude = x.Branch.BarnchLongitude,

                        }
                    }).OrderByDescending(o=>o.CarInfo.CarTypeID).ToList(); //send all cars sorted by the cartype

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// getSpecificCar select a specific Car from the DB by the EF ref
        /// by the carID parameter. 
        /// and maps the DAL objects to BOL objects
        public static List<CarModel> GetSpecificCar(int carID)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    return db.Cars.Where(w => w.CarID == carID && !w.IsDeleted).Select(x =>
                     new CarModel
                     {
                         CarID = x.CarID,
                         LicenseNumber = x.LicenseNumber,
                         CurrentKilometers = x.CurrentKilometers,
                         IsOperative = x.IsOperative,
                         CarPic = x.CarPic,
                         IsDeleted = x.IsDeleted,

                         CarInfo = new CarTypeModel()
                         {
                             CarTypeID = x.CarTypeID,
                             Manufacturer = x.CarType.Manufacturer,
                             Model = x.CarType.Model,
                             IsAutomatic = x.CarType.IsAutomatic,
                             CarYear = x.CarType.CarYear,
                             DailyRate = x.CarType.DailyRate,
                             LateDailyRate = x.CarType.LateDailyRate
                         },
                         BranchLocation = new BranchModel()
                         {
                             BranchID = x.Branch.BranchID,
                             BranchName = x.Branch.BranchName,
                             BranchAddress = x.Branch.BranchAddress,
                             BranchTel = x.Branch.BranchTel,
                             BranchLatitude = x.Branch.BranchLatitude,
                             BarnchLongitude = x.Branch.BarnchLongitude,
                         }
                     }).ToList();

                }
            }
            catch (Exception)
            {
                return null;
            }


        }

        public static bool InsertUpdateDeleteCar(CarModel editCar)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    Car selectedCar = null;


                    if (editCar.CarID > 0)
                    {
                        selectedCar = db.Cars.FirstOrDefault(x => x.CarID == editCar.CarID && !x.IsDeleted);
                        if (selectedCar == null)
                            return false;
                    }
                    else
                        selectedCar = new Car();

                    if (!editCar.IsDeleted)
                    {
                        selectedCar.LicenseNumber = editCar.LicenseNumber;
                        selectedCar.CurrentKilometers = editCar.CurrentKilometers;
                        selectedCar.IsOperative = editCar.IsOperative;
                        selectedCar.BranchLocation = editCar.BranchLocation.BranchID;
                        selectedCar.CarTypeID = editCar.CarInfo.CarTypeID;
                        selectedCar.CarPic = editCar.CarPic;


                    }
                    else
                        selectedCar.IsDeleted = true;

                    if (editCar.CarID == 0)
                        db.Cars.Add(selectedCar);

                    db.SaveChanges();
                    return true;

                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
