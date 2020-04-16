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
    public class CustomersController : Controller
    {
        private OnboardingtaskEntities db = new OnboardingtaskEntities();
       
        public ActionResult Index()
        {
            return View();
        }
        // GET: Customer
        public JsonResult GetCustomer()
        {
            try
            {
                var getCustomer = db.Customers.Where(x => x.IsActive == true).Select(x => new { x.CustomerId, x.CustomerName, x.CustomerAddress }).ToList();
                return new JsonResult { Data = getCustomer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


        //Customers/Create
        public JsonResult CreateCustomer(Customer customer)
        {
            try
            {
                customer.IsActive = true;
                db.Customers.Add(customer);            
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Create Customer Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Customer created", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


      


        //Update Customer
        public JsonResult UpdateCustomer(Customer customer)
        {
            try
            {
                Customer dbCustomer = db.Customers.Where(x => x.CustomerId == customer.CustomerId).SingleOrDefault();
                List<Sale> salesList = db.Sales.Where(x => x.CustomerName == dbCustomer.CustomerName).ToList();
                if (salesList != null)
                {
                    foreach (var sale in salesList)
                    {
                        sale.CustomerName = customer.CustomerName;
                    }
                }

                dbCustomer.CustomerName = customer.CustomerName;
                dbCustomer.CustomerAddress = customer.CustomerAddress;

                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Customer details updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        //GetUpdate Customer
        public JsonResult GetUpdateCustomer(int id)
        {
            try
            {
                Customer customer = db.Customers.Where(x => x.CustomerId == id).SingleOrDefault();
                return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Customer Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


        //GET: Customers/Delete      
        public JsonResult Delete(int id)
        {
            try
            {
                var customer = db.Customers.Where(x => x.CustomerId == id).SingleOrDefault();
                if (customer != null)
                {
                    customer.IsActive = false;
                    List<Sale> salesList = db.Sales.Where(x => x.CustomerName == customer.CustomerName).ToList();
                    if (salesList != null)
                    {
                        foreach (var sale in salesList)
                        {
                            sale.IsActive = false;
                        }
                    }
                    
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Deletion Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            return new JsonResult { Data = "Success Customer Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
     
  
    }
}