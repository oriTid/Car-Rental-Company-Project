using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_BOL
{
    public class UserModel
    {
        
        public int UserID { get; set; }

        
        public string FirstName { get; set; }

        
        public string LastName { get; set; }

        //[MaxLength(9), Validation]
        public string ID { get; set; }

        
        public string UserName { get; set; }

        public Nullable<System.DateTime> Birthdate { get; set; }

        
        public bool isMale { get; set; }

        
        public string Email { get; set; }

        
        public string Password { get; set; }

        public string UserPic { get; set; }

        public int UserPermission { get; set; }

        public bool IsDeleted { get; set; }


    //    public string GetUserPermission()
    //    {
    //        switch (UserPermission)
    //        {
    //            case 0: return "admin";
    //            case 1: return "worker";
    //            case 2: return "user";
    //            default: return "anonymous";
    //        }
    //    }
    }
}
