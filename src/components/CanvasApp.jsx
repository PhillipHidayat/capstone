

import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Star, Circle} from 'react-konva';
// import { useEffect, useRef, useState } from "react";
// import "../App.css";
import React from 'react';
let count;

let addNewLine = false;
  

const CanvasApp = ({width,height, popup, setObjectState, lineColor, brushSize, brushOpacity })=>{
    /* This is the old way that the annotations were stored,
       now we are using an array of circles instead - Ben */
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const stageRef = React.useRef();
    const [lines, setLines] = React.useState([]);
    const [state, setState] = React.useState({
      id: -1,
      isDragging: false,
      x: 50,
      y: 50,
      lastLine: -1
    });
    

   //Ben's Code
   // --------------------------------------------------
    // const [circles, setCircles] = useState([]);
    // const addCircle = (x, y) => {
    //   const newCircle = {
    //     x,
    //     y,
    //     color: lineColor,
    //     size: brushSize,
    //     opacity: brushOpacity,
    //   };
    //   setCircles([...circles, newCircle]);
    // };

    // const handleMouseDown = (e) => {
    //   const stage = e.target.getStage();
    //   const pointerPos = stage.getPointerPosition();
    //   const { x, y } = pointerPos;
    //   addCircle(x, y);
    // };
//End of Ben's Code
// -------------------------------------------

    /* Old way of adding a new circle to the list of lines*/
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

  
    /* Event handling for moving a point, utilized the old line array*/
      const handleMouseUp = (e) => {
        // state.isDragging=true;
        // popup(true)
        // console.log("Mouse Up")
        let Xevent = e.evt.offsetX;
        let Yevent = e.evt.offsetY;
        // console.log(lines);
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
        // console.log("reloading")
        addNewLine = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { id: count, points: [Xevent, Yevent], bColor: lineColor, bSize: brushSize, bOpacity: brushOpacity}]);
        // addNewLine = true;
      };

      const deleteLine = (idToDelete) => {
        console.log(lines)
        console.log(idToDelete)
        const updatedLines = lines.filter(line => line.id !== idToDelete);
        console.log(updatedLines)
        // let update = lines.length-idToDelete;
        // new_lines=[]
        console.log(updatedLines.length)
        for (let i =idToDelete; i<updatedLines.length;i++){
          updatedLines[i].id = updatedLines[i].id -1;
        }
        setLines(updatedLines);
        console.log(updatedLines)
      };
    
    
    return(
      // Start of Ben's Code
      //-------------------------------------------------
    //   <Stage width={1280} height={1200} onMouseDown={handleMouseDown}>
    //   <Layer>
    //     {circles.map((circle, index) => (
    //       <Circle
    //         key={index}
    //         x={circle.x}
    //         y={circle.y}
    //         radius={circle.size}
    //         fill={circle.color}
    //         opacity={circle.opacity}
    //         shadowBlur = {5}
    //       />
    //     ))}
    //   </Layer>
    // </Stage>
// End of Ben's Code
//---------------------------------------------------
        /* Previous way that the dots were drawn, using old line array*/
        <Stage
            // onMouseUp={endDrawing}
            onMouseUp={handleMouseUp}
            // oncontextmenu={()=>{console.log("hi")}}
            // ref={canvasRef}
            // style={{flex: 1}}
            width={width}
            height={height}
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
              radius={line.bSize} fill={state.isDragging && state.id ==i ? 'green' : line.bColor}
              stroke = {state.lastLine.id == i ? 'yellow':'black'}
              shadowBlur = {5}
              opacity={line.bOpacity}
              draggable
              onClick={()=>{popup(true, deleteLine, i)}}

              onMouseDown={()=>{
                // console.log("mouse down")
                let tempState = {
                  id: i,
                  isDragging: false,
                  x: state.x,
                  y: state.y,
                  lastLine: line
                }
                // console.log(line);
                setState(tempState);
                // console.log(setObjectState);
                setObjectState();
                // setObjectState({
                //   state: tempState
                // });
              }}
              
              onDragStart={() => {
                // console.log("drag started")
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
                // console.log("Drag End")
                let tempState = {
                  id: -1,
                  isDragging: false,
                  x: e.target.x(),
                  y: e.target.y(),
                  lastLine: line
                }
                setState(tempState);
                line.points = [tempState.x, tempState.y]
                // console.log(tempState)
              
              }}
            />
          ))}
        </Layer>
        </Stage>
        
    );
};
export default CanvasApp;