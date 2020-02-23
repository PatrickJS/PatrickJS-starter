import React from 'react';

import { Link } from "react-router-dom";
import { send } from '../services/local-api'

export default function Workspace(props) {
  return (
    <div>
      Your Workspace
      {props.filePaths.map((path, i) => {
        return <div key={path+i}>path: {path}</div>
      })}
      {
        props.filePaths.length && (
          <Link to="/dashboard">Dashboard</Link>
        )
      }
      <button onClick={() => {
        send('get-dir');
      }}>open dir</button>
      
    </div>
  )
}