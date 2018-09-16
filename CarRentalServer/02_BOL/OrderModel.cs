using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_BOL
{
    public class OrderModel
    {

        public int OrderID { get; set; }

        [Required]
        public System.DateTime OrderDate { get; set; }

        [Required]
        public CarModel Car { get; set; }

        [Required]
        public UserModel UserID { get; set; }

        [Required]
        public System.DateTime OrderStart { get; set; }

        [Required]
        public System.DateTime PlannedEnd { get; set; }


        public System.DateTime? ActualEnd { get; set; } //because in Db can be null

        [Required]
        public decimal OrigianlCost { get; set; }


        public decimal? ActualCost { get; set; }//because in Db can be null
        public bool IsActiveOrder { get; set; }




    }
}
