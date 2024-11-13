## Freedom Forever App

Sample app for displaying leads

## Start up instructions

To seed the database you'll need to add a database dump called `technical_interview_project_sql_dump.sql` to `database/seeders`. If the file contains create statements it needs to use `CREATE TABLE IF NOT EXISTS` to avoid any errors importing data.

Then run `php artisan migrate:fresh --seed`

Start the app running `composer run dev`

