import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Menu from "./components/Menu";
import "./App.css";
import imgSource from "./images/my-image.jpg";
import redDotImage from "./images/redDot.jpg";
import CanvasApp from "./components/CanvasApp";
import * as React from 'react';
import ReactMarkdown from 'react-markdown'
import { Amplify, Storage } from 'aws-amplify';
import { withAuthenticator, Button, Flex, Heading, Image, Text } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import DroppableComponent from './components/DroppableComponent';
Amplify.configure(awsconfig);

// enableRipple(true);



// DocumentEditorComponent.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog);

let i=0;

function App({ signOut, user }: WithAuthenticatorProps) {
  // const [component, setComponent] = useState(<Droppable></Droppable>)
  const [reloadItems, setReloadItems] = useState(false);
  const [reloadObject, setReloadObject] = useState();
  const [objectState, setObjectState] = useState({
    selected: 0,
    mapping: 0
  });
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
  useEffect(()=>{
    console.log(objectState);
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
  
  
  return (
    //style={{backgroundImage: `url(${imgSource})`}}
    <div className="App" >
      <h1>Jorge + Tanner Demo</h1>
      <div >
        {/* <ButtonComponent >OD</ButtonComponent>
        <ButtonComponent >OS</ButtonComponent> */}
        <Button onClick={()=>signOut()}>Sign Out</Button>
      </div>

      <div className="draw-area">
        <Menu

        />
        <div className="background-image" style={{
        backgroundImage: `url(${imgSource})`,
        backgroundSize: '1280px 1200px',
        height: '1200px'
      }}>
        {/* <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`1200px`}
        />     */}
        <CanvasApp setObjectState={()=>method}></CanvasApp>
        </div>
      
      </div>
      <div id="markdown-rectangle">
        <DroppableComponent result= {reloadItems} e= {reloadObject}></DroppableComponent>
      </div>
    </div>
  );
}
  
export default withAuthenticator(App);
// export default App;
