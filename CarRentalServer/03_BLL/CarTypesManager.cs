using _01_DAL;
using _02_BOL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _03_BLL
{
    public static class CarTypesManager
    {
        public static List<CarTypeModel> GetAllCarsTypes(string showDeleted = "")
        {
            List<CarTypeModel> ctm = null;

            using (CarRentEntitiesModel db = new CarRentEntitiesModel())
            {
                List<CarType> ct = null;
                if (showDeleted == "")
                {
                    ct = db.CarTypes.Where(w => !w.IsDeleted).ToList();
                }
                else
                {
                    ct = db.CarTypes.Where(w => !w.IsDeleted &&
                                                db.Cars.Count(c => c.CarTypeID == w.CarTypeID &&
                                                                  !c.IsDeleted) > 0).ToList();
                }


                ctm = ct.Select(x =>
                   new CarTypeModel()
                   {
                       CarTypeID = x.CarTypeID,
                       Manufacturer = x.Manufacturer,
                       Model = x.Model,
                       CarYear = x.CarYear,
                       DailyRate = x.DailyRate,
                       LateDailyRate = x.LateDailyRate,
                       IsAutomatic = x.IsAutomatic
                   }).ToList();
            }

            return ctm;

        }

        public static List<CarTypeModel> GetSpecificCarType(int crtyid)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    return db.CarTypes.Where(w => w.CarTypeID == crtyid && !w.IsDeleted).Select(ctid =>
                     new CarTypeModel
                     {
                         CarTypeID = ctid.CarTypeID,
                         Manufacturer = ctid.Manufacturer,
                         Model = ctid.Model,
                         CarYear = ctid.CarYear,
                         DailyRate = ctid.DailyRate,
                         LateDailyRate = ctid.LateDailyRate,
                         IsAutomatic = ctid.IsAutomatic,
                         IsDeleted = ctid.IsDeleted

                     }).ToList();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool InsertUpdateDeleteCarType(CarTypeModel editCarType)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    CarType selectedCarType = null;

                    if (editCarType.CarTypeID > 0)
                    {
                        selectedCarType = db.CarTypes.FirstOrDefault(x => x.CarTypeID == editCarType.CarTypeID && !x.IsDeleted);
                        if (selectedCarType == null)
                            return false;
                    }
                    else
                        selectedCarType = new CarType();

                    selectedCarType.Manufacturer = editCarType.Manufacturer;
                    selectedCarType.Model = editCarType.Model;
                    selectedCarType.CarYear = editCarType.CarYear;
                    selectedCarType.DailyRate = editCarType.DailyRate;
                    selectedCarType.LateDailyRate = editCarType.LateDailyRate;
                    selectedCarType.IsAutomatic = editCarType.IsAutomatic;



                    if (editCarType.IsDeleted)
                        selectedCarType.IsDeleted = true;

                    if (editCarType.CarTypeID == 0)
                        db.CarTypes.Add(selectedCarType);

                    db.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
