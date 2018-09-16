//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace _01_DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Car
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Car()
        {
            this.Orders = new HashSet<Order>();
        }
    
        public int CarID { get; set; }
        public int CarTypeID { get; set; }
        public string LicenseNumber { get; set; }
        public int CurrentKilometers { get; set; }
        public bool IsOperative { get; set; }
        public int BranchLocation { get; set; }
        public string CarPic { get; set; }
        public bool IsDeleted { get; set; }
    
        public virtual Branch Branch { get; set; }
        public virtual CarType CarType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
