
# Car Rental Company Project

## DataBase
**Technologies, Infrastructure and providers for this project**
* MS SQL Server
* C# (Server Side) with WebAPI
* Angular (Client Side)
* Bootstrap 3, 4
* Custom Pipes
* Interceptor
* Angular material

## Server
* The C# server is build according to the N-tier model.

***
## DB
** DB  Diagram**
Attached a DB diagram 
![Screenshot]( DB-Diagram.PNG)
More info -> "CarRent Project - DOC STILL inProgress.docx" **(doc is still in work)** 
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
**1. DB creation**

You have 2 options for creating the DB:
* Restore **CarRentComp_backup.bak**
* Execute Script **CarRentDB.sql** on SQL Server 
***


**2. Data Connection setup  in the server**

After DB is created, you will need to update the Data-Connection, in order for the program to work properly:

**The connection is set in the Web.Config file located in the 04_UIL:**
1. Update **data source** with your SQL server name  : data source=**YOUR SQL SERVER NAME**
2. Update **catalog** with the DB name **(if you changed it)** initial catalog=CarRentComp (or you DB name if you change it)

**Dont forget to update connection string before running the server.**
***

**3. Angular Environment setup**

First thing first - **Don’t forget NPM Install**

After the **server** is up and running  you can see the port used for communicating.

1. Navigate to **"environment.ts"** , located in src folder.
2. Update the **endpoint parameter** with your local server port
etc – 'http:/localhost:**XXX**'

**4. System Users**
* These are username / password for the system users:
1. admin / admin123
2. worker1 /  worker123
3. worker2 / worker123
4. user1 / user123
5. user2 / user123
6. user3 / user123
7. user4 / user123

