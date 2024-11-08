Note: This is created using node v20.11.1 and npm v10.9.0

1. run npm install
2. run npm start
3. open on browser on localhost:3000
4. the api path is http://localhost:3000/api/v1/pickingSlips

5. for pagination you can add page and limit values as query params like example below

http://localhost:3000/api/v1/pickingSlips?page=2&limit=30

6. for status filtering, simply add a status value ('not printed', 'printed' and 'held' ) to the query params

http://localhost:3000/api/v1/pickingSlips?page=2&limit=30&status=held
