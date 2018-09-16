using _01_DAL;
using _02_BOL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _03_BLL
{
    public static class UserManager
    {
        /// getAlUsers reads all the Cars from the DB by the EF ref
        /// and maps the DAL objects to BOL objects
        public static List<UserModel> GetAllUsers()
        {
            using (CarRentEntitiesModel db = new CarRentEntitiesModel())
            {
                return db.Users.Where(w => !w.IsDeleted).Select(x =>
                    new UserModel()
                    {
                        UserID = x.UserID,
                        UserName = x.UserName,
                        FirstName = x.FirstName,
                        LastName = x.LastName,
                        ID = x.ID,
                        Birthdate = x.Birthdate,
                        Email = x.Email,
                        Password = x.Password,
                        UserPic = x.UserPic,
                        UserPermission = x.UserPermission,
                    }).OrderBy(o=> o.UserName).ToList();
            }

        }
       
        /// getSpecificUser select a specific Car from the DB by the EF ref
        /// by the userID parameter. 
        /// and maps the DAL objects to BOL objects
        public static List<UserModel> GetSpecificUser(int userID)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    return db.Users.Where(w => w.UserID == userID && !w.IsDeleted).Select(uid =>
                    new UserModel
                    {
                        UserID = uid.UserID,
                        UserName = uid.UserName,
                        FirstName = uid.FirstName,
                        LastName = uid.LastName,
                        ID = uid.ID,
                        Birthdate = uid.Birthdate,
                        Email = uid.Email,
                        Password = uid.Password,
                        UserPic = uid.UserPic,
                        UserPermission = uid.UserPermission,
                    }).ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static bool InsertUpdateDeleteUser(UserModel editUser)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    User selectedUser = null;

                    if (editUser.UserID > 0)
                    {
                        selectedUser = db.Users.FirstOrDefault(x => x.UserID == editUser.UserID && !x.IsDeleted);
                        if (selectedUser == null)
                            return false;
                    }
                    else
                        selectedUser = new User();
                    if (!editUser.IsDeleted)
                    {
                        selectedUser.UserName = editUser.UserName;
                        selectedUser.FirstName = editUser.FirstName;
                        selectedUser.LastName = editUser.LastName;
                        selectedUser.ID = editUser.ID;
                        selectedUser.Birthdate = editUser.Birthdate;
                        selectedUser.Email = editUser.Email;
                        selectedUser.Password = editUser.Password;
                        selectedUser.UserPic = editUser.UserPic;
                        selectedUser.UserPermission = editUser.UserPermission;
                    }

                    else selectedUser.IsDeleted = true;

                    if (editUser.UserID == 0)
                        db.Users.Add(selectedUser);

                    db.SaveChanges();
                    return true;

                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        //getuserlogin gets the user+pass and returns a user if found
        public static UserModel GetUserLogin(string name, string password)
        {
            try
            {
                using (CarRentEntitiesModel db = new CarRentEntitiesModel())
                {
                    User dbUser = db.Users.FirstOrDefault(u => u.UserName == name && u.Password == password);
                    if (dbUser != null)
                    {
                        UserModel user = new UserModel
                        {
                            UserName = dbUser.UserName,
                            UserPermission = dbUser.UserPermission,
                            UserID = dbUser.UserID,
                            FirstName = dbUser.FirstName,
                            LastName = dbUser.LastName,
                            ID = dbUser.ID,
                            Birthdate = dbUser.Birthdate,
                            Email = dbUser.Email,
                            Password = dbUser.Password,
                            UserPic = dbUser.UserPic,

                        };
                        return user;
                    }

                }
            }
            catch (Exception) { }
            return null;
        }
    }
}
