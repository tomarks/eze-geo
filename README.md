![Build Status](https://github.com/tomarks/eze-geo/actions/workflows/dotnet.yml/badge.svg)

# eze-geo
.Net Web Api and React SPA to manage and visualise geographical datasets

## Dev Requirements
- .Net Core 8.0
- Visual Studio 2022/Rider & VSCode or just CLI if you know the commands
- NodeJs v20+ (16 or 18 may be fine but i didnt test)

## Dev Getting Started
1. Back-end
   1. Build and Run the .Net Web Api located at **/src/backend/Api/Api.csproj** in debug mode
      1. Can be done with VisualStudio or Rider using the `https` launch profile 
   2. This will open swagger
   3. Accept the dev certificate
2. Front-end
   1. Navigate to **/src/frontend/** in the terminal
   2. Run > `npm run setup` - this will install pnpm and the project packages
   3. Run > `npm start` - this will run vite
3. Database
   1. Nothing needs to be done, the project should create a sqlite database automatically in the local user directory `C:\Users\{user}\AppData\Local`
   2. Delete the file and re-run the project to start clean

## The Task
Develop a web-based file and folder explorer with the following features (use the wireframe below as the app’s UI layout).
- Display a file directory tree view to navigate within your file and folder system.
- Display a breadcrumb trail with links to parent or grandparent folders.
- Display a list of files and folders for selected folders.
- Create folders that can be named (‘rename’ functionality is not required).
- Select a local file and upload it to the file directory. Only csv or a geojson files can be uploaded (see example files).

### Assumptions
- A user can manage a web based folder structure.
- A folder can have a parent folder.
- A folder with no parent is considered a child of the root folder.
- A folder can contain any number of files or folders

### Domain Terms
- User - There is no login system so we assume any user of the system works with the same data.
- Folder - A Virtual directory with its overall structure determined by keeping a reference to its parent using an id.
- File - An uploaded document with a record persisted with a reference to its folder

### Future Plans
- Handle any existing TODO comments in backend project
- Move file data to blob storage (not sql)
- Add Users/Login System
- Add Rename/Update/Delete for files and directories
- Migrate from Sqlite to Postgres
- Investigate how to draw boundaries on a map using haversine formula and only recording longitudes and latitudes
 
