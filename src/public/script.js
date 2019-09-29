document.addEventListener('DOMContentLoaded', init);
function init(e) {
    let mouse = {
        click: false,
        move: false,
        pos: {
            x:0,
            y:0
        },
        pos_init:{
            x:0,
            y:0
        }
    }

    //canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    //socket
    const socket = io();


    //eventos
    canvas.addEventListener('mousedown', function (e){
        mouse.click = true;
    })

    canvas.addEventListener('mouseup', function (e){
        mouse.click = false;
    })

    canvas.addEventListener('mousemove', function (e){
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true
    })

    socket.on('draw_line_server', function (datos) {
        const line = datos.line;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(line[0].x * width, line[0].y * height)
        ctx.lineTo(line[1].x * width, line[1].y * height)
        ctx.stroke();
    })

    function mainloop () {
        if (mouse.click && mouse.move && mouse.pos_init) {
            socket.emit('draw_line', {line:[mouse.pos, mouse.pos_init]});
            mouse.move = false;
        }
        mouse.pos_init = {x: mouse.pos.x,y: mouse.pos.y};
        setTimeout(mainloop, 25);
    }

    mainloop()

}