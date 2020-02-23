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
        props.filePaths.length > 0 && (
          <Link to="/dashboard">Dashboard</Link>
        )
      }
      <div>
        <button onClick={() => {
          send({event: 'get-dir'});
        }}>open dir</button>
      </div>
      
    </div>
  )
}