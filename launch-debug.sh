# Launch backend and frontend

node ./server.js &

sleep 2
(ps | grep node > /dev/null) && npm start