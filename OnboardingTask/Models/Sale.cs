//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace OnboardingTask.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sale
    {
        public int SaleId { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public string StoreName { get; set; }
        public System.DateTime DateSold { get; set; }
        public bool IsActive { get; set; }
    }
}
