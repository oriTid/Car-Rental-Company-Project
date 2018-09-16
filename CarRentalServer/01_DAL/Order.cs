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
    
    public partial class Order
    {
        public int OrderID { get; set; }
        public System.DateTime OrderDate { get; set; }
        public string LicenseNumber { get; set; }
        public int UserID { get; set; }
        public System.DateTime OrderStart { get; set; }
        public System.DateTime PlannedEnd { get; set; }
        public Nullable<System.DateTime> ActualEnd { get; set; }
        public decimal OrigianlCost { get; set; }
        public Nullable<decimal> ActualCost { get; set; }
        public bool IsActiveOrder { get; set; }
    
        public virtual Car Car { get; set; }
        public virtual User User { get; set; }
    }
}
