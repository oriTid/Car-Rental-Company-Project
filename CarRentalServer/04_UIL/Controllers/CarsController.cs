using _02_BOL;
using _03_BLL;
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
    public class CarsController : ApiController
    {
        // GET: api/Cars
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {

            List<CarModel> carsList = CarManager.GetAllCars();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<CarModel>>(carsList, new JsonMediaTypeFormatter())
            };
        }

        //Get: api/Cars/5
        [AllowAnonymous]
        public HttpResponseMessage Get(int cid) //  will return list of cars that has the carID = Cid
        {
            List<CarModel> carsList = CarManager.GetSpecificCar(cid);
            if (carsList != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<List<CarModel>>(carsList, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // POST: api/Cars
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Post([FromBody]CarModel newCartoDb)
        {
            bool insertResult = false;

            //ModelState is the parameter that we got to the Post function (newCartoDb in our case)
            if (ModelState.IsValid)
            {
                insertResult = CarManager.InsertUpdateDeleteCar(newCartoDb);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Cars/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Put([FromBody]CarModel editCar)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (EditCar in our case)
            if (ModelState.IsValid)
            {
                updateResult = CarManager.InsertUpdateDeleteCar(editCar);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Cars/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(CarModel deleteCar)
        {
            bool deleteResult = CarManager.InsertUpdateDeleteCar(deleteCar);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}





















//using _02_BOL;
//using _03_BLL;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Formatting;
//using System.Web.Http;
//using System.Web.Http.Cors;

//namespace _04_UIL.Controllers
//{
//    [EnableCors("*", "*", "*")]
//    public class CarsController : ApiController
//    {
//        // GET: api/Cars
//        public HttpResponseMessage Get()
//        {

//            List<CarModel> carsList = CarManager.GetAllCars();

//            return new HttpResponseMessage(HttpStatusCode.OK)
//            {
//                Content = new ObjectContent<List<CarModel>>(carsList, new JsonMediaTypeFormatter())
//            };
//        }

//        // GET: api/Cars/5
//        public HttpResponseMessage Get(int Cid) //  will return list of cars that has the carID = Cid
//        {
//            List<CarModel> carsList = CarManager.GetSpecificCar(Cid);
//            if (carsList != null)
//                return new HttpResponseMessage(HttpStatusCode.OK)
//                {
//                    Content = new ObjectContent<List<CarModel>>(carsList, new JsonMediaTypeFormatter())
//                };

//            return new HttpResponseMessage(HttpStatusCode.BadRequest);
//        }

//        // POST: api/Cars
//        public HttpResponseMessage Post([FromBody]CarModel newCartoDb, bool isDeleted)
//        {
//            bool insertResult = false;

//            //ModelState is the parameter that we got to the Post function (newCartoDb in our case)
//            if (ModelState.IsValid)
//            {
//                insertResult = CarManager.InsertUpdateDeleteCar(newCartoDb, isDeleted);
//            }

//            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

//            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
//        }

//        // PUT: api/Cars/5
//        public HttpResponseMessage Put([FromBody]CarModel editCar, bool isDeleted)
//        {
//            bool updateResult = false;

//            //ModelState is the parameter that we got to the Post function (EditCar in our case)
//            if (ModelState.IsValid)
//            {
//                updateResult = CarManager.InsertUpdateDeleteCar(editCar, isDeleted);
//            }

//            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

//            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

//        }

//        // DELETE: api/Cars/5
//        public HttpResponseMessage Delete(CarModel deleteCar, bool isDeleted)
//        {
//            bool deleteResult = CarManager.InsertUpdateDeleteCar(deleteCar, isDeleted);

//            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

//            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
//        }
//    }
//}
