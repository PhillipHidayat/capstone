import { Grid, SelectField, Text, TextAreaField, Button } from '@aws-amplify/ui-react'
import React, { useEffect, useState } from 'react'
import "./IntakeForm.css"
import { DataStore, Predicates } from '@aws-amplify/datastore';
import {Patient} from '../models'
import { useParams } from 'react-router-dom';
import { Exam } from '../models'
import { Link } from 'react-router-dom'

function SummaryForm(props){
    const { id } = useParams()
    const[notes, setnotes] = useState("")
    const[exam, setExam] = useState()

    function updateSummaryForm(form){
        setnotes(form["notesKey"])     
    }

    
    useEffect(() => {
        fetchSummaryForm(id) 
          .then(form => {
            updateSummaryForm(form)  
          });
      }, []);

    async function fetchSummaryForm(id) {
        // API call to get patients
        try {
          const posts = await DataStore.query(Exam, id);
          setExam(posts)          
          return posts.Summary
        } catch (error) {
          console.log('Error retrieving posts', error);
        }
        return []
    }

    const json = {
        notesKey:notes
    }

    return(
        <div className='container'>
            <h3>Summary</h3>
            <Grid templateColumns={"1fr 5fr 1fr 5fr 1fr"} columnGap={10} rowGap={10}>
                <Text columnSpan={5}></Text>
                <Text>Final Notes</Text>
                <Text columnSpan={4}></Text>
                <TextAreaField columnSpan={5} rowSpan={2} value={notes} onChange={(e) => setnotes(e.target.value)}></TextAreaField>
                <Text columnSpan={4}></Text>

                <Link to={"/records"}>
                    <Button onClick={async () => {
                        const updateExam = await DataStore.save(
                            Exam.copyOf(exam, updated => {
                                updated.Summary = JSON.stringify(json)
                            })
                        )
                        }}                    
                    >Done</Button>
                </Link>
            </Grid>
        </div>
    )
}
export default SummaryForm