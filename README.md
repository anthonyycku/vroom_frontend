Project by:

- Andretti Duvenhage
- Maher George Brikae
- Anthony Ku

Built with:

- Ruby on Rails
- React
- Postgresql
- Bootstrap

Project description:

A responsive and full CRUD application showing the parent/child companies and car models associated with each car brand. The database design consists of a one-to-many relationship model:

=> Company and company (Some companies are children of other companies)
=> Company and car (Every company has their own car models)

Project features:

- Users can access children company pages through the parent company page
- Each company page shows the cars associated with that model
- This application features sorting via SQL methods, allowing users to sort and filter car models based on their price, type, rating, and model name alphabetically
- Users can also filter companies alphabetically, by country, or by number of children
- Users can create new companies and associate them with a parent (optional), and create new cars
- Loading screens while waiting for API calls
