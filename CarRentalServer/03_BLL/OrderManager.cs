using _01_DAL;
using _02_BOL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _03_BLL
{
    public static class OrderManager
    {
        /// GetAllOrders reads all the Orders from the DB by the EF ref
        /// and maps the DAL objects to BOL objects

        public static List<OrderModel> GetAllOrders()
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {                    
                    return db.Orders.Select(x =>
                    new OrderModel
                    {
                        OrderID = x.OrderID,
                        OrderDate = x.OrderDate,
                        OrderStart = x.OrderStart,
                        PlannedEnd = x.PlannedEnd,
                        ActualEnd = x.ActualEnd,
                        OrigianlCost = x.OrigianlCost,
                        ActualCost = x.ActualCost,
                        IsActiveOrder = x.IsActiveOrder,


                        Car = new CarModel()
                        {
                            LicenseNumber = x.Car.LicenseNumber,
                            CurrentKilometers = x.Car.CurrentKilometers,
                            IsOperative = x.Car.IsOperative,
                            CarPic = x.Car.CarPic,
                            CarID = x.Car.CarID,
                            CarInfo = new CarTypeModel()
                            {
                                CarTypeID = x.Car.CarTypeID,
                                Manufacturer = x.Car.CarType.Manufacturer,
                                Model = x.Car.CarType.Model,
                                IsAutomatic = x.Car.CarType.IsAutomatic,
                                CarYear = x.Car.CarType.CarYear,
                                DailyRate = x.Car.CarType.DailyRate,
                                LateDailyRate = x.Car.CarType.LateDailyRate
                            },
                            BranchLocation = new BranchModel()
                            {
                                BranchName = x.Car.Branch.BranchName,
                                BranchAddress = x.Car.Branch.BranchAddress,
                                BranchTel = x.Car.Branch.BranchTel,
                                BranchLatitude = x.Car.Branch.BranchLatitude,
                                BarnchLongitude = x.Car.Branch.BarnchLongitude,
                                BranchID = x.Car.Branch.BranchID

                            }

                        },
                        UserID = new UserModel()
                        {
                            UserID = x.User.UserID,
                            FirstName = x.User.FirstName,
                            LastName = x.User.LastName,
                            ID = x.User.ID,
                            UserName = x.User.UserName,
                            Birthdate = x.User.Birthdate,
                            isMale = x.User.isMale,
                            Email = x.User.Email,
                            Password = x.User.Password,
                            UserPic = x.User.UserPic,
                            UserPermission = x.User.UserPermission
                        }
                    }).OrderByDescending(o => o.OrderDate).ToList();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// GetSpecificOrder select a specific Order from the DB by the EF ref
        /// by the orderID parameter. 
        /// and maps the DAL objects to BOL objects
        public static List<OrderModel> GetSpecificOrder(int orderID)
        {
            List<OrderModel> specificOrders = null;

            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    specificOrders = db.Orders.Where(w => w.OrderID == orderID).Select(x =>
                    new OrderModel
                    {
                        OrderID = x.OrderID,
                        OrderDate = x.OrderDate,
                        OrderStart = x.OrderStart,
                        PlannedEnd = x.PlannedEnd,
                        ActualEnd = x.ActualEnd,
                        OrigianlCost = x.OrigianlCost,
                        ActualCost = x.ActualCost,
                        IsActiveOrder = x.IsActiveOrder,

                        Car = new CarModel()
                        {
                            LicenseNumber = x.Car.LicenseNumber,
                            CurrentKilometers = x.Car.CurrentKilometers,
                            IsOperative = x.Car.IsOperative,
                            CarPic = x.Car.CarPic,
                            CarID = x.Car.CarID,
                            CarInfo = new CarTypeModel()
                            {
                                CarTypeID = x.Car.CarTypeID,
                                Manufacturer = x.Car.CarType.Manufacturer,
                                Model = x.Car.CarType.Model,
                                IsAutomatic = x.Car.CarType.IsAutomatic,
                                CarYear = x.Car.CarType.CarYear,
                                DailyRate = x.Car.CarType.DailyRate,
                                LateDailyRate = x.Car.CarType.LateDailyRate
                            },
                            BranchLocation = new BranchModel()
                            {
                                BranchName = x.Car.Branch.BranchName,
                                BranchAddress = x.Car.Branch.BranchAddress,
                                BranchTel = x.Car.Branch.BranchTel,
                                BranchLatitude = x.Car.Branch.BranchLatitude,
                                BarnchLongitude = x.Car.Branch.BarnchLongitude,
                                BranchID = x.Car.Branch.BranchID

                            }
                        },
                        UserID = new UserModel()
                        {
                            UserID = x.User.UserID,
                            FirstName = x.User.FirstName,
                            LastName = x.User.LastName,
                            ID = x.User.ID,
                            UserName = x.User.UserName,
                            Birthdate = x.User.Birthdate,
                            isMale = x.User.isMale,
                            Email = x.User.Email,
                            Password = x.User.Password,
                            UserPic = x.User.UserPic,
                            UserPermission = x.User.UserPermission

                        }
                    }).ToList();

                }
            }
            catch
            {
            }

            return specificOrders;

        }

        /// GetUserOrders select a specific Orders based on users id       
        /// and maps the DAL objects to BOL objects
        public static List<OrderModel> GetUserOrders(int userId, string password)
        {
            List<OrderModel> userOrders = null;

            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())

                    userOrders = db.Orders.Where(w => w.UserID == userId).Select(x =>
                        new OrderModel
                        {
                            OrderID = x.OrderID,
                            OrderDate = x.OrderDate,
                            OrderStart = x.OrderStart,
                            PlannedEnd = x.PlannedEnd,
                            ActualEnd = x.ActualEnd,
                            OrigianlCost = x.OrigianlCost,
                            ActualCost = x.ActualCost,
                            IsActiveOrder = x.IsActiveOrder,

                            Car = new CarModel()
                            {
                                LicenseNumber = x.Car.LicenseNumber,
                                CurrentKilometers = x.Car.CurrentKilometers,
                                IsOperative = x.Car.IsOperative,
                                CarPic = x.Car.CarPic,
                                CarID = x.Car.CarID,
                                CarInfo = new CarTypeModel()
                                {
                                    CarTypeID = x.Car.CarTypeID,
                                    Manufacturer = x.Car.CarType.Manufacturer,
                                    Model = x.Car.CarType.Model,
                                    IsAutomatic = x.Car.CarType.IsAutomatic,
                                    CarYear = x.Car.CarType.CarYear,
                                    DailyRate = x.Car.CarType.DailyRate,
                                    LateDailyRate = x.Car.CarType.LateDailyRate
                                },
                                BranchLocation = new BranchModel()
                                {
                                    BranchName = x.Car.Branch.BranchName,
                                    BranchAddress = x.Car.Branch.BranchAddress,
                                    BranchTel = x.Car.Branch.BranchTel,
                                    BranchLatitude = x.Car.Branch.BranchLatitude,
                                    BarnchLongitude = x.Car.Branch.BarnchLongitude,
                                    BranchID = x.Car.Branch.BranchID

                                }
                            },
                            UserID = new UserModel()
                            {
                                UserID = x.User.UserID,
                                FirstName = x.User.FirstName,
                                LastName = x.User.LastName,
                                ID = x.User.ID,
                                UserName = x.User.UserName,
                                Birthdate = x.User.Birthdate,
                                isMale = x.User.isMale,
                                Email = x.User.Email,
                                Password = x.User.Password,
                                UserPic = x.User.UserPic,
                                UserPermission = x.User.UserPermission

                            }
                        }).OrderByDescending(o => o.OrderID).ToList();
            }
            catch (Exception) { }
            return userOrders;
        }

        public static bool InsertUpdateCloseOrder(OrderModel editOrder)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    Order selectedOrder = null;

                    if (editOrder.OrderID > 0)
                    {
                        selectedOrder = db.Orders.FirstOrDefault(x => x.OrderID == editOrder.OrderID /*&& !x.IsActiveOrder*/);
                        if (selectedOrder == null)
                            return false;
                    }
                    else
                        selectedOrder = new Order();

                    {
                        selectedOrder.OrderDate = editOrder.OrderDate;
                        selectedOrder.OrderStart = editOrder.OrderStart;
                        selectedOrder.PlannedEnd = editOrder.PlannedEnd;
                        selectedOrder.ActualEnd = editOrder.ActualEnd;
                        selectedOrder.OrigianlCost = editOrder.OrigianlCost;
                        selectedOrder.ActualCost = editOrder.ActualCost;
                        selectedOrder.UserID = editOrder.UserID.UserID;
                        selectedOrder.LicenseNumber = editOrder.Car.LicenseNumber;
                        selectedOrder.IsActiveOrder = editOrder.IsActiveOrder;

                    }


                    if (editOrder.OrderID == 0)
                        db.Orders.Add(selectedOrder);

                    db.SaveChanges();
                    return true;

                }


            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static bool DeleteOrder(int orderID)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    Order selectedOrder = null;

                    if (orderID > 0)
                    {
                        selectedOrder = db.Orders.FirstOrDefault(x => x.OrderID == orderID);
                        if (selectedOrder == null)
                            return false;
                    }


                    db.Orders.Remove(selectedOrder);
                    db.SaveChanges();
                    return true;
                }

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static bool CheckIfUnavaliabe(DateTime start, DateTime end, string licenseNumber) //will return true if car is unavaliable on selected times.
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {

                    return
                   db.Orders.Where(w => w.IsActiveOrder).Where(w => w.LicenseNumber == licenseNumber && (
                    (w.PlannedEnd <= end && w.PlannedEnd >= start) ||
                        (w.OrderStart <= end && w.OrderStart >= start) ||
                            (w.PlannedEnd >= end && w.OrderStart <= start))).ToList().Count() > 0;


                }
            }

            catch (Exception ex)
            {
                return false;
            }

            //if (thisCarOrdersList.Count() > 0) res = true;

            //return res;

        }
    }
}
