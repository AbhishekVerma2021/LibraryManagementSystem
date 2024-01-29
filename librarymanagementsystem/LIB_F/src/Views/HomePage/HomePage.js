import React, { useEffect, useState } from 'react';
import './HomePage.css';
import BookCard from './BookCard';
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';

const HomePage = (props) => {
  const {
    getAllBooks,
    allBooksData
  } = props;
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [authorName, setAuthorName] = useState('');
  const [titleName, setTitleName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [selectedBooksData, setSelectedBooksData] = useState([]);
  const getBooksDataFromRedux = async () => {
    try {
      await getAllBooks();
    }
    catch (err) {
      alert('Something went wrong!!');
    };
  };
  useEffect(() => {
    getBooksDataFromRedux();
  }, []);

  useEffect(() => {
    setSelectedBooksData(allBooksData);
    setSelectedFilter('all');
  }, [allBooksData]);

  const handleFilterInputField = () => {
    switch (selectedFilter) {
      case 'authorName': {
        return (<>
          <TextField
            name="authorName"
            label="Enter Book Author's Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            variant="outlined"
            required
          />
        </>);
      };
      case 'titleName': {
        return (<>
          <TextField
            name="titleName"
            label="Enter Book Title"
            value={titleName}
            onChange={(e) => setTitleName(e.target.value)}
            variant="outlined"
            required
          />
        </>);
      };
      case 'category': {
        return (<>
          <TextField
            name="editedCategory"
            select
            label="Category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            helperText="Please select the book category"
            variant="outlined"
            required
          >
            {['Comic', 'Fiction', 'Novel', 'Mystery', 'Narrative', 'SciFi'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </>);
      };
    }
  }

  const applyFilter = () => {
    let filteredData = [];
    // console.log(allBooksData[0].author.toLowerCase().includes(authorName.toLowerCase()))
    switch (selectedFilter) {
      case 'authorName': {
        filteredData = allBooksData.filter((book) => book.author.toLowerCase().includes(authorName.toLowerCase()));
      }
      case 'titleName': {
        filteredData = allBooksData.filter((book) => book.title.toLowerCase().includes(titleName.toLowerCase()));
      };
      case 'category': {
        filteredData = allBooksData.filter((book) => book.category.toLowerCase().includes(categoryName.toLowerCase()))
      };
    }
    setSelectedBooksData(filteredData);
  };


  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  const error = selectedFilter === 'all';
  return (<>
    <div className="masterHomePageWithFilter">
      <div className="filtersContainer">
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Filter Type:</FormLabel>
          <RadioGroup
            row
            aria-label="option"
            name="row-radio-buttons-group"
            value={selectedFilter}
            onChange={handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="authorName" control={<Radio />} label="Author Name" />
            <FormControlLabel value="titleName" control={<Radio />} label="Title Name" />
            <FormControlLabel value="category" control={<Radio />} label="Category" />
          </RadioGroup>
        </FormControl>
        {selectedFilter !== 'all' && handleFilterInputField()}
        <Tooltip title={error ? 'Enter something in search section!!' : 'Click to search books!!'}>
          <Button disabled={error} onClick={() => applyFilter()}>FILTER</Button>
        </Tooltip>
      </div>
      <div className="homePageMasterContainer">
        {selectedBooksData && selectedBooksData.length > 0 && selectedBooksData.map((book) => {
          return <BookCard book={book} />;
        })}
      </div>
    </div>
  </>);
};

export default HomePage;