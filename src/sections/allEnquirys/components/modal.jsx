import axios from 'axios';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  List,
  Grid,
  Modal,
  Button,
  Select,
  ListItem,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  ListItemText,
} from '@mui/material';

import Account from 'src/_mock/account';
import { enquiry_api } from 'src/services/userapi';

const modalStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto',
};

const historyStyle = {
  mt: 2,
  bgcolor: 'background.paper',
  boxShadow: 2,
  p: 1,
  height: '100%',
  overflowY: 'auto',
};

const ContactModal = ({ open, handleClose, contactData }) => {
  const [comment, setComment] = useState('');
  const [history, setHistory] = useState([]);
  const [type, setType] = useState('');
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const { user } = Account();

  useEffect(() => {
    setHistory([]);
    if(open){
      setHistory(contactData.touchHistory)
    }
  }, [open, contactData.touchHistory]);

  const handleAddComment = async () => {
    const url = `${enquiry_api}/enquiry/touch`;
    const payload = {
      comment,
      type,
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
        setComment('');
      }
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
      console.error('Config:', error.config);
    }
  };

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

    // Check if selected date is less than current date
    if (selectedDate < now) {
      // If selected date is less than current date, prevent updating state
      return;
    }

    // Update state with selected date
    setReminderDate(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="h2">
            Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
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

        <form onSubmit={handleSubmit(handleAddComment)}>
          <TextField
            id="comment"
            label="Comment"
            fullWidth
            multiline
            rows={4}
            {...register('Comment', { required: true })}
            error={!!errors.Comment}
            helperText={errors.Comment ? 'Comment is required' : ''}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>

        <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
          Touch History
        </Typography>

        <Box sx={historyStyle}>
          <List>
            {(contactData.touchHistory??[]).map((entry, index) => (
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
            <Select
              labelId="filter-label"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
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
    </Modal>
  );
};

ContactModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  contactData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    location: PropTypes.string,
    isFresher: PropTypes.bool,
    altContact: PropTypes.string,
    preferredLocation: PropTypes.string,
    qualification: PropTypes.string,
    creationDate: PropTypes.instanceOf(Date),
    course: PropTypes.string,
    isEmployed: PropTypes.bool,
    organisation: PropTypes.string,
    aboutUs: PropTypes.string,
    touchHistory: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        timestamp: PropTypes.instanceOf(Date).isRequired,
      })
    ),
    preferredBatch: PropTypes.string,
    id: PropTypes.string,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        timestamp: PropTypes.instanceOf(Date).isRequired,
      })
    ),
  }).isRequired,
};

export default ContactModal;
