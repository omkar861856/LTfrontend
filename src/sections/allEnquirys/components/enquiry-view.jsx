import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  List,
  Grid,
  Button,
  Select,
  ListItem,
  MenuItem,
  TextField,
  Pagination,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  ListItemText,
} from '@mui/material';

import Account from 'src/_mock/account';
import { enquiry_api } from 'src/services/userapi';

const pageStyle = {
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'scroll',
};

const historyStyle = {
  mt: 2,
  bgcolor: 'background.paper',
  boxShadow: 2,
  p: 1,
  height: '100%',
};

function HistoryForm({ type, contactData, user, setHistory, setComment, setType, history }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const url = `${enquiry_api}/enquiry/touch`;
    const payload = {
      comment: data.comment,
      type: data.type,
      email: contactData.email,
      contact: contactData.contact,
      time: new Date(),
      touchedBy: user.name,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(url, payload, config);
      if (response) {
        alert('got comment response');
        setHistory([...history, response.data.touchHistory]);
        setComment('');
        setType('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const onSubmit = (data, e) => {
    formSubmit(data);
    console.log(data);
    e.target.reset();
  };

  // console.log(watch("comment")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form style={{ border: '2px solid black' }} onSubmit={handleSubmit(onSubmit)}>
      <select
        style={{ border: '2px solid black' }}
        value={type}
        {...register('type', { required: true })}
      >
        <option value="phone">Phone</option>
        <option value="email">Email</option>
      </select>
      {errors.gender && <span style={{ color: 'red' }}>This field is required</span>}
      <br />

      {/* register your input into the hook by invoking the "register" function */}
      <textarea
        style={{ border: '2px solid black' }}
        placeholder="Comment"
        {...register('comment', { required: true })}
      />
      {errors.comment && <span style={{ color: 'red' }}>Comment field is required</span>}
      <br />

      <input
        style={{
          border: '2px solid black',
          padding: '2px',
          backgroundColor: 'purple',
          borderRadius: '2px',
          color: 'white',
        }}
        type="submit"
      />
    </form>
  );
}

const SingleEnquiryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [history, setHistory] = useState([]);
  const [type, setType] = useState('');
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const { user } = Account();

  const { enquirys } = useSelector((state) => state.enquirys);

  const contactData = enquirys.find((enq) => enq.id === id);

  const onSubmit = (data) => console.log(data);

  const handleEmail = (email) => {
    setType('email');
    window.location.href = `mailto:${email}`;
  };

  const handlePhone = (phone) => {
    setType('phone');
    window.location.href = `tel:${phone}`;
  };

  const handleAddReminder = () => {
    if (newReminder && reminderDate) {
      setReminders([...reminders, { text: newReminder, date: new Date(reminderDate) }]);
      setNewReminder('');
      setReminderDate('');
    }
  };

  const filterReminders = (filteredReminders) => {
    const now = new Date();
    return filteredReminders.filter((reminder) => {
      if (filter === 'expired') {
        return new Date(reminder.date) < now;
      }
      if (filter === 'upcoming') {
        return new Date(reminder.date) >= now;
      }
      return true;
    });
  };

  const sortReminders = (sortedReminders) =>
    sortedReminders.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const sortedFilteredReminders = sortReminders(filterReminders(reminders));

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const now = new Date();
    if (selectedDate < now) {
      return;
    }
    setReminderDate(e.target.value);
  };

  // HISTORY pagination logic
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const itemsPerPage = 5;

  if (!contactData) {
    return <div>Loading...</div>;
  }

  const historyItems = contactData.touchHistory;
  const totalPages = Math.ceil(historyItems.length / itemsPerPage);

  const paginatedHistoryItems = historyItems.slice(
    (currentHistoryPage - 1) * itemsPerPage,
    currentHistoryPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentHistoryPage(value);
  };

  return (
    <Box sx={pageStyle}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" component="h2">
          Details
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Name:</strong> {contactData.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1" display="flex" alignItems="center">
            <strong>Email:</strong> {contactData.email}
            <IconButton onClick={() => handleEmail(contactData.email)}>
              <EmailIcon />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1" display="flex" alignItems="center">
            <strong>Phone:</strong> {contactData.contact}
            <IconButton onClick={() => handlePhone(contactData.contact)}>
              <PhoneIcon />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Location:</strong> {contactData.location}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Is Fresher:</strong> {contactData.isFresher ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Alt. Contact:</strong> {contactData.altContact}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Preferred Location:</strong> {contactData.preferredLocation}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Qualification:</strong> {contactData.qualification}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Created On:</strong> {new Date(contactData.creationDate).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Course:</strong> {contactData.course}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Is Employed:</strong> {contactData.isEmployed ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Organisation:</strong> {contactData.organisation}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>About Us:</strong> {contactData.aboutUs}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>Preferred Batch:</strong> {contactData.preferredBatch}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body1">
            <strong>ID:</strong> {contactData.id}
          </Typography>
        </Grid>
      </Grid>

      <HistoryForm
        type={type}
        contactData={contactData}
        setHistory={setHistory}
        setType={setType}
        history={history}
        setComment={setComment}
        user={user}
      />

      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
        Touch History
      </Typography>

      <Box sx={historyStyle}>
        <List>
          {paginatedHistoryItems.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${entry.comment}`}
                secondary={
                  <div>
                    {entry.type === 'email' ? <EmailIcon /> : <PhoneIcon />}
                    {entry.touchedBy} | Time: {new Date(entry.time).toLocaleString()}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
        <Pagination count={totalPages} page={currentHistoryPage} onChange={handlePageChange} />
      </Box>

      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
        Set Reminder
      </Typography>

      <Box>
        <TextField
          id="new-reminder"
          label="New Reminder"
          fullWidth
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          id="reminder-date"
          label="Reminder Date"
          type="datetime-local"
          fullWidth
          value={reminderDate}
          onChange={handleDateChange}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddReminder}
          sx={{ mt: 2 }}
        >
          Add Reminder
        </Button>
      </Box>

      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
        Reminders
      </Typography>

      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <FormControl>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select labelId="filter-label" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={historyStyle}>
        <List>
          {sortedFilteredReminders.map((reminder, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={reminder.text}
                secondary={`Reminder Date: ${new Date(reminder.date).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

HistoryForm.propTypes = {
  type: PropTypes.string.isRequired,
  contactData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  setHistory: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    touchedBy: PropTypes.string.isRequired,
  })).isRequired,
};

export default SingleEnquiryView;
