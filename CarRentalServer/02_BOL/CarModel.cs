using System.ComponentModel.DataAnnotations;


namespace _02_BOL
{
    public class CarModel
    {

        public int CarID { get; set; }

        //public int CarTypeID { get; set; } //its not needed. I have Carinfo


        public string LicenseNumber { get; set; }


        public int CurrentKilometers { get; set; }


        public bool IsOperative { get; set; }

        [Required]
        public BranchModel BranchLocation { get; set; }

        [Required]
        public CarTypeModel CarInfo { get; set; }

        public string CarPic { get; set; }

        public bool IsDeleted { get; set; }
    }
}
