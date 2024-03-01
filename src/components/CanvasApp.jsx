

import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Star, Circle} from 'react-konva';
import React from 'react';
let count;
let highestID;
let addNewLine = false;

// Define a class to represent your data
class annotation {
  constructor(comment, diagnosis, location, img) {
    this.comment = comment;
    this.diagnosis = diagnosis;
    this.location = location;
    this.img = img;
  }
}
  

const CanvasApp = ({width,height, popup, setObjectState, lineColor, brushSize, brushOpacity, returnCoords, notes, image, addAnnotation, lines, setLines, state, setState})=>{
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const stageRef = React.useRef();
    // const [lines, setLines] = React.useState([]);
    // const [state, setState] = React.useState({
    //   id: -1,
    //   isDragging: false,
    //   x: 50,
    //   y: 50,
    //   lastLine: -1
    // });
    useEffect(()=>{
      highestID = 0;
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
  
    /* Event handling for moving a point, utilized the old line array*/
      const handleMouseUp = (e) => {
        let Xevent = e.evt.offsetX;
        let Yevent = e.evt.offsetY;
        returnCoords(Xevent, Yevent);
        for (let i=0; i< lines.length; i++){
            let line = lines[i];
            let x = line.points[0];
            let y = line.points[1];
            let total = Math.sqrt(Math.abs(x-Xevent)**2 +Math.abs(y-Yevent)**2);
            if(total<10 || state.isDragging==true){
                return
            }
        }
        addNewLine = true;
        const pos = e.target.getStage().getPointerPosition();
        let maxValue = 0;
        if (lines.length != 0) {maxValue = Math.max.apply(null, lines.map(function (o) { return o.id; }))};
        let newList = [...lines, { id: maxValue + 1, points: [Xevent, Yevent], bColor: lineColor, bSize: brushSize, bOpacity: brushOpacity}];
        setLines(newList);
      };

      const deleteLine = (idToDelete) => {
        const updatedLines = lines.filter(line => line.id !== idToDelete);
        count = updatedLines.length + 1;
        setLines(updatedLines);
      };
    function linesToDraw(){
      let image_type = ""
      if(image.includes("inner")){ image_type= "inner"; }
      else if(image.includes("left")){ image_type= "left"; }
      else if(image.includes("right")){ image_type= "right"; }
      let tempList = [];
      console.log('LINES')
      console.log(lines)
      console.log("notes")
      console.log(notes)
      for(let i = 0; i < lines.length; i++) {
        // console.log
        if (notes.has(lines[i].id) && image.includes(notes.get(lines[i].id).img)) {
          tempList = [...tempList, lines[i]];
        }
        else if (!notes.has(lines[i].id)) {
          tempList = [...tempList, lines[i]]; 
          // addAnnotation(lines[i].id, image_type)
        }
      }
      return tempList;
    }
    
    
    return(
        <Stage
            onMouseUp={handleMouseUp}
            width={width}
            height={height}
            ref={stageRef}
        >
            <Layer>
          <Text
            
          />
          {linesToDraw().map((line, i) => (
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
              onClick={()=>{
                popup(true, deleteLine, line.id); 
              }}

              onMouseDown={()=>{
                let tempState = {
                  id: i,
                  isDragging: false,
                  x: state.x,
                  y: state.y,
                  lastLine: line
                }
                // console.log(i)
                setState(tempState);
                setObjectState();
              }}
              
              onDragStart={() => {
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
                let tempState = {
                  id: -1,
                  isDragging: false,
                  x: e.target.x(),
                  y: e.target.y(),
                  lastLine: line
                }
                setState(tempState);
                line.points = [tempState.x, tempState.y]
              
              }}
            />
          ))}
        </Layer>
        </Stage>
        
    );
};
export default CanvasApp;