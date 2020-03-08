import React, { useRef, useEffect, useState } from "react";

function Canvas() {
	const canvasRef = useRef(null);
	const [bounce, setBounce] = useState(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const circle = {
			x: 100,
			y: 100,
			size: 30,
			speed: 10,
			dx: 0,
			dy: 0
		};

		function drawCircle() {
			ctx.beginPath();
			ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
			ctx.fillStyle = "black";
			ctx.fill();
		}

		function clear() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		function newPos() {
			circle.x += circle.dx;
			circle.y += circle.dy;

			detectWalls();
		}

		function detectWalls() {
			let audio = new Audio("Bounce.mp3");

			//Detect Side Walls
			if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
				circle.dx *= -1;
				audio.play();
				setBounce(b => b + 1);
			}
			//Detect Top and Bottom Walls
			if (
				circle.y + circle.size > canvas.height ||
				circle.y - circle.size < 0
			) {
				circle.dy *= -1;
				audio.play();
				setBounce(b => b + 1);
			}
		}

		function update() {
			clear();

			drawCircle();

			newPos();

			requestAnimationFrame(update);
		}

		function moveRight() {
			circle.dx = circle.speed;
		}
		function moveLeft() {
			circle.dx = -circle.speed;
		}
		function moveUp() {
			circle.dy = -circle.speed;
		}
		function moveDown() {
			circle.dy = circle.speed;
		}

		function keyDown(e) {
			if (
				e.key.includes("ArrowRight") ||
				e.key.includes("6") ||
				e.key.includes("d")
			) {
				moveRight();
			} else if (
				e.key.includes("ArrowLeft") ||
				e.key.includes("4") ||
				e.key.includes("a")
			) {
				moveLeft();
			} else if (
				e.key.includes("ArrowUp") ||
				e.key.includes("8") ||
				e.key.includes("w")
			) {
				moveUp();
			} else if (
				e.key.includes("ArrowDown") ||
				e.key.includes("2") ||
				e.key.includes("s")
			) {
				moveDown();
			}
		}

		update();

		document.addEventListener("keydown", keyDown);

		document.addEventListener("touchmove", function(e) {
			circle.x = e.touches[0].screenX;
			circle.dx = circle.dy = circle.speed;
			circle.y = e.touches[0].screenY;
		});

		function adjust(x) {
			if (x.matches) {
				circle.size *= 3;
				circle.speed *= 2.5;
			}
		}
		let x = window.matchMedia("(min-width: 1800px)");
		adjust(x);
		x.addListener(adjust);
	}, []);

	return (
		<div>
			<h1
				style={{
					position: "absolute",
					color: "rgba(100, 0, 250, 0.4)",
					left: 8
				}}
			>
				Bounces: <b style={{ color: "rgba(0, 255, 0, 0.5)" }}>{bounce}</b>
			</h1>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
}

export default Canvas;
