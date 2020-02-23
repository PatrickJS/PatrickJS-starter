import React from 'react';

import { Link } from "react-router-dom";
import { send } from '../services/local-api'

export default function Workspace(props) {
  return (
    <div>
      Your Workspace
      {props.filePaths.map((path, i) => {
        const paths = path.split('/');
        const projectName = paths[paths.length-1]
        return (
          <div key={path+i}>
            <div>path: {path}</div>
            <Link
              to={"/dashboard/" + projectName}
              onClick={
                () => {
                  send({event: 'set-project', payload: projectName})
                }
              }
            >{projectName} Dashboard</Link>
          </div>
        )
      })}
      <div>
        <button onClick={() => {
          send({event: 'get-dir'});
        }}>open dir</button>
      </div>
      
    </div>
  )
}