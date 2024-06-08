import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./../css/AdminPages.css";

export default function DataTablePage() {
    const [selectedTable, setSelectedTable] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;
    const tableNames = ["Spot", "Activity", "QuestionForActivity"];

    useEffect(() => {
        document.body.className = 'adminPage';
        return () => {
            document.body.className = '';
        };
    }, []);

    const handleTableSelect = (event) => {
        setSelectedTable(event.target.value);
        if (event.target.value) {
            fetch(`https://localhost:7052/api/${event.target.value}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Error fetching data: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(
                    (result) => {
                        setTableData(result);
                    },
                    (error) => {
                        console.error(`Error fetching data for table ${event.target.value}:`, error);
                    }
                );
        }
    };

    const handleDelete = (id) => {
        // Add delete functionality
        console.log(`Deleting row with id ${id}`);
    };

    const handleEdit = (id) => {
        // Add edit functionality
        console.log(`Editing row with id ${id}`);
    };

    const calculateAverageRate = (row) => {
        const averageRate = row.rate / row.numOfRates;
        return averageRate.toFixed(2);
    };

    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const currentPageData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="container">
            <FormControl>
                <Select
                    labelId="table-select-label"
                    value={selectedTable}
                    onChange={handleTableSelect}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">בחר טבלה</MenuItem>
                    {tableNames.map((tableName) => (
                        <MenuItem key={tableName} value={tableName}>
                            {tableName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedTable && tableData.length > 0 && (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {Object.keys(tableData[0]).map(field => (
                                    <th key={field}>{field}</th>
                                ))}
                                {selectedTable === "Activity" && <th>Average Rate</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((row, index) => (
                                <tr key={index}>
                                    {Object.keys(row).map(field => (
                                        <td key={field}>{row[field]}</td>
                                    ))}
                                    {selectedTable === "Activity" && (
                                        <td>{calculateAverageRate(row)}</td>
                                    )}
                                    <td>
                                        <IconButton color="info" onClick={() => handleEdit(row.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            )}
        </div>
    );
}
