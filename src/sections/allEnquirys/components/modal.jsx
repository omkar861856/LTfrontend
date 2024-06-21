import PropTypes from 'prop-types';
import React, { useState } from 'react';


import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  List,
  Modal,
  Button,
  ListItem,
  TextField,
  Typography,
  IconButton,
  ListItemText
} from '@mui/material';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const historyStyle = {
  marginTop: 2,
  bgcolor: 'background.paper',
  boxShadow: 2,
  p: 2,
  height: '150px',
  overflowY: 'scroll',
};

const ContactModal = ({ open, handleClose, contactData }) => {


  const [comment, setComment] = useState('');
  const [history, setHistory] = useState(contactData.history || []);

  const handleAddComment = () => {
    if (comment) {
      const newHistory = [...history, { text: comment, timestamp: new Date() }];
      setHistory(newHistory);
      setComment('');
    }
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhone = (phone) => {
    window.location.href = `tel:${phone}`;
  };

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

        <Typography variant="body1" mt={2}>
          <strong>Name:</strong> {contactData.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {contactData.email}
          <IconButton onClick={() => handleEmail(contactData.email)}>
            <EmailIcon />
          </IconButton>
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {contactData.contact}
          <IconButton onClick={() => handlePhone(contactData.contact)}>
            <PhoneIcon />
          </IconButton>
        </Typography>

        <TextField
          label="Add Comment"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddComment}>
          Add Comment
        </Button>

        <Box sx={historyStyle}>
          <Typography variant="h6" component="h3">
            History
          </Typography>
          <List>
            {history.map((entry, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={entry.text}
                  secondary={new Date(entry.timestamp).toLocaleString()}
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
    history: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })),
  }).isRequired,
};


export default ContactModal;
