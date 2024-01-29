import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Dashboard.css';
import { MenuItem, Select } from '@mui/material';
// import dashboardImg from '../../Images/dashboard.svg';
export const Dashboard = (props) => {
  const {
    allBooksData,
    getAllBooks,
  } = props;
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

  const [selectedAuthor, setSelectedAuthor] = useState('');
  const authors = Array.from(new Set(allBooksData.map(book => book.author)));

  const getDistribution = () => {
    const categoryCounts = {};
    allBooksData && allBooksData.length > 0 && allBooksData.forEach(book => {
      categoryCounts[book.category] = (categoryCounts[book.category] || 0) + 1;
    });
    return categoryCounts;
  };

  const pieData = {
    labels: Object.keys(getDistribution()),
    datasets: [{
      data: Object.values(getDistribution()),
      backgroundColor: [
        '#ea5545',
        '#ede15b',
        '#27aeef',
        '#00ffff',
        '#8be04e',
        '#8bd3c7',
      ],
      hoverOffset: 10,
    }]
  };

  const getBooksAddedPerDay = (books) => {
    const dateCounts = {};
    books.forEach(book => {
      const date = new Date(book.date).toLocaleDateString();
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    const sortedDates = Object.keys(dateCounts).sort((a, b) => new Date(a) - new Date(b));
    return {
      dates: sortedDates,
      counts: sortedDates.map(date => dateCounts[date]),
    };
  };

  const lineChartData = () => {
    const booksPerDay = getBooksAddedPerDay(allBooksData);

    return {
      labels: booksPerDay.dates,
      datasets: [
        {
          label: 'Books Added Per Day',
          data: booksPerDay.counts,
          fill: false,
          backgroundColor: '#e6d600',
          borderColor: '#e6d600',
          tension: 0.1
        }
      ]
    };
  };

  const getBooksPerCategoryForAuthor = () => {
    const filteredBooks = allBooksData && allBooksData.length > 0 && allBooksData.filter(book => book.author === selectedAuthor);
    const categoryCounts = {};

    filteredBooks && filteredBooks.length> 0 && filteredBooks.forEach(book => {
      categoryCounts[book.category] = (categoryCounts[book.category] || 0) + 1;
    });

    return {
      labels: Object.keys(categoryCounts),
      datasets: [{
        label: `Number of Books by ${selectedAuthor}`,
        data: Object.values(categoryCounts),
        backgroundColor: '#b33dc6',
        borderColor: '#b33dc6',
        borderWidth: 1
      }]
    };
  };


  const pieChartOptions = {
    plugins: {
      legend: {
        onClick: () => { },
      }
    },
  };
  const barChartOptions = {
    plugins: {
      legend: {
        onClick: () => { },
      }
    },
  };
  const lineChartOptions = {
    plugins: {
      legend: {
        onClick: () => { },
      }
    },
  };

  return (<>
    <div className="mastedDashboardContainer">
      <div className="masterChartContainer">
        <div className="pieChartDetails">
          <div className='chartHeadeer'>Category Distribution</div>
          <div className="chartContainer">
            <Pie data={pieData} options={pieChartOptions} />
          </div>
        </div>
        <div className="dividerDash">
          <hr />
        </div>
        <div className="barChartDetails">
          <div className="chartContainer">
            <Bar data={getBooksPerCategoryForAuthor()} options={barChartOptions} />
          </div>
          <div className='chartHeadeer barChartHeader'>
            <div>
              <Select
                className='selectAuthorSelec'
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                displayEmpty
                renderValue={selectedAuthor !== '' ? undefined : () => <em>Choose an Author</em>}
              >
                {authors.map(author => (
                  <MenuItem key={author} value={author}>{author}</MenuItem>
                ))}
              </Select>
            </div>
            <div>Books Per Author</div>
          </div>
        </div>
        <div className="dividerDash">
          <hr />
        </div>
        <div className="lineChartDetails">
          <div className='chartHeadeer'>Books Over Time</div>
          <div className="chartContainer">
            <Line data={lineChartData()} options={lineChartOptions} />
          </div>
        </div>
      </div>
    </div>
  </>)
};

export default Dashboard;