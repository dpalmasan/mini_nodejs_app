# mini_nodejs_app

Steps to run it:

1. Install packages via: npm install
2. To have database loaded for the first time, use the script force_db_load via: node force_db_load.js. Once the script finished, you can terminate it (e.g. control-C). This assumes that you have a mongod instance being listening at port 27017 (default)
3. Then, init the app by running: node app.js
4. Go to port 3000, in the navigator: localhost:3000
