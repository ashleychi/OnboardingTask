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
    public class ProductsController : Controller
    {
        private OnboardingtaskEntities db = new OnboardingtaskEntities();
 
        public ActionResult Index()
        {
            return View();
        }


        // GET: Product
        public JsonResult GetProduct()
        {
            try
            {
                var getProduct = db.Products.Where(x => x.IsActive == true).Select(x => new { x.ProductId, x.ProductName, x.Price }).ToList();
                return new JsonResult { Data = getProduct, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }



        //Products/Create
        public JsonResult CreateProduct(Product product)
        {
            try
            {
                product.IsActive = true;
                db.Products.Add(product);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Create Product Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Product created", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        //Update Product
        public JsonResult UpdateProduct(Product product)
        {
            try
            {
                Product dbProduct = db.Products.Where(x => x.ProductId == product.ProductId).SingleOrDefault();
                List<Sale> salesList = db.Sales.Where(x => x.ProductName == dbProduct.ProductName).ToList();
                if (salesList != null)
                {
                    foreach (var sale in salesList)
                    {
                        sale.ProductName = product.ProductName;
                    }
                }

                dbProduct.ProductName = product.ProductName;
                dbProduct.Price = product.Price;

                db.SaveChanges();
            }
           
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Product details updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        //GetUpdate Product
        public JsonResult GetUpdateProduct(int id)
        {
            try
            {
                Product product = db.Products.Where(x => x.ProductId == id).SingleOrDefault();
                return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Product Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }



        //GET: Products/Delete

        public JsonResult Delete(int id)
        {
            try
            {
                var product = db.Products.Where(x => x.ProductId == id).SingleOrDefault();
                if (product != null)
                {
                    product.IsActive = false;
                    List<Sale> salesList = db.Sales.Where(x => x.ProductName == product.ProductName).ToList();
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
            return new JsonResult { Data = "Success Product Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }      
    }
}


