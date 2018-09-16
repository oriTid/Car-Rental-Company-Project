using System.Web.Http;
using WebApplication2.Filters;

namespace _04_UIL
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.Filters.Add(new BasicAuthFilter());
            GlobalConfiguration.Configuration.Filters.Add(new AuthorizeAttribute());
        }
    }
}
