import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Menu from "./components/Menu";
import "./App.css";
import imgSource from "./images/left-eye.jpg";
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
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Examination from "./pages/Examination.js";
import Dashboard from "./pages/Dashboard.js";
import PatientRecords from "./components/PatientRecords.jsx";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Route, Routes} from 'react-router-dom'
Amplify.configure(awsconfig);

// enableRipple(true);

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    return userAttributes
  } catch (error) {
    console.log(error);
  }
}
let attributes = await handleFetchUserAttributes()

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

  // let component=<Home />
  // switch (window.location.pathname) {
  //   case "/":
  //     component = <Home />
  //     break
  //   case "/examination":
  //     component = <Examination />
  //     break
  //   case "/records":
  //     component = <PatientRecords />
  //     break
  //   case "/dashboard":
  //     component = <Dashboard />
  //     break
  // }
  // if (window.location.pathname.includes("/examination/")){
  //   // console.log(window.location.pathname);
  //   let patient = window.location.pathname.replace("/examination/",""); // essentially removes pre stuff to get patient id
  //   component = <Examination patient={patient}/>
  // }


  return (
    //style={{backgroundImage: `url(${imgSource})`}}
    <div className="App" >
      <Navbar signOut={signOut} user={attributes}/>
      <div className="Container" style={{width:'100%'}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/examination/:id" element={<Examination />} />
        </Routes>
      </div>
    </div>

  );
}
  
export default withAuthenticator(App);
// export default App;
