using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_BOL
{
    public class CarTypeModel
    {
        
        public int CarTypeID { get; set; }

        
        public string Manufacturer { get; set; }

        
        public string Model { get; set; }

        
        public int CarYear { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Only positive number allowed")]
        public decimal DailyRate { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Only positive number allowed")]
        public decimal LateDailyRate { get; set; }

        
        public bool IsAutomatic { get; set; }

        public bool IsDeleted { get; set; }

        public string FullName { get { return Manufacturer + " " + Model; } } //this parameter is not part of the db, but will be used in the client to get the cartype full name (better for the user to use it than cartype Id)
    }
}
