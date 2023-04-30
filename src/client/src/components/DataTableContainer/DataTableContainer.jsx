import React, { useState, useEffect } from 'react';
import "./DataTableContainer.css"
import DataTable from "./DataTable/DataTable.jsx"
import { motion } from "framer-motion";

export default function DataTableContainer() {

  return (
    <div className='datatable'>
      <DataTable />
    </div>
  );
}
