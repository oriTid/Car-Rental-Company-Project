USE [master]
GO
/****** Object:  Database [CarRentComp]    Script Date: 16/09/2018 16:23:57 ******/
CREATE DATABASE [CarRentComp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CarRentComp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\CarRentComp.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'CarRentComp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\CarRentComp_log.ldf' , SIZE = 7048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [CarRentComp] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CarRentComp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CarRentComp] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CarRentComp] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CarRentComp] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CarRentComp] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CarRentComp] SET ARITHABORT OFF 
GO
ALTER DATABASE [CarRentComp] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CarRentComp] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CarRentComp] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CarRentComp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CarRentComp] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CarRentComp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CarRentComp] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CarRentComp] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CarRentComp] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CarRentComp] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CarRentComp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CarRentComp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CarRentComp] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CarRentComp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CarRentComp] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CarRentComp] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CarRentComp] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CarRentComp] SET RECOVERY FULL 
GO
ALTER DATABASE [CarRentComp] SET  MULTI_USER 
GO
ALTER DATABASE [CarRentComp] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CarRentComp] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CarRentComp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CarRentComp] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [CarRentComp] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'CarRentComp', N'ON'
GO
USE [CarRentComp]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 16/09/2018 16:23:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[BranchName] [nvarchar](50) NOT NULL,
	[BranchTel] [nvarchar](50) NOT NULL,
	[BranchAddress] [nvarchar](50) NOT NULL,
	[BranchLatitude] [float] NOT NULL,
	[BarnchLongitude] [float] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 16/09/2018 16:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[CarTypeID] [int] NOT NULL,
	[LicenseNumber] [nvarchar](15) NOT NULL,
	[CurrentKilometers] [int] NOT NULL,
	[IsOperative] [bit] NOT NULL,
	[BranchLocation] [int] NOT NULL,
	[CarPic] [nvarchar](150) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Cars] PRIMARY KEY CLUSTERED 
(
	[LicenseNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarTypes]    Script Date: 16/09/2018 16:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarTypes](
	[CarTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer] [nvarchar](50) NOT NULL,
	[Model] [nvarchar](50) NOT NULL,
	[CarYear] [int] NOT NULL,
	[DailyRate] [money] NOT NULL,
	[LateDailyRate] [money] NOT NULL,
	[IsAutomatic] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CarTypes] PRIMARY KEY CLUSTERED 
(
	[CarTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 16/09/2018 16:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[OrderDate] [date] NOT NULL,
	[LicenseNumber] [nvarchar](15) NOT NULL,
	[UserID] [int] NOT NULL,
	[OrderStart] [date] NOT NULL,
	[PlannedEnd] [date] NOT NULL,
	[ActualEnd] [date] NULL,
	[OrigianlCost] [money] NOT NULL,
	[ActualCost] [money] NULL,
	[IsActiveOrder] [bit] NOT NULL,
 CONSTRAINT [PK_Rents] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 16/09/2018 16:23:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[ID] [nvarchar](50) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Birthdate] [date] NULL,
	[isMale] [bit] NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[UserPic] [nvarchar](150) NULL,
	[UserPermission] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchTel], [BranchAddress], [BranchLatitude], [BarnchLongitude], [IsDeleted]) VALUES (2, N'Yehud-Monoson', N'09-7418892', N'34 Yaffo st. Jerusalem', 1234.1234, 1234.1234, 0)
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchTel], [BranchAddress], [BranchLatitude], [BarnchLongitude], [IsDeleted]) VALUES (3, N'Ramat Gan', N'03-4998343', N'1 Hertzel St.', 234.234, 432.432, 0)
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchTel], [BranchAddress], [BranchLatitude], [BarnchLongitude], [IsDeleted]) VALUES (5, N'Haifa', N'04-4449944', N'1 Waitzman st.', 666.6666, 5555.5555, 0)
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchTel], [BranchAddress], [BranchLatitude], [BarnchLongitude], [IsDeleted]) VALUES (6, N'Netanya', N'07-5554443', N'1 Bakersfield St.', 667777.66666, 555444666.55555, 0)
SET IDENTITY_INSERT [dbo].[Branches] OFF
SET IDENTITY_INSERT [dbo].[Cars] ON 

