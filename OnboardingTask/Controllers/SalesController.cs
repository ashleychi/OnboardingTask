using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using OnboardingTask.Models;

namespace OnboardingTask.Controllers
{
    public class SalesController : Controller
    {
        private OnboardingtaskEntities db = new OnboardingtaskEntities();

        public ActionResult Index()
        {
            return View();
        }

        // GET: Sales

        public JsonResult GetSale()
        {
            try
            {
                var getSale = db.Sales.Where(x => x.IsActive == true).Select(x => new {
                     x.SaleId, x.CustomerName, x.ProductName, x.StoreName, x.DateSold }).ToList();
                return new JsonResult { Data = getSale, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)

            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


        //public ActionResult Index()
        //{
        //    var sales = db.Sales.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store);
        //    return View(sales.Where(x => x.IsActive == true).ToList());
        //}

        public JsonResult GetCustomer()
        {
            try
            {
                var Customerdata = db.Customers.Where(x => x.IsActive == true).Select(x => new { x.CustomerId,  x.CustomerName }).ToList();

                return new JsonResult { Data = Customerdata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetProduct()
        {
            try
            {
                var ProductsData = db.Products.Where(x => x.IsActive == true).Select(x => new { x.ProductId, x.ProductName }).ToList();

                return new JsonResult { Data = ProductsData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetStore()
        {
            try
            {
                var StoresData = db.Stores.Where(x => x.IsActive == true).Select(x => new { x.StoreId, x.StoreName }).ToList();

                return new JsonResult { Data = StoresData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


        // GET: Sales/Create
        public JsonResult CreateSale(Sale sale)
        {
            try
            {
                sale.IsActive = true;
                db.Sales.Add(sale);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Sale Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        // DELETE Sale
        public JsonResult Delete(int id)
        {
            try
            {
                var sale = db.Sales.Where(x => x.SaleId  == id).SingleOrDefault();
                if (sale != null)
                {
                    sale.IsActive = false;
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Deletion Falied", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // UPDATE Sale
        public JsonResult GetUpdateSale(int id)
        {
            try
            {
                Sale sale = db.Sales.Where(s => s.SaleId == id).SingleOrDefault();
                
                return new JsonResult { Data = sale, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Sale Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateSale(Sale sale)
        {
            try
            {
                Sale sa = db.Sales.Where(s => s.SaleId == sale.SaleId).SingleOrDefault();
                sa.CustomerName = sale.CustomerName;
                sa.ProductName= sale.ProductName;
                sa.StoreName = sale.StoreName;
                sa.DateSold = sale.DateSold;

                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Sale Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
