# Launch backend and frontend

node ./server_src/server.js &

sleep 2
(ps | grep node > /dev/null) && npm start
