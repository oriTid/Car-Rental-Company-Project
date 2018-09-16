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
    [EnableCors("*", "*", "*")]
    [BasicAuthFilter]
    public class CarsTypesController : ApiController
    {
        // GET: api/CarsTypes
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {

            List<CarTypeModel> CarsTypesList = CarTypesManager.GetAllCarsTypes();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<CarTypeModel>>(CarsTypesList, new JsonMediaTypeFormatter())
            };
        }

        //Get: api/CarsTypes/5
        [AllowAnonymous]
        public HttpResponseMessage Get(int ctid) //  will return list of car types that has the carID = Cid
        {
            List<CarTypeModel> carTypesList = CarTypesManager.GetSpecificCarType(ctid);
            if (carTypesList != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<List<CarTypeModel>>(carTypesList, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // POST: api/CarsTypes
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Post([FromBody]CarTypeModel newCarTypeToDb)
        {
            bool insertResult = false;

            //ModelState is the parameter that we got to the Post function (newCartoDb in our case)
            if (ModelState.IsValid)
            {
                insertResult = CarTypesManager.InsertUpdateDeleteCarType(newCarTypeToDb);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/CarsTypes/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Put([FromBody]CarTypeModel editCarType)
        {
            bool updateResult = false;
                        
            if (ModelState.IsValid)
            {
                updateResult = CarTypesManager.InsertUpdateDeleteCarType(editCarType);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/CarsTypes/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(CarTypeModel deleteCarType)
        {
            bool deleteResult = CarTypesManager.InsertUpdateDeleteCarType(deleteCarType);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}


////Get: api/CarsTypes/5
//[AllowAnonymous]
//public HttpResponseMessage Get(string sdc) //  will return list of car types that has the carID = Cid
//{
//    List<CarTypeModel> carTypesList = CarTypesManager.GetAllCarsTypes(sdc);
//    if (carTypesList != null)
//        return new HttpResponseMessage(HttpStatusCode.OK)
//        {
//            Content = new ObjectContent<List<CarTypeModel>>(carTypesList, new JsonMediaTypeFormatter())
//        };

//    return new HttpResponseMessage(HttpStatusCode.BadRequest);
//}
