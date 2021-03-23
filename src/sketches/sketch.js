import React, { useEffect } from "react";
import "./globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";

import Shuttle from "./shuttle";
import Obstacle from "./obstacle";
import soundBird from "../assets/birdCollision.mp3";
// import "./globals";
// import "p5/lib/addons/p5.sound";
// import p5 from 'p5';
// let p5 = require('p5/lib/addons/p5.sound');

const P5Sketch = () => {
  const sketch = (p5) => {
    let stl;
    let o;
    let bg;
    let end = true;
    let intro = true;
    let score = 0;
    let obstacles = [];
    let birdCollision;
    p5.setup = () => {
      let canvasDiv = document.querySelector("#canvas-limit");
      let width = canvasDiv.offsetWidth;
      let height = canvasDiv.offsetHeight;
      p5.createCanvas(width, height);
      p5.frameRate(30);
      p5.textSize(32);
      birdCollision = p5.loadSound(soundBird);

      setInterval(() => {
        if (obstacles.length < 3) {
          obstacles.push(new Obstacle(p5, score + 1));
        }
      }, 1500);
    };

    p5.draw = () => {
      p5.clear();
      p5.background(0, 0, 0, 0);
      p5.fill(0);
      p5.stroke(255);
      if (!end) {
        stl.move(p5);
        // o.move(p5, score);
        stl.drag(p5);

        if (!stl.isAlive(p5)) {
          end = true;
        }

        obstacles.forEach((obstacle) => {
          obstacle.render(p5);
          obstacle.move(p5);
          obstacle.offscreen(p5);
          if (stl.detectCollision(p5, obstacle.pos, obstacle.size)) {
            birdCollision.play();
            // end = true;
          }
        });

        // if (!o.isAlive(p5)) {
        //   o = new Obstacle(p5);
        // }

        stl.render(p5);
        // o.render(p5);

        score += 0.5;

        p5.fill(255);
        p5.textAlign(p5.RIGHT);
        p5.text(p5.int(score), p5.width - 30, 58);
      } else {
        p5.fill(255);
        p5.textAlign(p5.CENTER);
        if (intro) {
          p5.text("Clique para Jogar", p5.width / 2, 140);
        } else {
          p5.text("Clique para Jogar", p5.width / 2, 140);
          p5.text("score", p5.width / 2, 240);
          p5.text(p5.int(score), p5.width / 2, 280);
          obstacles = [];
        }
      }
    };

    p5.reset = () => {
      end = false;
      score = 0;
      stl = new Shuttle(p5);
      // o = new Obstacle(p5);
    };

    p5.mouseClicked = () => {
      intro = false;
      if (end) {
        p5.reset(p5);
      }
      stl.jump(p5, p5.mouseX, score);
    };
  };

  useEffect(() => {
    new p5(sketch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default P5Sketch;
