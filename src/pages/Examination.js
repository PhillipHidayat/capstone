import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Menu from "../components/Menu";
import "../App.css";
import imgSource from "../images/left-eye.png";
import redDotImage from "../images/redDot.jpg";
import CanvasApp from "../components/CanvasApp";
import * as React from 'react';
import ReactMarkdown from 'react-markdown'
import { Amplify, Storage } from 'aws-amplify';
import { withAuthenticator, Button, Flex, Heading, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from '../aws-exports';
import DroppableComponent from '../components/DroppableComponent';
import DiagnosisPopup from "../components/DiagnosisPopup.jsx";

Amplify.configure(awsconfig);

// enableRipple(true);



// DocumentEditorComponent.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog);

let i=0;

function Examination() {
  // const [component, setComponent] = useState(<Droppable></Droppable>)
  const [reloadItems, setReloadItems] = useState(false);
  const [reloadObject, setReloadObject] = useState();
  const [objectState, setObjectState] = useState({
    selected: 0,
    mapping: 0
  });
  const [lineColor, setLineColor] = useState("#000000");
  const [brushSize, setLineWidth] = useState(10);
  const [brushOpacity, setLineOpacity] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false)
  const [MarkDown, setInput] = useState(`> Sample markdown that will be rendered as html 

  **Sample Headers**
  # Header1
  ## Header2
  ### Header3
  #### Header4
  ##### Header5
  ###### Header6
  
  
  **This image will be rendered as html element figure with figurecaption.**
  ![A sample image](/images/Screenshot.jpg) 
  
  **Below code will be rendered with line numbers and line highlights**
  
  \`\`\`javascript{1,3,5}
  const sampleFunction = () => {
  
    const value = '1'
    let language = value;
    let lineHighlights = [];
    const obj = { 'language': language, 'lineHighlights': lineHighlights }; 
    return obj
  }
  \`\`\`
  
  > Complete`);
// setting delete function and key for popup
const [key, setKey] = useState(0);
const [delete_circle, set_delete_circle] = useState();


  useEffect(()=>{
    // console.log(objectState);
  });

  var method = setObjectState
  if (i==0){
    method();
    console.log(method);
    i++
  }
  


  const onDragEnd = (result)=> {
    // dropped outside the list
    setReloadItems(true);
    setReloadObject(result);
}
// let deleteFunction = 0;
// let key=0;
const handleSetPopUp = (value,delete_function,key)=> {
  // console.log(delete_function)
  // console.log(key)
  set_delete_circle(()=>delete_function);
  setKey(key);
  setPopupVisible(value);
}
  
  
  return (
    //style={{backgroundImage: `url(${imgSource})`}}
    <div className="App" >
      <h1>MedCapture</h1>
      <DiagnosisPopup trigger= {popupVisible} setTrigger= {setPopupVisible} delete_circle={delete_circle} circle_key={key}></DiagnosisPopup>
      <Menu setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity}
      brushSize={brushSize} brushOpacity={brushOpacity} />
      <div className="draw-area" >
        <div className="background-image" style={{
        backgroundImage: `url(${imgSource})`,
        backgroundSize: '1280px 1000px',
        height: '1000px'
      }}>
        {/* <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`1200px`}
        />     */}
        <CanvasApp width={1276} height={1000} popup = {handleSetPopUp} setObjectState={() => method} lineColor={lineColor} brushSize={brushSize} brushOpacity={brushOpacity} />
        </div>
      
      </div>
      <div id="markdown-rectangle">
        {/* <DroppableComponent result= {reloadItems} e= {reloadObject}></DroppableComponent> */}
        <h1 style={{textAlign:"center"}}>TBD PDF</h1>
      </div>
    </div>
  );
}
  
// export default withAuthenticator(App);
export default Examination;
