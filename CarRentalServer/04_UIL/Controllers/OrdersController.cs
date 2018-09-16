using _02_BOL;
using _03_BLL;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Filters;

namespace _04_UIL.Controllers
{
    [BasicAuthFilter]
    [EnableCors("*", "*", "*")]
    public class OrdersController : ApiController
    {
        // GET: api/Orders
        [Authorize(Roles = "Admin,Worker")]
        public HttpResponseMessage Get()
        {

            List<OrderModel> ordersList = OrderManager.GetAllOrders();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<OrderModel>>(ordersList, new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Orders/5
        [Authorize(Roles = "Admin,Worker,Client")]
        public HttpResponseMessage Get(int oid) //  will return list of orders that has the OrderID = oid
        {
            List<OrderModel> ordersList = OrderManager.GetSpecificOrder(oid);
            if (ordersList != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<List<OrderModel>>(ordersList, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // GET: api/Orders/5
        [Authorize(Roles = "Admin,Worker,Client")]
        public HttpResponseMessage Get(int userId, string passWord) //  will return list of orders that has the OrderID = oid, based on uid+pass
        {
            List<OrderModel> ordersList = OrderManager.GetUserOrders(userId, passWord);
            if (ordersList != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<List<OrderModel>>(ordersList, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }   

        ////// GET: api/Orders
        [Authorize(Roles = "Admin,Worker,Client")]
        public HttpResponseMessage Get(DateTime startDate, DateTime endDate, string LicenseNumber)
        {

            bool isTrue = OrderManager.CheckIfUnavaliabe(startDate, endDate, LicenseNumber);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<bool>(isTrue, new JsonMediaTypeFormatter())
            };
        }



        // POST: api/Orders
        [Authorize(Roles = "Client")]
        public HttpResponseMessage Post([FromBody]OrderModel newOrderDb)
        {
            bool insertResult = false;

                        if (ModelState.IsValid)
            {
                insertResult = OrderManager.InsertUpdateCloseOrder(newOrderDb);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Orders/5
        [Authorize(Roles = "Admin,Worker")]
        public HttpResponseMessage Put([FromBody]OrderModel editOrder)
        {
            bool updateResult = false;
                        
            if (ModelState.IsValid)
            {
                updateResult = OrderManager.InsertUpdateCloseOrder(editOrder);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Orders/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(int oid)
        {
            bool deleteResult = OrderManager.DeleteOrder(oid);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
