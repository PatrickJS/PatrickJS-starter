import React from 'react';

import { Link } from "react-router-dom";

export default function Workspace() {
  return (
    <div>
      Your Workspace
      <Link to="/dashboard">Dashboard</Link>
    </div>
  )
}