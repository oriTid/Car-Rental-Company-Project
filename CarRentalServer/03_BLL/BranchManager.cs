using _01_DAL;
using _02_BOL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _03_BLL
{
    public static class BranchManager
    {
        public static List<BranchModel> GetAllBranches()
        {
            using (CarRentEntitiesModel db = new CarRentEntitiesModel())
           {
              return db.Branches.Where(w => !w.IsDeleted).Select(x =>
              new BranchModel
              {
                  BranchID = x.BranchID,
                  BranchName = x.BranchName,
                  BranchAddress = x.BranchAddress,
                  BranchTel = x.BranchTel,
                  BranchLatitude = x.BranchLatitude,
                  BarnchLongitude = x.BarnchLongitude,
              }).ToList();

            }
        }

        public static List<BranchModel> GetSpecificBranch(int sbid)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    return db.Branches.Where(w => w.BranchID == sbid && !w.IsDeleted).Select(bid =>
                     new BranchModel
                     {
                         BranchID = bid.BranchID,
                         BranchName = bid.BranchName,
                         BranchTel = bid.BranchTel,
                         BranchAddress = bid.BranchAddress,
                         BranchLatitude = bid.BranchLatitude,
                         BarnchLongitude = bid.BarnchLongitude,
                         IsDeleted = bid.IsDeleted,

                     }).ToList();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool InsertUpdateDeleteBranches(BranchModel editBranch)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    Branch selecteBranch = null;

                    if (editBranch.BranchID > 0)
                    {
                        selecteBranch = db.Branches.FirstOrDefault(x => x.BranchID == editBranch.BranchID && !x.IsDeleted);
                        if (selecteBranch == null)
                            return false;
                    }
                    else
                        selecteBranch = new Branch();
                    if (!editBranch.IsDeleted)
                    {
                        selecteBranch.BranchName = editBranch.BranchName;
                        selecteBranch.BranchTel = editBranch.BranchTel;
                        selecteBranch.BranchAddress = editBranch.BranchAddress;
                        selecteBranch.BranchLatitude = editBranch.BranchLatitude;
                        selecteBranch.BarnchLongitude = editBranch.BarnchLongitude;

                    }
                    else selecteBranch.IsDeleted = true;                   
                        
                    if (editBranch.BranchID == 0)
                        db.Branches.Add(selecteBranch);

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

