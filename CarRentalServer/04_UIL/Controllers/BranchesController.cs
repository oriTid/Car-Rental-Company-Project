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
    public class BranchesController : ApiController
    {
        // GET: api/Branches
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {

            List<BranchModel> branchesList = BranchManager.GetAllBranches();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<BranchModel>>(branchesList, new JsonMediaTypeFormatter())
            };
        }
        //Get: api/CarsBranchs/5
        public HttpResponseMessage Get(int bid) //  will return list of car types that has the branchID = bid
        {
            List<BranchModel> branchesList = BranchManager.GetSpecificBranch(bid);
            if (branchesList != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<List<BranchModel>>(branchesList, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // POST: api/Branches
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Post([FromBody]BranchModel newBranchtoDb)
        {
            bool insertResult = false;

            if (ModelState.IsValid)
            {
                insertResult = BranchManager.InsertUpdateDeleteBranches(newBranchtoDb);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Branches/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Put([FromBody]BranchModel editBranch)
        {
            bool updateResult = false;

            if (ModelState.IsValid)
            {
                updateResult = BranchManager.InsertUpdateDeleteBranches(editBranch);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Branches/5
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(BranchModel deleteBranch)
        {
            bool deleteResult = BranchManager.InsertUpdateDeleteBranches(deleteBranch);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
