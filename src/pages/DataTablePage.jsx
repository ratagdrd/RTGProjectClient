import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./../css/AdminPages.css";
import Header from "../FuncComp/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function DataTablePage() {
    const Logo = "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/footer/logo.png";
    const [selectedTable, setSelectedTable] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;
    const tableNames = ["Spot", "Activity", "QuestionForActivity"];
    const txtToHeader = "מערכת ניהול";
    const theme = createTheme({ direction: "rtl" });

    const cacheRtl = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    });

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
        <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
        <div className="outer-container-admin">
            <nav className="navbar navbar-fixed-top">
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo"  style={{ width: "60px" }}/>
                </div>
                <div className="navbar-header">
                <Header textToHeader={txtToHeader}></Header>
                </div>
                <FormControl>
                    <Select
                    className='selectTable'
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
            </nav>
            <div className="container">
                {selectedTable && tableData.length > 0 && (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {Object.keys(tableData[0]).map((field, index) => (
                                        <th key={field} style={{ order: selectedTable === "Activity" ? (Object.keys(tableData[0]).length - index) : index }}>
                                            {field}
                                        </th>
                                    ))}
                                    {selectedTable === "Activity" && <th>Average Rate</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.keys(row).map((field, index) => (
                                            <td key={field} style={{ order: selectedTable === "Activity" ? (Object.keys(tableData[0]).length - index) : index }}>
                                                {row[field]}
                                            </td>
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
        </div>
        </ThemeProvider>
        </CacheProvider>
    );
}
