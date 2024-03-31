import { Grid, SelectField, Text, TextAreaField, Button } from '@aws-amplify/ui-react'
import React, { useEffect, useState } from 'react'
import "./IntakeForm.css"
import { DataStore, Predicates } from '@aws-amplify/datastore';
import {Patient} from '../models'
import { useParams } from 'react-router-dom';
import { Exam } from '../models'
import { Link } from 'react-router-dom'

function IntakeForm(props){
    const { id } = useParams()
    const[method, setMethod] = useState("")
    const[scRightplusmin, setscRightplusmin] = useState("")
    const[scRight, setscRight] = useState("")
    const[scLeft, setscLeft] = useState("")
    const[scLeftplusmin, setscLeftplusmin] = useState("")
    const[ccRightplusmin, setccRightplusmin] = useState("")
    const[ccLeft, setccLeft] = useState("")
    const[ccLeftplusmin, setccLeftplusmin] = useState("")
    const[ccRight, setccRight] = useState("")
    const[phscRightplusmin, setphscRightplusmin] = useState("")
    const[phscLeft, setphscLeft] = useState("")
    const[phscLeftplusmin, setphscLeftplusmin] = useState("")
    const[phscRight, setphscRight] = useState("")
    const[phccRightplusmin, setphccRightplusmin] = useState("")
    const[phccLeft, setphccLeft] = useState("")
    const[phccLeftplusmin, setphccLeftplusmin] = useState("")
    const[phccRight, setphccRight] = useState("")
    const[nearscRight, setnearscRight] = useState("")
    const[nearscLeft, setnearscLeft] = useState("")
    const[nearccRight, setnearccRight] = useState("")
    const[nearccLeft, setnearccLeft] = useState("")
    const[notes, setnotes] = useState("")
    const[lense, setLense] = useState("Glasses")
    const[exam, setExam] = useState()

    function updateIntakeForm(form){
            
        setMethod(form["methodKey"])
        setLense(form["lenseKey"])
        setccRightplusmin(form["ccRightplusminKey"])
        setscRight(form["scRightKey"])
        setscLeft(form["scLeftKey"])
        setscLeftplusmin(form["scLeftplusminKey"])
        setscRightplusmin(form["scRightplusminKey"])
        setccLeft(form["ccLeftKey"])
        setccLeftplusmin(form["ccLeftplusminKey"])
        setccRight(form["ccRightKey"])
        setphscRightplusmin(form["phscRightplusminKey"])
        setphscLeft(form["phscLeftKey"])
        setphscLeftplusmin(form["phscLeftplusminKey"])
        setphscRight(form["phscRightKey"])
        setphscRightplusmin(form["phscRightplusminKey"])
        setphccLeft(form["phccLeftKey"])
        setphccLeftplusmin(form["phccLeftplusminKey"])
        setphccRight(form["phccRightKey"])
        setnearscRight(form["nearscRightKey"])
        setnearscLeft(form["nearscLeftKey"])
        setnearccRight(form["nearccRightKey"])
        setnearccLeft(form["nearccLeftKey"])
        setnotes(form["notesKey"])     
    }

    
    useEffect(() => {
        // Fetch list of patients 
        // console.log(id)
        fetchIntakeForm(id) 
          .then(form => {
            updateIntakeForm(form)  
           
            console.log("In UseEffect")
            console.log(console.log(form))
          });
      }, []);

    async function fetchIntakeForm(id) {
        // API call to get patients
        try {
          const posts = await DataStore.query(Exam, id);
          setExam(posts)          
          console.log('Posts retrieved successfully!');
          console.log(posts)
          return posts.IntakeForm
          
        } catch (error) {
          console.log('Error retrieving posts', error);
        }
        return []
    }

    const json = {
        methodKey:method,
        lenseKey:lense,
        scRightplusminKey:scRightplusmin,
        scRightKey:scRight,
        scLeftKey:scLeft,
        scLeftplusminKey:scLeftplusmin,
        ccRightplusminKey:ccRightplusmin,
        ccLeftKey:ccLeft,
        ccLeftplusminKey:ccLeftplusmin,
        ccRightKey:ccRight,
        phscRightplusminKey:phscRightplusmin,
        phscLeftKey:phscLeft,
        phscLeftplusminKey:phscLeftplusmin,
        phscRightKey:phscRight,
        phccRightplusminKey:phccRightplusmin,
        phccLeftKey:phccLeft,
        phccLeftplusminKey:phccLeftplusmin,
        phccRightKey:phccRight,
        nearscRightKey:nearscRight,
        nearscLeftKey:nearscLeft,
        nearccRightKey:nearccRight,
        nearccLeftKey:nearccLeft,
        notesKey:notes
    }

    return(
        <div className='container'>
            <h3>Visual Acuity</h3>
            <Grid templateColumns={"1fr 10fr "}>
                <Text>Method</Text>
                <TextAreaField value={method} onChange={(e) => setMethod(e.target.value)}></TextAreaField>
            </Grid>

            <SelectField value={lense} onChange={(e) => setLense(e.target.value)}>
                <option value="Glasses">Glasses</option>
                <option value="Contacts">Contacts</option>
            </SelectField>

            <Grid templateColumns={"1fr 5fr 1fr 5fr 1fr"} columnGap={10} rowGap={10}>
                <Text>Distance</Text>
                <Text>Right</Text>
                <Text>+/-</Text>
                <Text>Left</Text>
                <Text>+/-</Text>

                <Text>sc</Text>
                <TextAreaField value={scRight} onChange={(e) => setscRight(e.target.value)}></TextAreaField>
                <TextAreaField value={scRightplusmin} onChange={(e) => setscRightplusmin(e.target.value)}></TextAreaField>
                <TextAreaField value={scLeft} onChange={(e) => setscLeft(e.target.value)}></TextAreaField>
                <TextAreaField value={scLeftplusmin} onChange={(e) => setscLeftplusmin(e.target.value)}></TextAreaField>

                <Text>cc</Text>
                <TextAreaField value={ccRight} onChange={(e) => setccRight(e.target.value)}></TextAreaField>
                <TextAreaField value={ccRightplusmin} onChange={(e) => setccRightplusmin(e.target.value)}></TextAreaField>
                <TextAreaField value={ccLeft} onChange={(e) => setccLeft(e.target.value)}></TextAreaField>
                <TextAreaField value={ccLeftplusmin} onChange={(e) => setccLeftplusmin(e.target.value)}></TextAreaField>

                <Text>ph sc</Text>
                <TextAreaField value={phscRight} onChange={(e) => setphscRight(e.target.value)}></TextAreaField>
                <TextAreaField value={phscRightplusmin} onChange={(e) => setphscRightplusmin(e.target.value)}></TextAreaField>
                <TextAreaField value={phscLeft} onChange={(e) => setphscLeft(e.target.value)}></TextAreaField>
                <TextAreaField value={phscLeftplusmin} onChange={(e) => setphscLeftplusmin(e.target.value)}></TextAreaField>

                <Text>ph cc</Text>
                <TextAreaField value={phccRight} onChange={(e) => setphccRight(e.target.value)}></TextAreaField>
                <TextAreaField value={phccRightplusmin} onChange={(e) => setphccRightplusmin(e.target.value)}></TextAreaField>
                <TextAreaField value={phccLeft} onChange={(e) => setphccLeft(e.target.value)}></TextAreaField>
                <TextAreaField value={phccLeftplusmin} onChange={(e) => setphccLeftplusmin(e.target.value)}></TextAreaField>

                <Text columnSpan={5}>Near</Text>

                <Text>sc</Text>
                <TextAreaField columnSpan={2} value={nearscRight} onChange={(e) => setnearscRight(e.target.value)}></TextAreaField>
                <TextAreaField columnSpan={2} value={nearscLeft} onChange={(e) => setnearscLeft(e.target.value)}></TextAreaField>

                <Text>cc</Text>
                <TextAreaField columnSpan={2} value={nearccRight} onChange={(e) => setnearccRight(e.target.value)}></TextAreaField>
                <TextAreaField columnSpan={2} value={nearccLeft} onChange={(e) => setnearccLeft(e.target.value)}></TextAreaField>
            
                <Text columnSpan={5}></Text>
                <Text>Notes</Text>
                <Text columnSpan={4}></Text>
                <TextAreaField columnSpan={5} rowSpan={2} value={notes} onChange={(e) => setnotes(e.target.value)}></TextAreaField>
                <Text columnSpan={4}></Text>

                <Link to={"/examination/"+id}>
                    <Button onClick={async () => {
                        console.log("SAVED")
                        console.log(JSON.stringify(json))
                        const updateExam = await DataStore.save(
                            Exam.copyOf(exam, updated => {
                                updated.IntakeForm = JSON.stringify(json)
                            })
                        )
                        }}                    
                    >Done</Button>
                </Link>
            </Grid>
        </div>
    )
}
export default IntakeForm