INSERT [dbo].[Cars] ([CarID], [CarTypeID], [LicenseNumber], [CurrentKilometers], [IsOperative], [BranchLocation], [CarPic], [IsDeleted]) VALUES (88, 4, N'3345ASA', 675676, 1, 6, N'66bed2d0-3dce-434a-b8ee-aac28f289c87A1.jpg', 0)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [LicenseNumber], [CurrentKilometers], [IsOperative], [BranchLocation], [CarPic], [IsDeleted]) VALUES (89, 6, N'457665', 435666, 1, 6, N'cdde5023-c236-4e69-bb89-f72973038a2cBmw_m6.png', 0)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [LicenseNumber], [CurrentKilometers], [IsOperative], [BranchLocation], [CarPic], [IsDeleted]) VALUES (90, 3, N'56445', 464576, 1, 3, N'bf452788-d13e-4c83-8052-ba4d44c1ae23A8.jpg', 0)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [LicenseNumber], [CurrentKilometers], [IsOperative], [BranchLocation], [CarPic], [IsDeleted]) VALUES (86, 8, N'666777', 1000, 1, 3, N'9b6b7a83-97c0-4cdc-a511-90766c55a95e911.png', 0)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [LicenseNumber], [CurrentKilometers], [IsOperative], [BranchLocation], [CarPic], [IsDeleted]) VALUES (91, 10, N'7654456', 346543, 1, 6, N'f740e275-46fa-429f-8796-335b3a2203d5iris.png', 0)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [LicenseNumber], [CurrentKilometers], [IsOperative], [BranchLocation], [CarPic], [IsDeleted]) VALUES (87, 7, N'88877AX', 34898, 1, 5, N'b1ee1110-9833-48b6-9357-5fd56aa1afeebug.jpg', 0)
SET IDENTITY_INSERT [dbo].[Cars] OFF
SET IDENTITY_INSERT [dbo].[CarTypes] ON 

INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (1, N'Reno', N'Clio++', 2019, 10.0000, 20.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (2, N'Toyota', N'Corolla', 2018, 20.0000, 40.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (3, N'Audi', N'A8 Turbo', 2018, 200.0000, 30.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (4, N'Audi', N'S1 Sport', 2017, 120.0000, 10.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (5, N'Ferrari', N'Testarossa', 2016, 350.0000, 100.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (6, N'BMW', N'M6', 2018, 200.0000, 20.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (7, N'Bugati', N'Chevon', 2019, 380.0000, 120.0000, 1, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (8, N'Porsche', N'911 4GS', 2018, 200.0000, 130.0000, 0, 0)
INSERT [dbo].[CarTypes] ([CarTypeID], [Manufacturer], [Model], [CarYear], [DailyRate], [LateDailyRate], [IsAutomatic], [IsDeleted]) VALUES (10, N'Mercedes', N'S55 AMG', 2018, 180.0000, 20.0000, 1, 0)
SET IDENTITY_INSERT [dbo].[CarTypes] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (103, CAST(N'2018-09-16' AS Date), N'3345ASA', 13, CAST(N'2018-09-19' AS Date), CAST(N'2018-09-21' AS Date), NULL, 360.0000, NULL, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (104, CAST(N'2018-08-22' AS Date), N'56445', 13, CAST(N'2018-08-27' AS Date), CAST(N'2018-08-29' AS Date), CAST(N'2018-08-29' AS Date), 600.0000, 600.0000, 0)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (105, CAST(N'2018-09-03' AS Date), N'7654456', 13, CAST(N'2018-09-03' AS Date), CAST(N'2018-09-06' AS Date), CAST(N'2018-09-06' AS Date), 720.0000, 720.0000, 0)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (106, CAST(N'2017-10-10' AS Date), N'666777', 50, CAST(N'2017-10-16' AS Date), CAST(N'2017-10-26' AS Date), CAST(N'2017-10-26' AS Date), 2200.0000, 2200.0000, 0)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (107, CAST(N'2017-05-06' AS Date), N'457665', 54, CAST(N'2017-06-06' AS Date), CAST(N'2017-08-06' AS Date), CAST(N'2017-08-06' AS Date), 12400.0000, 12400.0000, 0)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (108, CAST(N'2018-09-16' AS Date), N'7654456', 54, CAST(N'2018-09-16' AS Date), CAST(N'2018-09-23' AS Date), NULL, 1440.0000, NULL, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (109, CAST(N'2018-09-16' AS Date), N'88877AX', 55, CAST(N'2018-09-16' AS Date), CAST(N'2018-09-30' AS Date), NULL, 5700.0000, NULL, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (110, CAST(N'2018-09-16' AS Date), N'457665', 55, CAST(N'2018-09-17' AS Date), CAST(N'2018-09-30' AS Date), NULL, 2800.0000, NULL, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (111, CAST(N'2018-09-16' AS Date), N'56445', 57, CAST(N'2018-09-21' AS Date), CAST(N'2018-09-26' AS Date), NULL, 1200.0000, NULL, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (113, CAST(N'2018-09-16' AS Date), N'7654456', 54, CAST(N'2018-09-01' AS Date), CAST(N'2018-09-08' AS Date), CAST(N'2018-09-14' AS Date), 1440.0000, 1560.0000, 0)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (114, CAST(N'2018-09-16' AS Date), N'7654456', 57, CAST(N'2018-05-03' AS Date), CAST(N'2018-05-06' AS Date), CAST(N'2018-09-16' AS Date), 720.0000, 3380.0000, 0)
INSERT [dbo].[Orders] ([OrderID], [OrderDate], [LicenseNumber], [UserID], [OrderStart], [PlannedEnd], [ActualEnd], [OrigianlCost], [ActualCost], [IsActiveOrder]) VALUES (115, CAST(N'2018-09-16' AS Date), N'7654456', 50, CAST(N'2018-09-25' AS Date), CAST(N'2018-10-04' AS Date), NULL, 1800.0000, NULL, 1)
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (1, N'Admin', N'Adminiyahoo', N'444555895', N'admin', CAST(N'1977-12-06' AS Date), 1, N'ori@orantech.co.il', N'admin123', N'3b55ba1c-a55b-4308-8862-8f9670a61392admin.png', 2, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (13, N'user1', N'user1', N'777777777', N'user1', CAST(N'1977-09-04' AS Date), 0, N'nuritn@orantech.co.il', N'user123', N'aa3bf179-7159-4c78-bab4-e4294d4a35aaclient.jpeg', 0, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (15, N'Worker1', N'Worker1', N'454534565', N'worker1', CAST(N'1977-09-10' AS Date), 0, N'nu@snff.co.il', N'worker123', N'8ee8a2d8-5aa3-4c02-928b-0ab334bd2fbaworker1.jpg', 1, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (50, N'user2', N'user2', N'123123123', N'user2', CAST(N'0009-09-11' AS Date), 0, N'nuritn@orantech.co.il', N'user123', N'70743363-b59c-4b54-a9df-4ccb20799eb2amy.jpg', 0, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (51, N'Worker2', N'Worker2', N'123123123', N'worker2', CAST(N'0008-06-12' AS Date), 0, N'nuritn@orantech.co.il', N'worker123', N'9490cea6-feec-450e-a354-d3bb9764b502worker.png', 0, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (54, N'user3', N'user3', N'777777777', N'user3', CAST(N'1977-09-04' AS Date), 0, N'nuritn@orantech.co.il', N'user123', N'619eed24-ef59-4e8e-93a5-fbe88e91da3fKurt_cobain1.jpg', 0, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (55, N'user4', N'user4', N'123123123', N'user4', CAST(N'1977-09-04' AS Date), 0, N'nuritn@orantech.co.il', N'user123', N'112032d2-11e8-4aa9-8111-06fe4cf05beeclient2.jpg', 0, 0)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [ID], [UserName], [Birthdate], [isMale], [Email], [Password], [UserPic], [UserPermission], [IsDeleted]) VALUES (57, N'user5', N'user5', N'777777777', N'user5', CAST(N'1977-09-04' AS Date), 0, N'nuritn@orantech.co.il', N'user123', N'2abb340a-8421-40d6-915d-a52dca423b6dRafNJvHx_400x400.jpeg', 0, 0)
SET IDENTITY_INSERT [dbo].[Users] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Users]    Script Date: 16/09/2018 16:23:58 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users] ON [dbo].[Users]
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Branches] ADD  CONSTRAINT [DF_Branches_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Cars] ADD  CONSTRAINT [DF_Cars_IsOperative]  DEFAULT ((1)) FOR [IsOperative]
GO
ALTER TABLE [dbo].[Cars] ADD  CONSTRAINT [DF_Cars_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[CarTypes] ADD  CONSTRAINT [DF_CarTypes_IsAutomatic]  DEFAULT ((1)) FOR [IsAutomatic]
GO
ALTER TABLE [dbo].[CarTypes] ADD  CONSTRAINT [DF_CarTypes_Isdeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_IsActiveOrder]  DEFAULT ((1)) FOR [IsActiveOrder]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_isMale]  DEFAULT ((0)) FOR [isMale]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_UserPermission]  DEFAULT ((0)) FOR [UserPermission]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Branches] FOREIGN KEY([BranchLocation])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Branches]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_CarTypes] FOREIGN KEY([CarTypeID])
REFERENCES [dbo].[CarTypes] ([CarTypeID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_CarTypes]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Cars] FOREIGN KEY([LicenseNumber])
REFERENCES [dbo].[Cars] ([LicenseNumber])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Cars]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Rents_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Rents_Users]
GO
USE [master]
GO
ALTER DATABASE [CarRentComp] SET  READ_WRITE 
GO
