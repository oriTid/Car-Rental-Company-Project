using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication2.Filters;

namespace _04_UIL.Controllers
{
    public class ImageController : ApiController
    {
        [HttpPost]
        [Route("api/UploadImage")]
        [BasicAuthFilter]
        [AllowAnonymous]
        public HttpResponseMessage UploadImage()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            
            //Get Image caption
            string imageCaption = httpRequest.Form["ImageCaption"];

            //Upload Image
            var postedFile = httpRequest.Files["Image"];

            //Create custom filename (was getting it with GUID, but still if needed cahange)
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            
            imageName = imageCaption;

            var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
            postedFile.SaveAs(filePath);

            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
