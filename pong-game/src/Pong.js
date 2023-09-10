import React, { useRef, useEffect, useState } from 'react';

const Pong = () => {
    const canvasRef = useRef(null);
    const [ball, setBall] = useState({ x: 50, y: 50, dx: 2, dy: 2, radius: 5 });
    const [paddle, setPaddle] = useState({ x: 10, y: 50, width: 10, height: 40 });

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'white';
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw paddle
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    };

    const update = () => {
        // Update ball position
        setBall(prevBall => ({
            ...prevBall,
            x: prevBall.x + prevBall.dx,
            y: prevBall.y + prevBall.dy
        }));
        
        // Ball collision with top and bottom
        if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvasRef.current.height - ball.radius) {
            setBall(prevBall => ({ ...prevBall, dy: -prevBall.dy }));
        }
        
        // Ball collision with paddle
        if (ball.x + ball.dx < paddle.x + paddle.width && 
            ball.y + ball.dy > paddle.y && 
            ball.y + ball.dy < paddle.y + paddle.height) {
            setBall(prevBall => ({ ...prevBall, dx: -prevBall.dx }));
        }
    };

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        draw(ctx);

        const interval = setInterval(() => {
            update();
            draw(ctx);
        }, 10);

        return () => clearInterval(interval);
    }, [ball, paddle]);

    return (
        <canvas ref={canvasRef} width={400} height={200} style={{ background: 'black' }}></canvas>
    );
};

export default Pong;
