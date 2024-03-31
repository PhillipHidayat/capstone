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
  


  return (
    //style={{backgroundImage: `url(${imgSource})`}}
    <div className="App" >
      <Navbar signOut={signOut} user={attributes}/>
      <div className="Container" style={{width:'100%'}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/examination/:id" element={<Examination />} />
          <Route path="/exams/:id" element={<ExamRecords />} />
          <Route path= "/intake/:id" element={<IntakeForm />} />
        </Routes>
      </div>
    </div>

  );
}
  
export default withAuthenticator(App);
// export default App;
