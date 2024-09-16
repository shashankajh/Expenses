import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

export default function Sub() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [subjectsPerPage, setSubjectsPerPage] = useState(() => {
    const storedSubjectsPerPage = localStorage.getItem('subjectsPerPage');
    const validPerPageValues = [5, 10, 15, 20];
    return storedSubjectsPerPage && validPerPageValues.includes(parseInt(storedSubjectsPerPage, 10))
      ? parseInt(storedSubjectsPerPage, 10)
      : 10;
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [currentSubject, setCurrentSubject] = useState({ id: '', subject_name: '', subject_code: '' });

  useEffect(() => {
    loadSubjects();
  }, [currentPage, subjectsPerPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadSubjects();
    }, 900);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const result = await axios.get('http://localhost:8080/subject', {
        params: {
          searchTerm,
          page: currentPage,
          size: subjectsPerPage,
        },
      });
      console.log('Subjects fetched:', result.data);
      setSubjects(result.data.content);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
    setLoading(false);
  };

  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setSubjectsPerPage(newPerPage);
    setCurrentPage(0);
    localStorage.setItem('subjectsPerPage', newPerPage);
  };

  const handleDeleteSubject = async (subjectId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this subject?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/subject/${subjectId}`);
        setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== subjectId));
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handleDialogOpen = (subject = { id: '', subject_name: '', subject_code: '' }, title) => {
    setCurrentSubject(subject);
    setDialogTitle(title);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setCurrentSubject({ id: '', subject_name: '', subject_code: '' });
  };

  const handleSaveSubject = async () => {
    try {
      if (currentSubject.id) {
        await axios.put(`http://localhost:8080/subject/${currentSubject.id}`, currentSubject);
      } else {
        await axios.post('http://localhost:8080/subject', currentSubject);
      }
      handleDialogClose();
      loadSubjects();
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  };

  return (
    <div>
      <h3 className="enrolls-heading">List of Subjects Available for Enrollment</h3>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <div className="border rounded p-4 m-2 shadow">
          <div className="search-bar mb-2 p-1">
            <TextField
              label="Search by Subject Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTermChange}
              fullWidth
            />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Add />}
              onClick={() => handleDialogOpen({}, 'Add Subject')}
              style={{ marginLeft: '10px' }}
            >
              Add Subject
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SI.NO</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Subject Code</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="4" align="center">
                      No subjects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  subjects.map((subject, index) => (
                    <TableRow key={subject.id}>
                      <TableCell>{index + currentPage * subjectsPerPage + 1}</TableCell>
                      <TableCell>{subject.subject_name}</TableCell>
                      <TableCell>{subject.subject_code}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDialogOpen(subject, 'Edit Subject')}><Edit /></IconButton>
                        <IconButton onClick={() => handleDeleteSubject(subject.id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalPages * subjectsPerPage}
            page={currentPage}
            onPageChange={(event, newPage) => setCurrentPage(newPage)}
            rowsPerPage={subjectsPerPage}
            onRowsPerPageChange={handlePerPageChange}
            rowsPerPageOptions={[5, 10, 15, 20]}
          />
        </div>
      )}

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the subject details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentSubject.subject_name}
            onChange={(e) => setCurrentSubject({ ...currentSubject, subject_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Subject Code"
            type="text"
            fullWidth
            variant="outlined"
            value={currentSubject.subject_code}
            onChange={(e) => setCurrentSubject({ ...currentSubject, subject_code: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSubject} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
