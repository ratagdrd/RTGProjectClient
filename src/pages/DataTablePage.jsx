import React, { useState, useEffect, useRef } from "react";
import { Table, Pagination } from "react-bootstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import "./../css/AdminPages.css";
import Header from "../FuncComp/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function DataTablePage() {
  const Logo =
    "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/footer/logo.png";
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editFormData, setEditFormData] = useState({});
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isQuestionEditMode, setIsQuestionEditMode] = useState(false);
  const [questionEditIndex, setQuestionEditIndex] = useState(null);
  const [questionEditFormData, setQuestionEditFormData] = useState({});
  const rowsPerPage = 20;
  const tableNames = ["Activity", "Site", "Group"];
  const txtToHeader = "מערכת ניהול";
  const knownEmojis = ["😄", "😀", "🐨", "🐶", "🐼", "👨‍👩‍👧‍👦", "😎"];
  const theme = createTheme({ direction: "rtl" });
  const editFormRef = useRef(null);
  const questionsTableRef = useRef(null);

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  useEffect(() => {
    document.body.className = "adminPage";
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
    setCurrentPage(1);
    setIsEditClicked(false);
    setSelectedRow(null);
    setIsQuestionEditMode(false);

    if (event.target.value) {
      fetch(`https://localhost:7052/api/${event.target.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
          }
          return res.json();
        })
        .then((activityResult) => {
          if (event.target.value === "Activity") {
            const activityCodes = activityResult.map(
              (activity) => activity.activitycode
            );
            const fetchActivityStatusPromises = activityCodes.map((code) => {
              return fetch(
                `https://localhost:7052/api/ActivityStatus?activitycode=${code}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                  },
                }
              )
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(
                      `Error fetching ActivityStatus data for activity code ${code}: ${res.statusText}`
                    );
                  }
                  return res.json();
                })
                .then((statusResult) => ({
                  activitycode: code,
                  ...statusResult,
                }))
                .catch((error) => {
                  console.error(
                    `Error fetching ActivityStatus data for activity code ${code}: ${error}`
                  );
                  return {
                    activitycode: code,
                    isAccessible: false,
                    isBlocked: false,
                  };
                });
            });

            Promise.all(fetchActivityStatusPromises)
              .then((activityStatusResults) => {
                const mergedData = activityResult.map((activity) => {
                  const status = activityStatusResults.find(
                    (status) => status.activitycode === activity.activitycode
                  );
                  return {
                    ...activity,
                    isAccessible: status ? status.isAccessible : false,
                    isBlocked: status ? status.isBlocked : false,
                  };
                });
                setTableData(mergedData);
              })
              .catch((error) => {
                console.error(`Error fetching ActivityStatus data: ${error}`);
                setTableData(activityResult);
              });
          } else {
            setTableData(activityResult);
          }
        })
        .catch((error) => {
          console.error(`Error fetching data for table ${event.target.value}:`, error);
          setTableData([]);
        });
    }
  };

  const handleDeleteGroup = (groupCode) => {
    fetch(`https://localhost:7052/api/Group/${groupCode}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting group: ${response.statusText}`);
        }
        console.log(`Deleted group with id ${groupCode}`);
        return fetchGroups();
      })
      .catch((error) => {
        console.error("Error deleting group:", error);
      });
  };

  const fetchGroups = () => {
    fetch(`https://localhost:7052/api/Group`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching groups: ${res.statusText}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          setTableData(result);
        },
        (error) => {
          console.error("Error fetching groups:", error);
        }
      );
  };

  const handleEdit = (id) => {
    const rowData = tableData[id];
  
    // Check if selectedTable is "Activity" before setting editFormData
    if (selectedTable === "Activity") {
      const { isAccessible, isBlocked, ...formData } = rowData;
      setEditFormData(formData);
    } else {
      setEditFormData(rowData);
    }
  
    setIsEditClicked(true);
  
    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isQuestionEditMode) {
      setQuestionEditFormData({ ...questionEditFormData, [name]: value });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if selectedTable is "Activity"
    if (selectedTable === "Activity") {
      // Prepare update data
      const updateData = {
        activityCode: editFormData.activitycode,
        activityname: editFormData.activityname,
        instruction: editFormData.instruction
      };
  console.log(updateData);
      // Send PUT request to update activity
      fetch(`https://localhost:7052/api/Activity?activityCode=${updateData.activityCode}&activityname=${updateData.activityname}&instruction=${updateData.instruction}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error updating activity: ${response.statusText}`);
          }
          console.log(`Activity ${updateData.activityCode} updated successfully.`);
          // Handle success response as needed
        })
        .then(() => {
          const mockEvent = {
            target: {
              value: "Activity" 
            }
          };
          handleTableSelect(mockEvent);            })
        .catch((error) => {
          console.error("Error updating activity:", error);
        });
    } else {
      console.warn("Cannot submit form: Selected table is not 'Activity'");
    }


  };
  

  const calculateAverageRate = (row) => {
    const averageRate = row.rate / row.numOfRates;
    return averageRate.toFixed(2);
  };

  const handleEditContent = (activityCode, rowIndex) => {
    fetch(`https://localhost:7052/api/QuestionForActivity/${activityCode}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching questions: ${res.statusText}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          setQuestionsData(result);
          setSelectedRow(rowIndex);
          setIsQuestionEditMode(false);
          setIsEditClicked(false);
        },
        (error) => {
          console.error(`Error fetching questions for activity ${activityCode}:`, error);
        }
      );

    if (questionsTableRef.current) {
      questionsTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuestionEdit = (index) => {
    setQuestionEditIndex(index);
    setQuestionEditFormData(questionsData[index]);
    setIsQuestionEditMode(true);
    setIsEditClicked(true);

    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const currentPageData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCheckboxChange = (field, index) => {
    const confirmed = window.confirm("האם את/ה בטוח/ה?");
    if (confirmed) {
      const activitycode = tableData[index].activitycode;  // Access the activitycode from the original tableData
      const updatedData = tableData.map((row, i) =>
        i === index ? { ...row, [field]: !row[field] } : row
      );
  
      const isAccessible = updatedData[index].isAccessible;
      const isBlocked = updatedData[index].isBlocked;
  
      console.log(`Sending request to update activity status for ${activitycode}`);
      fetch(`https://localhost:7052/api/ActivityStatus?activityCode=${activitycode}&isAccessible=${isAccessible}&isBlocked=${isBlocked}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error updating status: ${response.statusText}`);
          }
          return response.json();
        })
        .then((result) => {
          console.log("Status updated successfully:", result);
          setTableData(updatedData);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
        });
    }
  };
  
  

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="outer-container-admin" style={{ direction: 'rtl' }}>
          <nav className="navbar navbar-fixed-top">
            <div className="navbar-logo">
              <img src={Logo} alt="Logo" style={{ width: "60px" }} />
            </div>
            <div className="navbar-header">
              <Header textToHeader={txtToHeader}></Header>
            </div>
            <FormControl>
              <Select
                className="selectTable"
                labelId="table-select-label"
                value={selectedTable}
                onChange={handleTableSelect}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
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
                      {Object.keys(tableData[0]).map((field) => {
                        if (field === "statusId") return null;
                        return (
                          <th key={field}>
                            {field === "isAccessible" || field === "isBlocked" ? (
                              field // Render text instead of checkbox
                            ) : (
                              field
                            )}
                          </th>
                        );
                      })}
                      {selectedTable === "Activity" && <th>Average Rate</th>}
                      {selectedTable === "Activity" && <th>Edit Content</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((row, index) => (
                      <tr key={index}>
                        {Object.keys(row).map((field) => {
                          if (field === "statusId") return null;
                          return (
                            <td key={field}>
                              {field === "photo" && selectedTable === "Group" ? (
                                knownEmojis.includes(row[field]) ? (
                                  row[field]
                                ) : (
                                  <img
                                    src={`https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/${row[field]}`}
                                    alt="No Photo or Emoji"
                                    style={{ width: "80px", height: "80px" }}
                                  />
                                )
                              ) : field === "isAccessible" &&
                                selectedTable === "Activity" ? (
                                <input
                                  type="checkbox"
                                  checked={row.isAccessible}
                                  onChange={() => handleCheckboxChange("isAccessible", index)}
                                />
                              ) : field === "isBlocked" &&
                                selectedTable === "Activity" ? (
                                <input
                                  type="checkbox"
                                  checked={row.isBlocked}
                                  onChange={() => handleCheckboxChange("isBlocked", index)}
                                />
                              ) : field === "activitycode" &&
                                selectedTable === "Activity" ? (
                                row.activitycode
                              ) : (
                                row[field]
                              )}
                            </td>
                          );
                        })}
                        {selectedTable === "Activity" && (
                          <>
                            <td>{calculateAverageRate(row)}</td>
                            <td>
                              {(row.activitycode === 1 ||
                                row.activitycode === 2) && (
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    handleEditContent(row.activitycode, index)
                                  }
                                >
                                  <ContentPasteIcon />
                                </IconButton>
                              )}
                            </td>
                          </>
                        )}
                        <td>
                          {selectedTable !== "Group" && (
                            <IconButton
                              color="info"
                              onClick={() => handleEdit(index)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          {selectedTable === "Group" && (
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDeleteGroup(row.groupCode)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Pagination>
                  <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
            {selectedRow !== null && (
              <div ref={questionsTableRef}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      {Object.keys(questionsData[0]).map((field, index) => (
                        <th key={index}>{field}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionsData.map((row, index) => (
                      <tr key={index}>
                        {Object.keys(row).map((field) => (
                          <td key={field}>{row[field]}</td>
                        ))}
                        <td>
                          <IconButton
                            color="info"
                            onClick={() => handleQuestionEdit(index)}
                          >
                            <EditIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {isQuestionEditMode && (
                  <div className="edit-form-container" ref={editFormRef}>
                    <form onSubmit={handleSubmit}>
                      {Object.keys(questionEditFormData).map((field, index, array) => (
                        <div key={index}>
                          <label>{field}</label>
                          <input
                            type="text"
                            name={field}
                            value={questionEditFormData[field]}
                            onChange={handleInputChange}
                            className="edit-input"
                            style={{ direction: "rtl" }}
                            disabled={
                              selectedTable === "Activity"
                                ? index === 0 ||
                                  index === array.length - 1 ||
                                  index === array.length - 2
                                : index === 0
                            }
                          />
                        </div>
                      ))}
                      <button type="submit" className="edit-submit-button">
                        ערוך
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
            {isEditClicked && !isQuestionEditMode && (
              <div className="edit-form-container" ref={editFormRef}>
                <form onSubmit={handleSubmit}>
                  {Object.keys(editFormData).map((field, index, array) => (
                    <div key={index}>
                      <label>{field}</label>
                      <input
                        type="text"
                        name={field}
                        value={editFormData[field]}
                        onChange={handleInputChange}
                        className="edit-input"
                        style={{ direction: "rtl" }}
                        disabled={
                          selectedTable === "Activity"
                            ? index === 0 ||
                              index === array.length - 1 ||
                              index === array.length - 2
                            : index === 0
                        }
                      />
                    </div>
                  ))}
                  <button type="submit" className="edit-submit-button">
                    ערוך
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
