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
    //[AllowAnonymous]
    public class UsersController : ApiController
    {

        // GET: api/Users

        [BasicAuthFilter]
        [Authorize(Roles = "Admin,Worker")]
        public HttpResponseMessage Get()
        {
            List<UserModel> UsersList = UserManager.GetAllUsers();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<List<UserModel>>(UsersList, new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Users/5
        [BasicAuthFilter]
        [Authorize(Roles = "Admin,Worker,Client")]
        public HttpResponseMessage Get(int uid) //  will return list of users that has the userId = uid
        {
            List<UserModel> UserList = UserManager.GetSpecificUser(uid);
            if (UserList != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<List<UserModel>>(UserList, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        [AllowAnonymous]
        public HttpResponseMessage Get(string userName, string passWord) //  will return specifi user if the user is in the DB and pass is right
        {
            UserModel authUser = UserManager.GetUserLogin(userName, passWord);
            if (authUser != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<UserModel>(authUser, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // POST: api/User
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]UserModel newUserDb)
        {
            bool insertResult = false;

            if (ModelState.IsValid)
            {
                insertResult = UserManager.InsertUpdateDeleteUser(newUserDb);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/User/5
        [BasicAuthFilter]
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Put([FromBody]UserModel editUser)
        {
            bool updateResult = false;

            if (ModelState.IsValid)
            {
                updateResult = UserManager.InsertUpdateDeleteUser(editUser);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/User/5
        [BasicAuthFilter]
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(UserModel deleteUser)
        {
            bool deleteResult = UserManager.InsertUpdateDeleteUser(deleteUser);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
