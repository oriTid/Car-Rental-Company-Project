
# Car Rental Company Project

## Data Base
**Technologies, Infrastructure and providers for this project**
* MS SQL Server
* C# (Server Side) with WebAPI
* Angular (Client Side)
* Bootstrap 3, 4
* Custom Pipes
* Interceptor
* Angular material

## Server side
* The server is build according to the N-tier model.

***
## DB
** DB  Diagram**
Attached a DB diagram 
**More info can be found in XXX.doc** 
 ![Screenshot]( DB-Diagram.PNG)
***
### DAL
* The DAL holds the DB Entity framework.

### BOL
**The BOL Contains six classes:** 
1. BranchModel.
2. CarTypeModel.
3. CarModel.
4. UserModel.
5. OrderModel.
6. IdValidations.

### BLL
Contains C.R.U.D operations.
BLL holds operations manages for Models (in the BOL):
1. BranchManager.
2. CarTypeManager.
3. CarManager.
4. UserManager.
5. OrderManager.

### UIL
API that receives client requests and performs them with the relevant BLL Managers, if user's authorization and authentication requirements are met.
 
***
## Client side
* Client side was written in Angular.
* Client uses services to communicate with the server.
 

***
## Installation
1.	DB creation
i.	Files for creating the DB located in the "DB Creation" folder : https://github.com/oriTid/CS_Search_project/FINAL/tree/master/DB%20Creat
    
ii.	*You have 2 options for creating the DB*:    
1.	Restore CS_Search_DB.bak
2.	Execute Script CS_Search_DB.sql on SQL Server

iii.	Updating the Data-Connection in the program:
After DB is created, you will need to update the Data-Connection, in order for the program to work properly.
2.	Connection String
a.	The connection is set in the Web.Config file located in the 04_UIL:
<connectionStrings>
<add name="CarRentEntitiesModel"connectionString="metadata=res://*/CarRentEntitiesModel.csdl|res://*/CarRentEntitiesModel.ssdl|res://*/CarRentEntitiesModel.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=devps2010;initial catalog=CarRentComp;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />
</connectionStrings>

1.	Update 'data source' with SQL server name
data source=YOUR SQL SERVER NAME

2.	Update 'catalog' with the DB name (if you changed it)initial catalog=CarRentComp (or you DB name if you change it)

3.	Dont forget to update it before running the program.


3.	Angular environment setup
After the server is up and running you can see the port used for communicating.

a.	Navigate to "environment.ts" , located in src folder.

b.	Update the endpoint parameter with your local server port
etc – 'http:/localhost:XXX'

c.	Don’t forget NPM Install


