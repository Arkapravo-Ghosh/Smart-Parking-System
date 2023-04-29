import React, { useState, useEffect } from 'react';
import "./DataTableContainer.css"
import DataTable from "./DataTable/DataTable.jsx"

export default function Body() {

  return (
    <div className='datatable'>
      <DataTable />
    </div>
  );
}
