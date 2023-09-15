import React from 'react'
import { useState } from 'react';
import trash from '../Images/trash.png';
import pen from '../Images/pen.png';
import confirm from '../Images/confirm.png';


export default function StickyNote({Title, Description, id, getFunction}) {
  
  let API_URL = 'https://64ff720bf8b9eeca9e2a26af.mockapi.io/Notes';

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [currentContentVisibility, setcurrentContentVisibility] = useState("visible")
  const [editingVisibility, seteditingVisibility] = useState("hidden")


  function deleteNote(id) {
    fetch(API_URL + `/${id}`, {
      method: 'DELETE',
    }).then(() => getFunction())
  }

  function updateNote(e, noteObj) {
    e.preventDefault()

    let updatedNote = 
    {
      ...noteObj,
      Title: newTitle,
      Description: newDescription,
    }

    fetch(`${API_URL}/${noteObj.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    }).then(() => getFunction())
  }



  return (
    <div className = "col-sm-4  mb-2 p-3 note-daddy">
        <div className = "note-container">
        <div className = "row">
          <div className = 'col-6'><img className = "btn-icon trash-icon" src = {trash} onClick = {() => deleteNote(id)}/></div>
          <div className = 'col-6'><img className = "btn-icon pen-icon" src = {pen} onClick = { () => {setcurrentContentVisibility("hidden"); seteditingVisibility("visible");}} /></div>
        </div>
          <div className = {`${currentContentVisibility} note-body`}>
              <h2 className = "note-title text-center top-margin pt-2">{Title}</h2>
              <p className = "note-description fs-3 p-4">{Description}</p>
          </div>

          <div className = {`${editingVisibility} note-body`}>
              <div className="form-group mt-3">
                  <input value={newTitle} onChange = {(e)=> setNewTitle(e.target.value)} type="text" className="no-border p-2 text-center" placeholder='New Title of Note'/>
              </div>
              
              <div className="form-group mt-3 mb-5 transparent edit-form">
                  <textarea value={newDescription} onChange = {(e)=> setNewDescription(e.target.value)} className="no-border p-2 transparent" rows="6" placeholder ="Update your note! It can be anything you want!"></textarea>
                  <img className = "confirm-icon mb-5" src = {confirm} onClick = {() => updateNote(id)}/>
              </div>
          </div>


          </div>
    </div>
  )
}
