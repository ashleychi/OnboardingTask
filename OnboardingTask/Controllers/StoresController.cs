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
    public class StoresController : Controller
    {
        private OnboardingtaskEntities db = new OnboardingtaskEntities();

        public ActionResult Index()
        {
            return View();
        }
        // GET: Store
        public JsonResult GetStore()
        {
            try
            {
                var getStore = db.Stores.Where(x => x.IsActive == true).Select(x => new { x.StoreId, x.StoreName, x.StoreAddress }).ToList();
                return new JsonResult { Data = getStore, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


        //Stores/Create
        public JsonResult CreateStore(Store store)
        {
            try
            {
                store.IsActive = true;
                db.Stores.Add(store);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Create Store Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Store created", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }





        //Update Store
        public JsonResult UpdateStore(Store store)
        {
            try
            {
                Store dbStore = db.Stores.Where(x => x.StoreId == store.StoreId).SingleOrDefault();
                List<Sale> salesList = db.Sales.Where(x => x.StoreName == dbStore.StoreName).ToList();
                if (salesList != null)
                {
                    foreach (var sale in salesList)
                    {
                        sale.StoreName = store.StoreName;
                    }
                }
                dbStore.StoreName = store.StoreName;
                dbStore.StoreAddress = store.StoreAddress;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Store details updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        //GetUpdate Store
        public JsonResult GetUpdateStore(int id)
        {
            try
            {
                Store store = db.Stores.Where(x => x.StoreId == id).SingleOrDefault();
                return new JsonResult { Data = store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Store Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


        //GET: Stores/Delete      
        public JsonResult Delete(int id)
        {
            try
            {
                var store = db.Stores.Where(x => x.StoreId == id).SingleOrDefault();
                if (store != null)
                {
                    store.IsActive = false;
                    List<Sale> salesList = db.Sales.Where(x => x.StoreName == store.StoreName).ToList();
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
            return new JsonResult { Data = "Success Store Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


    }
}