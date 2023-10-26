

import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Star, Circle} from 'react-konva';
// import { useEffect, useRef, useState } from "react";
// import "../App.css";
import React from 'react';
let count;

let addNewLine = false;
  

const CanvasApp = (setObjectState)=>{
    // const canvasRef = useRef(null);
    // const ctxRef = useRef(null);
    const stageRef = React.useRef();
    const [lines, setLines] = React.useState([]);
    const [state, setState] = React.useState({
      id: -1,
      isDragging: false,
      x: 50,
      y: 50,
      lastLine: -1
    });

    useEffect(()=>{
      count = lines.length
      if (addNewLine==true){
        let tempState = {
          id: (count-1),
          isDragging: false,
          x: state.x,
          y: state.y,
          lastLine: lines[(count-1)]
        }
        setState(tempState)
        addNewLine = false
      }
      
    });
    // const canvas = document.querySelector("canvas");
    // const canvasRef = useRef(null);
    // const ctxRef = useRef(null);

  

      const handleMouseUp = (e) => {
        // state.isDragging=true;
        let Xevent = e.evt.offsetX;
        let Yevent = e.evt.offsetY;
        console.log(lines);
        for (let i=0; i< lines.length; i++){
            let line = lines[i];
            // console.log(line);
            let x = line.points[0];
            let y = line.points[1];
            // console.log(x,Xevent,y, Yevent);
            let total = Math.sqrt(Math.abs(x-Xevent)**2 +Math.abs(y-Yevent)**2);
            // console.log(total);
            if(total<10 || state.isDragging==true){
                return
            }
        }
        addNewLine = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { id: count, points: [Xevent, Yevent]}]);
        addNewLine = true;
      };
      

    

    return(
        <Stage
            // onMouseUp={endDrawing}
            onMouseUp={handleMouseUp}
            // ref={canvasRef}
            width={1280}
            height={1200}
            ref={stageRef}
        >
            <Layer>
          <Text
            
            
          />
          {lines.map((line, i) => (
            <Circle
              key={i}
              points={line.points}
              x={line.points[0]}
              y={line.points[1]}
              radius={10} fill={state.isDragging && state.id ==i ? 'green' : 'black'}
              stroke = {state.lastLine.id == i ? 'yellow':'black'}
              shadowBlur = {5}
              draggable

              onMouseDown={()=>{
                console.log("mouse down")
                let tempState = {
                  id: i,
                  isDragging: false,
                  x: state.x,
                  y: state.y,
                  lastLine: line
                }
                console.log(line);
                setState(tempState);
                console.log(setObjectState);
                setObjectState();
                // setObjectState({
                //   state: tempState
                // });
              }}
              
              onDragStart={() => {
                console.log("drag started")
                let tempState = {
                  id: i,
                  isDragging: true,
                  x: state.x,
                  y: state.y,
                  lastLine: line
                }
                setState(tempState);
              }}
              onDragEnd={(e) => {
                console.log(e)
                let tempState = {
                  id: -1,
                  isDragging: false,
                  x: e.target.x(),
                  y: e.target.y(),
                  lastLine: line
                }
                setState(tempState);
                line.points = [tempState.x, tempState.y]
                console.log(tempState)
              
              }}
            />
          ))}
        </Layer>
        </Stage>
    );
};
export default CanvasApp;