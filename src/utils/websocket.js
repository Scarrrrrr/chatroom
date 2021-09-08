const websocket = new WebSocket("ws://localhost:8080/websocket")
websocket.onopen = function(e) {
    websocket.send(window.$cookies.get('token'))
}
export {
    websocket
}