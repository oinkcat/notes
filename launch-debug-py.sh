# Launch Python backend and frontend

killall python3
python3 ./py_server_src/server.py &

sleep 2
(ps | grep python3 > /dev/null) && npm start

killall python3
