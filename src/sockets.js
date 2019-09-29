module.exports = function (io) {
    var line_history = [];
    io.on('connection', function (socket) {
        console.log("sockette");
        for(let i in line_history){
            socket.emit('draw_line_server', { line: line_history[i] })
        }
        socket.on('draw_line', function(datos) {
            line_history.push(datos.line);
            io.emit('draw_line_server', datos);
        } )
    })

}