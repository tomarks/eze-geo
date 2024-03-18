![Build Status](https://github.com/tomarks/eze-geo/actions/workflows/dotnet.yml/badge.svg)

# eze-geo
.Net Web Api and React SPA to manage and visualise .csv and .geojson datasets

## Development
### Requirements
- .Net Core 8.0
- Visual Studio 2022/Rider & VSCode or CLI
- NodeJs v20+ (16 or 18 may be fine )

### Getting Started
1. Back-end
   1. Build and Run the .Net Web Api located at `/src/backend/Api/Api.csproj` in debug mode
      1. Can be run with VisualStudio or Rider using the `https` launch profile 
      2. Can be run from CLI running the npm script `api` from the /frontend folder or running `dotnet run --launch-profile https`
   2. Note: This will open swagger, ensure you `accept` the `developer certificate`
2. Front-end
   1. Navigate to `/src/frontend/` in the terminal
   2. Run `npm run setup` to install pnpm and the project packages
   3. Run `npm start` to run vite
3. Database
   1. Nothing needs to be done, the project should create a sqlite database automatically in the local user directory `C:\Users\{user}\AppData\Local`
   2. Delete the file and re-run the project to start clean

## Domain

### Goals
Develop a web-based file and folder explorer with the following features (use the wireframe below as the app’s UI layout).
- Display a file directory tree view to navigate within your file and folder system.
- Display a breadcrumb trail with links to parent or grandparent folders.
- Display a list of files and folders for selected folders.
- Create folders that can be named (‘rename’ functionality is not required).
- Select a local file and upload it to the file directory. Only csv or a geojson files can be uploaded (see example files).

### Assumptions
- A user can manage a web based folder structure.
- A folder can have a parent folder.
- A folder with no parent is considered a root directory.
- A folder can contain any number of files or folders

### Terms
- Directory - A Virtual directory with its overall structure determined by keeping a reference to its parent using an id.
- Document - An uploaded document with a record persisted with a reference to its folder

### Future Plans
- Handle any existing TODO comments in backend project
- Move file data to blob storage (not sql)
- Add Login System using cookies
- Add Rename/Update/Delete for files and directories
- Migrate from Sqlite to Postgres
- Investigate how to draw boundaries on a map using haversine formula and only recording longitudes and latitudes
 
