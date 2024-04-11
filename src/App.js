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
import ExamRecords from "./components/exam records/ExamRecords.jsx";
import IntakeForm from "./components/IntakeForm.jsx";
import CreateShorthandPopup from "./components/CreateShorthandPopup.jsx";
import { DataStore } from '@aws-amplify/datastore';
import { Shorthand } from './models'
import ViewShorthandPopup from "./components/ViewShorthandPopup.jsx";
import SummaryForm from "./components/SummaryForm.jsx";
Amplify.configure(awsconfig);

// enableRipple(true);



// DocumentEditorComponent.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog);

let i=0;

function App({ signOut, user }: WithAuthenticatorProps) {
  const [attributes, setAttributes] = useState(null);
  useEffect(()=>{
    fetchUserAttributes().then(p => {
      setAttributes(p);
    });
  }, []);

  const [createPopupvisible, setCreatePopup] = useState(false);
  const [shorthandMap, setShorthand] = useState(new Map());
  const [shorthandList, setList] = useState([]);
  const [viewPopupVisible, setView] = useState(false);

  async function fetchShorthand() {
    try {
      const posts = await DataStore.query(Shorthand, (c) => c.User.eq(attributes ? attributes.email : ''));
      return posts;
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return [];
  }

  useEffect(() => {
    let tempMap = new Map();
    console.log("FIRST LOAD")
    fetchShorthand().then(posts => {
      setList(posts);
      console.log(posts);
      for(let i = 0; i < posts.length; i++){
        tempMap.set(posts[i].key, posts[i].value);
      }
      console.log(tempMap);
      setShorthand(tempMap);
    })
  }, [attributes]);

  useEffect(() => {
    let tempMap = new Map();
    fetchShorthand().then(posts => {
      setList(posts);
      for(let i = 0; i < posts.length; i++){
        tempMap.set(posts[i].key, posts[i].value);
      }
      setShorthand(tempMap);
    })
  }, [viewPopupVisible, createPopupvisible]);

  return (
    //style={{backgroundImage: `url(${imgSource})`}}
    <div className="App" >
      <Navbar signOut={signOut} user={attributes} setTrigger={setView}/>
      <ViewShorthandPopup trigger={viewPopupVisible} setTrigger={setView} shorthandList={shorthandList} setCreate={setCreatePopup}></ViewShorthandPopup>
      <CreateShorthandPopup trigger={createPopupvisible} setTrigger={setCreatePopup} user={attributes}></CreateShorthandPopup>
      <div className="Container" style={{width:'100%'}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/examination/:id" element={<Examination user={attributes} shorthand={shorthandMap}/>} />
          <Route path="/exams/:id" element={<ExamRecords />} />
          <Route path= "/intake/:id" element={<IntakeForm />} />
          <Route path= "/summary/:id" element={<SummaryForm />} />
        </Routes>
      </div>
    </div>

  );
}
  
export default withAuthenticator(App);
// export default App;
