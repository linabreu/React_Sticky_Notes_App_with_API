import React, { useEffect } from 'react';
import { useState } from 'react';
import StickyNote from './StickyNote';
import create from '../Images/create.png'

export default function InputForm() {



  let API_URL = 'https://64ff720bf8b9eeca9e2a26af.mockapi.io/Notes';

  const [notes, setNotes] = useState([])
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  async function getData () {
    const res = await fetch(API_URL)
    const data = await res.json()

    setNotes(data)
  }

  useEffect(()=> {
    setNewTitle("")
    setNewDescription("")
  },[notes])

    useEffect(()=> {
      getData()
    },[])

   const getNotes = () => {
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => {
        setNotes(data)
        console.log(data)
        return data
      })
  }


  const createNote = (e)=> {
    e.preventDefault()
    console.log({newTitle})
    console.log({newDescription})
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Title: newTitle,
        Description: newDescription,
      }),
    }).then(getNotes)
  }

  function deleteNote(id) {
    fetch(API_URL + `/${id}`, {
      method: 'DELETE',
    }).then(getNotes)
  }

  



  return (
  <div className = "container">
      <div className="row gx-3">
          <div className = "col-sm-4"></div>
          <div className = "col-sm-4">
          <form className = 'note-form mt-5 p-3'>
              <div className="form-group mt-3">
                  <input value={newTitle} onChange = {(e)=> setNewTitle(e.target.value)} type="text" className="no-border p-2 text-center" placeholder='Title of Note'/>
              </div>
              <div className="form-group mt-3 mb-5 transparent">
                  <textarea value={newDescription} onChange = {(e)=> setNewDescription(e.target.value)} className="no-border p-2 transparent" rows="8" placeholder ="Write yourself a note! It can be anything you want!"></textarea>
              </div>
              <div className="row">
                <div className = "col-4"></div>
                <div className = "col-4">
                <img className = "create-icon" src = {create} onClick={(e) => createNote(e)}/>
                  {/*<button className="submit-btn" onClick={(e) => createNote(e)}>Create Note</button>*/}
                </div>
                <div className = "col-4"></div>
              </div>
          </form>
          </div>
          <div className = "col-sm-4"></div>
      </div>

    <div className="row gy-5 gx-3 mt-5">
      {notes.map((note, index) => <StickyNote getFunction = {getNotes} Title = {note.Title} Description = {note.Description} id = {note.id} key = {index}/>)}
    </div>
  </div>
  )
}
