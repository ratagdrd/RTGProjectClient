import React, { useState, useEffect } from 'react';
import { Datagrid, TextField, EditButton } from 'react-admin';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function DataTablePage() {
    const [selectedTable, setSelectedTable] = useState('');
    const [tableData, setTableData] = useState([]);
    const tableNames = ["Spot", "Activity", "QuestionForActivity"];

    useEffect(() => {
        // Add the 'employeePage' class to the body element when the component mounts
        document.body.className = 'adminPage';

        // Remove the 'employeePage' class from the body element when the component unmounts
        return () => {
            document.body.className = '';
        };
    }, []);


    const handleTableSelect = (event) => {
        setSelectedTable(event.target.value);
        if (event.target.value) {
            // Fetch table data when a table is selected
            fetch(`https://localhost:7052/api/${event.target.value}`, {
                method: "GET",
                headers: new Headers({
                  "Content-Type": "application/json; charset=UTF-8",
                  Accept: "application/json; charset=UTF-8",
                }),
              })
                .then((res) => {
                  console.log("res=", res);
                  console.log("res.status", res.status);
                  console.log("res.ok", res.ok);
                  return res.json();
                })
                .then(
                  (result) => {
                    console.log("fetch result: ", result);
                    setTableData(result);
                  },
                  (error) => {
                    console.error(`Error fetching data for table ${event.target.value}:`, error);
                  }
                );
            }
        }

    return (
        <div>
                <Select
                    labelId="table-select-label"
                    value={selectedTable}
                    onChange={handleTableSelect}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}  >
                    <MenuItem value="">בחר טבלה </MenuItem>
                    {tableNames.map((tableName) => (
                        <MenuItem key={tableName} value={tableName}>
                            {tableName}
                        </MenuItem>
                    ))}
                </Select>
            {selectedTable && (
                <Datagrid data={tableData}>
                    {/* Render table columns dynamically */}
                    {Object.keys(tableData[0]).map(field => (
                        <TextField key={field} source={field} />
                    ))}
                    <EditButton />
                </Datagrid>
            )}
        </div>
    );
}
