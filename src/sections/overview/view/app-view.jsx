import 'chart.js/auto';
import axios from 'axios';
import Slider from 'react-slick';
import parse from 'date-fns/parse'; import format from 'date-fns/format'
  import getDay from 'date-fns/getDay';
import { Bar } from 'react-chartjs-2';
import "slick-carousel/slick/slick.css";
import enUS from 'date-fns/locale/en-US';
import "slick-carousel/slick/slick-theme.css";
import startOfWeek from 'date-fns/startOfWeek';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { React, useMemo, Suspense, useState,useEffect } from 'react';


import { Email as EmailIcon, Message as MessageIcon } from '@mui/icons-material';
import {
    Box,
    Grid,
  
  List,
  Paper,
  Modal,
  Avatar,
  Button,
  Divider,

  ListItem,
  TextField,
  Container,
  Pagination,
  IconButton,
  Typography,
  ListItemText,
  LinearProgress,
  CircularProgress,
  ListItemSecondaryAction} from '@mui/material';

import Account from 'src/_mock/account';
import { user_api, enquiry_api } from 'src/services/userapi';
 
import AppWidgetSummary from '../app-widget-summary';

;


// ----------------------------------------------------------------------

export default function AppView() {
  const { user } = Account();

  const { role } = user;

  return <Container maxWidth="xl" >{ViewRouter(role)}</Container>;
}

function ViewRouter(role) {
  if (role === 'admin') {
    console.log(role);
    return <AdminView />;
  }
  if (role === 'student') {
    return <StudentView />;
  }
  if (role === 'mentor') {
    return <MentorView />;
  }
}

function AdminView() {
  const [users, setUsers] = useState([]);
  const [enquirys, setEnquirys] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    Promise.all([fetch(`${user_api}/allusers`), fetch(`${enquiry_api}/allenquirys`)])
      .then(([resUsers, resEnquirys]) => Promise.all([resUsers.json(), resEnquirys.json()]))
      .then(([dataUsers, dataEnquirys]) => {
        setUsers(dataUsers.usersdb);
        setEnquirys(dataEnquirys.enquirydb);
        const a1 = dataUsers.usersdb.filter((user) => user.role === 'student');
        const a2 = dataUsers.usersdb.filter((user) => user.role === 'mentor');
        const a3 = dataUsers.usersdb.filter((user) => user.role === 'admin');

        setMentors(a2);
        setAdmins(a3);
        setStudents(a1);

        console.log(users, admins, mentors, students);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Admin 👋
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <Suspense fallback={<>loading...</>}>
            <AppWidgetSummary
              title="All Enquiry's"
              total={enquirys.length}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Suspense>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Suspense fallback={<>loading...</>}>
            <AppWidgetSummary
              title="All Users"
              total={users.length}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Suspense>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Admins"
            total={admins.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Mentors"
            total={mentors.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Students"
            total={students.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function MentorView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Guru 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
          <MentorProfile />
        </Grid>

        <Grid xs={12} sm={12} md={12}>
          <MenteeManagement />
        </Grid>

        <Grid xs={12} sm={12} md={12}>
          <CourseManagement />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <MentorProgress />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <MentorsFeedback />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <ScheduleManagement />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <CommunicationTools />
        </Grid>
      </Grid>
    </Container>
  );
}

function StudentView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Learner 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="All Enquirey's"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function MentorProfile() {
  const [mentor, setMentor] = useState({
    name: '',
    contact: '',
    bio: '',
    profilePicture: '',
    expertise: '',
    schedule: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentor((prevMentor) => ({
      ...prevMentor,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset state if changes shouldn't be kept
  };

  return (
    <Container>
      <Box mt={4} sx={{ boxShadow: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Mentor Profile
        </Typography>
        {isEditing ? (
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={mentor.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={mentor.contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  name="bio"
                  value={mentor.bio}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profile Picture URL"
                  name="profilePicture"
                  value={mentor.profilePicture}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Areas of Expertise"
                  name="expertise"
                  value={mentor.expertise}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Schedule and Availability"
                  name="schedule"
                  value={mentor.schedule}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="secondary" fullWidth onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Name:</Typography>
                <Typography variant="body1">{mentor.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Contact:</Typography>
                <Typography variant="body1">{mentor.contact}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Bio:</Typography>
                <Typography variant="body1">{mentor.bio}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Profile Picture:</Typography>
                {mentor.profilePicture ? (
                  <Avatar
                    src={mentor.profilePicture}
                    alt="Profile"
                    sx={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Typography variant="body1">No profile picture</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Areas of Expertise:</Typography>
                <Typography variant="body1">{mentor.expertise}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Schedule and Availability:</Typography>
                <Typography variant="body1">{mentor.schedule}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

function MenteeManagement() {
  const [mentees, setMentees] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const menteesPerPage = 5;
  useEffect(() => {
    fetchMentees();
  }, []);

  const fetchMentees = async () => {
    try {
      const response = await axios.get('https://6666e9e8a2f8516ff7a57eb4.mockapi.io/mentors'); // Replace with your API endpoint
      setMentees(response.data); // Assuming mentees data is an array of objects
    } catch (error) {
      console.error('Error fetching mentees:', error);
      // Handle error
    }
  };

  const handleViewProfile = (mentee) => {
    setSelectedMentee(mentee);
  };

  const handleCloseProfile = () => {
    setSelectedMentee(null);
  };

  // Pagination logic
  const indexOfLastMentee = currentPage * menteesPerPage;
  const indexOfFirstMentee = indexOfLastMentee - menteesPerPage;
  const currentMentees = mentees.slice(indexOfFirstMentee, indexOfLastMentee);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Mentee Management
        </Typography>
        <Divider />
      </Grid>

      {/* Mentee List */}
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom>
          List of Mentees
        </Typography>
        <List>
          {currentMentees.map((mentee) => (
            <div key={mentee.id}>
              <ListItem button onClick={() => handleViewProfile(mentee)}>
                <Avatar src={mentee.profilePicture} alt={mentee.name} />
                <ListItemText primary={mentee.name} secondary={mentee.currentCourse} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="email">
                    <EmailIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="message">
                    <MessageIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Pagination
          count={Math.ceil(mentees.length / menteesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          size="large"
          siblingCount={1}
          boundaryCount={1}
          style={{ marginTop: '20px' }}
        />
      </Grid>

      {/* Detailed Mentee Profile */}
      <Grid item xs={12} sm={6}>
        {selectedMentee && (
          <div>
            <Typography variant="h6" gutterBottom>
              {selectedMentee.name}s Profile
            </Typography>
            <Avatar
              src={selectedMentee.profilePicture}
              alt={selectedMentee.name}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="body1" gutterBottom>
              <strong>Contact:</strong> {selectedMentee.contact}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Current Course:</strong> {selectedMentee.currentCourse}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Progress:</strong> {selectedMentee.progress}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Attendance:</strong> {selectedMentee.attendance}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Feedback:</strong> {selectedMentee.feedback}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleCloseProfile}>
              Close
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

// mock data 


// let courses = [
//   {
//     "id": 1,
//     "title": "Web Development Bootcamp",
//     "description": "Comprehensive course covering HTML, CSS, JavaScript, and frameworks like React.",
//     "syllabus": [
//       { "title": "Introduction to HTML", "description": "Basic tags, attributes, and structure." },
//       { "title": "CSS Styling", "description": "Selectors, properties, and responsive design." },
//       { "title": "JavaScript Fundamentals", "description": "Variables, functions, and DOM manipulation." },
//       { "title": "React Framework", "description": "Components, state management, and hooks." }
//     ],
//     "materials": [
//       { "title": "HTML Basics PDF", "link": "https://example.com/html-basics.pdf" },
//       { "title": "CSS Tutorial Video", "link": "https://example.com/css-tutorial.mp4" },
//       { "title": "React Hooks Cheat Sheet", "link": "https://example.com/react-hooks-cheat-sheet.pdf" }
//     ],
//     "assignments": [
//       { "title": "HTML Exercise", "dueDate": "2024-06-30" },
//       { "title": "CSS Project", "dueDate": "2024-07-15" },
//       { "title": "React App Development", "dueDate": "2024-08-01" }
//     ]
//   },
//   {
//     "id": 2,
//     "title": "Data Science Fundamentals",
//     "description": "Introduction to data analysis, statistics, and machine learning algorithms.",
//     "syllabus": [
//       { "title": "Data Analysis with Python", "description": "Pandas, NumPy, and data visualization." },
//       { "title": "Statistics for Data Science", "description": "Probability, distributions, and hypothesis testing." },
//       { "title": "Machine Learning Basics", "description": "Regression, classification, and model evaluation." }
//     ],
//     "materials": [
//       { "title": "Python Data Analysis Guide", "link": "https://example.com/python-data-analysis-guide.pdf" },
//       { "title": "Statistics Crash Course Video", "link": "https://example.com/statistics-crash-course.mp4" },
//       { "title": "Machine Learning Algorithms Book", "link": "https://example.com/machine-learning-book.pdf" }
//     ],
//     "assignments": [
//       { "title": "Data Analysis Project", "dueDate": "2024-07-10" },
//       { "title": "Statistics Quiz", "dueDate": "2024-07-25" },
//       { "title": "Machine Learning Model Implementation", "dueDate": "2024-08-10" }
//     ]
//   }
// ]



function CourseManagement () {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openModal, setOpenModal] = useState(false);
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/276fdd48-f3b1-4070-be56-1974b9b65475'); // Replace with your API endpoint
        setCourses(response.data); // Assuming courses data is an array of objects
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle error
      }
    };
  
    const handleViewCourse = (course) => {
      setSelectedCourse(course);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    return (
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Course Management
          </Typography>
          <Divider />
        </Grid>
  
        {/* Overview of Courses */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Overview of Courses
          </Typography>
          <List>
            {courses.map((course) => (
              <ListItem key={course.id} button onClick={() => handleViewCourse(course)}>
                <ListItemText primary={course.title} secondary={course.description} />
              </ListItem>
            ))}
          </List>
        </Grid>
  
        {/* Detailed Course Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Paper sx={{
            width: '80%',
            maxWidth: 800,
            maxHeight: '80vh',
            overflowY: 'auto',
            p: 4,
            bgcolor: 'background.paper',
            boxShadow: 24
          }}>
            <Typography variant="h5" id="modal-modal-title" gutterBottom>
              {selectedCourse?.title}
            </Typography>
            <Typography variant="body1" id="modal-modal-description" gutterBottom>
              <strong>Description:</strong> {selectedCourse?.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Syllabus:</strong>
            </Typography>
            <List>
              {selectedCourse?.syllabus.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.title} secondary={item.description} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1" gutterBottom>
              <strong>Materials:</strong>
            </Typography>
            <List>
              {selectedCourse?.materials.map((material, index) => (
                <ListItem key={index}>
                  <ListItemText primary={material.title} secondary={material.link} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1" gutterBottom>
              <strong>Assignments:</strong>
            </Typography>
            <List>
              {selectedCourse?.assignments.map((assignment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={assignment.title} secondary={assignment.dueDate} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Box>
          </Paper>
        </Modal>
      </Grid>
    );
  };


  // mock data - 

  // let mentees = [
  //   {
  //     "id": 1,
  //     "name": "John Doe",
  //     "contact": "john.doe@example.com",
  //     "profilePicture": "https://example.com/johndoe.jpg",
  //     "currentCourse": "Web Development Bootcamp",
  //     "courses": [
  //       { "id": 1, "title": "HTML Basics", "progress": 75 },
  //       { "id": 2, "title": "CSS Fundamentals", "progress": 50 },
  //       { "id": 3, "title": "JavaScript Essentials", "progress": 90 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": false },
  //       { "date": "2024-06-03", "present": true }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "HTML Assignment", "grade": "A" },
  //       { "assignmentId": 2, "assignmentTitle": "CSS Project", "grade": "B+" },
  //       { "assignmentId": 3, "assignmentTitle": "JavaScript Exam", "grade": "A-" }
  //     ]
  //   },
  //   {
  //     "id": 2,
  //     "name": "Jane Smith",
  //     "contact": "jane.smith@example.com",
  //     "profilePicture": "https://example.com/janesmith.jpg",
  //     "currentCourse": "Data Science Program",
  //     "courses": [
  //       { "id": 1, "title": "Python Basics", "progress": 85 },
  //       { "id": 2, "title": "Data Analysis", "progress": 60 },
  //       { "id": 3, "title": "Machine Learning", "progress": 70 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": true },
  //       { "date": "2024-06-03", "present": false }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "Python Assignment", "grade": "A-" },
  //       { "assignmentId": 2, "assignmentTitle": "Data Analysis Project", "grade": "B" },
  //       { "assignmentId": 3, "assignmentTitle": "ML Exam", "grade": "A" }
  //     ]
  //   },
  //   {
  //     "id": 3,
  //     "name": "Sam Wilson",
  //     "contact": "sam.wilson@example.com",
  //     "profilePicture": "https://example.com/samwilson.jpg",
  //     "currentCourse": "Mobile App Development",
  //     "courses": [
  //       { "id": 1, "title": "Android Basics", "progress": 70 },
  //       { "id": 2, "title": "iOS Development", "progress": 65 },
  //       { "id": 3, "title": "React Native", "progress": 80 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": false },
  //       { "date": "2024-06-03", "present": true }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "Android Project", "grade": "B+" },
  //       { "assignmentId": 2, "assignmentTitle": "iOS Assignment", "grade": "A-" },
  //       { "assignmentId": 3, "assignmentTitle": "React Native Exam", "grade": "A" }
  //     ]
  //   },
  //   {
  //     "id": 4,
  //     "name": "Emily Brown",
  //     "contact": "emily.brown@example.com",
  //     "profilePicture": "https://example.com/emilybrown.jpg",
  //     "currentCourse": "Cyber Security",
  //     "courses": [
  //       { "id": 1, "title": "Network Security", "progress": 55 },
  //       { "id": 2, "title": "Cryptography", "progress": 75 },
  //       { "id": 3, "title": "Ethical Hacking", "progress": 90 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": false },
  //       { "date": "2024-06-02", "present": true },
  //       { "date": "2024-06-03", "present": true }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "Network Security Project", "grade": "B" },
  //       { "assignmentId": 2, "assignmentTitle": "Cryptography Assignment", "grade": "A" },
  //       { "assignmentId": 3, "assignmentTitle": "Ethical Hacking Exam", "grade": "A+" }
  //     ]
  //   },
  //   {
  //     "id": 5,
  //     "name": "Michael Johnson",
  //     "contact": "michael.johnson@example.com",
  //     "profilePicture": "https://example.com/michaeljohnson.jpg",
  //     "currentCourse": "Cloud Computing",
  //     "courses": [
  //       { "id": 1, "title": "AWS Basics", "progress": 65 },
  //       { "id": 2, "title": "Azure Fundamentals", "progress": 55 },
  //       { "id": 3, "title": "Google Cloud Platform", "progress": 75 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": true },
  //       { "date": "2024-06-03", "present": false }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "AWS Project", "grade": "B+" },
  //       { "assignmentId": 2, "assignmentTitle": "Azure Assignment", "grade": "B" },
  //       { "assignmentId": 3, "assignmentTitle": "GCP Exam", "grade": "A-" }
  //     ]
  //   },
  //   {
  //     "id": 6,
  //     "name": "Linda Davis",
  //     "contact": "linda.davis@example.com",
  //     "profilePicture": "https://example.com/lindadavis.jpg",
  //     "currentCourse": "Artificial Intelligence",
  //     "courses": [
  //       { "id": 1, "title": "AI Basics", "progress": 80 },
  //       { "id": 2, "title": "Deep Learning", "progress": 70 },
  //       { "id": 3, "title": "Natural Language Processing", "progress": 60 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": false },
  //       { "date": "2024-06-03", "present": true }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "AI Assignment", "grade": "A" },
  //       { "assignmentId": 2, "assignmentTitle": "Deep Learning Project", "grade": "B+" },
  //       { "assignmentId": 3, "assignmentTitle": "NLP Exam", "grade": "B" }
  //     ]
  //   },
  //   {
  //     "id": 7,
  //     "name": "David Martinez",
  //     "contact": "david.martinez@example.com",
  //     "profilePicture": "https://example.com/davidmartinez.jpg",
  //     "currentCourse": "Game Development",
  //     "courses": [
  //       { "id": 1, "title": "Game Design Basics", "progress": 60 },
  //       { "id": 2, "title": "Unity Development", "progress": 85 },
  //       { "id": 3, "title": "Advanced Game Mechanics", "progress": 70 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": true },
  //       { "date": "2024-06-03", "present": true }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "Game Design Project", "grade": "B+" },
  //       { "assignmentId": 2, "assignmentTitle": "Unity Assignment", "grade": "A" },
  //       { "assignmentId": 3, "assignmentTitle": "Game Mechanics Exam", "grade": "A-" }
  //     ]
  //   },
  //   {
  //     "id": 8,
  //     "name": "Susan Clark",
  //     "contact": "susan.clark@example.com",
  //     "profilePicture": "https://example.com/susanclark.jpg",
  //     "currentCourse": "Full Stack Development",
  //     "courses": [
  //       { "id": 1, "title": "Frontend Basics", "progress": 70 },
  //       { "id": 2, "title": "Backend Fundamentals", "progress": 75 },
  //       { "id": 3, "title": "Database Management", "progress": 80 }
  //     ],
  //     "attendance": [
  //       { "date": "2024-06-01", "present": true },
  //       { "date": "2024-06-02", "present": false },
  //       { "date": "2024-06-03", "present": true }
  //     ],
  //     "grades": [
  //       { "assignmentId": 1, "assignmentTitle": "Frontend Project", "grade": "A-" },
  //       { "assignmentId": 2, "assignmentTitle": "Backend Assignment", "grade": "A" },
  //       { "assignmentId": 3, "assignmentTitle": "Database Exam", "grade": "B+" }
  //     ]
  //   }
  // ]
  
  

  function MentorProgress() {
    const [mentees, setMentees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
      const fetchMenteesData = async () => {
        try {
          const response = await axios.get('https://mocki.io/v1/7f9fbf74-a417-41f3-916a-b40a6b26c217'); // Replace with your API endpoint
          setMentees(response.data); // Assuming mentees data is an array of objects
          setLoading(false);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching mentees data:', error);
          setLoading(false);
        }
      };
  
      fetchMenteesData();
    }, []);
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredMentees = useMemo(() => 
      mentees.filter(mentee => mentee.name.toLowerCase().includes(searchQuery.toLowerCase())), 
      [mentees, searchQuery]
    );
  
    const settings = {
      infinite: true,
      focusOnSelect: true,
      dots: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        }
      ]
    };
  
    if (loading) {
      return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <CircularProgress />
        </Grid>
      );
    }
  
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Mentor Dashboard
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search by name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Grid> 
  
        <Grid item xs={12}>
          <Slider {...settings}>
            {filteredMentees.map((mentee) => (
              <div key={mentee.id}>
                <Paper sx={{ p: 2, mx: 1, height:20 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar alt={mentee.name} src={mentee.profilePicture} sx={{ mr: 2 }} />
                    <Typography variant="h6">{mentee.name}</Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    <strong>Contact:</strong> {mentee.contact}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Current Course:</strong> {mentee.currentCourse}
                  </Typography>
        
                  <Typography variant="body1" gutterBottom>
                    <strong>Course Progress:</strong>
                  </Typography>
                  {mentee.courses.map((course) => (
                    <Box key={course.id} mb={2}>
                      <Typography variant="body2">{course.title}</Typography>
                      <LinearProgress variant="determinate" value={course.progress} />
                    </Box>
                  ))}
        
                  <Typography variant="body1" gutterBottom>
                    <strong>Attendance:</strong>
                  </Typography>
                  <Box mb={2}>
                    <Bar
                      data={{
                        labels: mentee.attendance.map((entry) => entry.date),
                        datasets: [
                          {
                            label: 'Attendance',
                            data: mentee.attendance.map((entry) => entry.present ? 1 : 0),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 1,
                            ticks: {
                              callback: (value) => value === 1 ? 'Present' : 'Absent',
                            },
                          },
                        },
                      }}
                    />
                  </Box>
        
                  <Typography variant="body1" gutterBottom>
                    <strong>Grades and Performance:</strong>
                  </Typography>
                  <List>
                    {mentee.grades.map((grade) => (
                      <ListItem key={grade.assignmentId}>
                        <ListItemText
                          primary={grade.assignmentTitle}
                          secondary={`Grade: ${grade.grade}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    );
  }
    


  // let mockdata = [
  //   {
  //     "id": 1,
  //     "studentName": "John Doe",
  //     "assignment": "Project 1",
  //     "feedback": "Excellent work, well done!",
  //     "evaluation": "A",
  //     "date": "2024-06-15"
  //   },
  //   {
  //     "id": 2,
  //     "studentName": "Jane Smith",
  //     "assignment": "Assignment 2",
  //     "feedback": "Good effort, but needs more detail.",
  //     "evaluation": "B+",
  //     "date": "2024-06-14"
  //   },
  //   {
  //     "id": 3,
  //     "studentName": "Mike Johnson",
  //     "assignment": "Project 2",
  //     "feedback": "Well-structured and comprehensive.",
  //     "evaluation": "A-",
  //     "date": "2024-06-13"
  //   },
  //   {
  //     "id": 4,
  //     "studentName": "Emily Brown",
  //     "assignment": "Assignment 3",
  //     "feedback": "Missing key components, please revise.",
  //     "evaluation": "C",
  //     "date": "2024-06-12"
  //   },
  //   {
  //     "id": 5,
  //     "studentName": "David Wilson",
  //     "assignment": "Project 3",
  //     "feedback": "Creative approach, needs more depth.",
  //     "evaluation": "B",
  //     "date": "2024-06-11"
  //   }
  // ]
  

  function MentorsFeedback (){
    const [feedbackData, setFeedbackData] = useState([]);
    const [newFeedback, setNewFeedback] = useState({
      studentName: '',
      assignment: '',
      feedback: '',
      evaluation: '',
    });
  
    useEffect(() => {
      // Mock API call to fetch feedback data
      axios.get('https://mocki.io/v1/d0922c8d-1306-4db8-976b-3f8e3bf47282')
        .then(response => setFeedbackData(response.data))
        .catch(error => console.error('Error fetching feedback data:', error));
    }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewFeedback(prevState => ({ ...prevState, [name]: value }));
    };
  
    const handleSubmit = () => {
      const updatedFeedbackData = [...feedbackData, { ...newFeedback, id: feedbackData.length + 1, date: new Date().toISOString().split('T')[0] }];
      setFeedbackData(updatedFeedbackData);
  
      // Mock API call to submit new feedback
      // axios.post('/path/to/submitFeedback', newFeedback)
      //   .then(response => setFeedbackData(response.data))
      //   .catch(error => console.error('Error submitting feedback:', error));
    };
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Mentors Dashboard - Feedback and Evaluation
        </Typography>
  
        <Box component={Paper} p={2} mb={4}>
          <Typography variant="h6">Provide Feedback</Typography>
          <TextField
            fullWidth
            label="Student Name"
            name="studentName"
            value={newFeedback.studentName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Assignment"
            name="assignment"
            value={newFeedback.assignment}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Feedback"
            name="feedback"
            value={newFeedback.feedback}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Evaluation"
            name="evaluation"
            value={newFeedback.evaluation}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </Box>
  
        <Box component={Paper} p={2}>
          <Typography variant="h6">Historical Feedback Records</Typography>
          <List>
            {feedbackData.map(record => (
              <div key={record.id}>
                <ListItem>
                  <ListItemText
                    primary={`${record.studentName} - ${record.assignment}`}
                    secondary={`Feedback: ${record.feedback} | Evaluation: ${record.evaluation} | Date: ${record.date}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Container>
    );
  };

  // let mockdata = [
  //   {
  //     "id": 1,
  //     "title": "Class: Data Structures",
  //     "date": "2024-06-20T10:00:00",
  //     "type": "class"
  //   },
  //   {
  //     "id": 2,
  //     "title": "Meeting: Project Kickoff",
  //     "date": "2024-06-21T14:00:00",
  //     "type": "meeting"
  //   },
  //   {
  //     "id": 3,
  //     "title": "Event: Tech Conference",
  //     "date": "2024-06-22T09:00:00",
  //     "type": "event"
  //   },
  //   {
  //     "id": 4,
  //     "title": "Exam: Mid-term",
  //     "date": "2024-06-23T11:00:00",
  //     "type": "exam"
  //   },
  //   {
  //     "id": 5,
  //     "title": "Project Deadline: AI Assignment",
  //     "date": "2024-06-24T23:59:59",
  //     "type": "deadline"
  //   }
  // ]

  // Schedule management starts here

  const locales = {
    'en-US': enUS,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });


  function ScheduleManagement (){
    const [scheduleData, setScheduleData] = useState([]);
  
    useEffect(() => {
      // Mock API call to fetch schedule data
      axios.get('https://mocki.io/v1/f03fc88a-66d0-4fcb-857b-f3b56a88d9a5')
        .then(response => setScheduleData(response.data))
        .catch(error => console.error('Error fetching schedule data:', error));
    }, []);
  
    const events = scheduleData.map(event => ({
      id: event.id,
      title: event.title,
      start: new Date(event.date),
      end: new Date(event.date),
      allDay: event.type === 'deadline',
    }));
  
    const reminders = scheduleData.filter(event => event.type === 'exam' || event.type === 'deadline');
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Mentors Dashboard - Schedule Management
        </Typography>
  
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box component={Paper} p={2}>
              <Typography variant="h6">Calendar View</Typography>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box component={Paper} p={2}>
              <Typography variant="h6">Reminders</Typography>
              <List>
                {reminders.map(reminder => (
                  <div key={reminder.id}>
                    <ListItem>
                      <ListItemText
                        primary={reminder.title}
                        secondary={`Date: ${new Date(reminder.date).toLocaleString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  };
  


  
// let mockchatdata = 
// [
//   {
//     "id": 1,
//     "sender": "Mentor",
//     "message": "Hello, how are you progressing with your project?",
//     "timestamp": "2024-06-18T10:00:00"
//   },
//   {
//     "id": 2,
//     "sender": "Mentee",
//     "message": "Hi, I'm doing well. I have a few questions about the requirements.",
//     "timestamp": "2024-06-18T10:05:00"
//   },
//   {
//     "id": 3,
//     "sender": "Mentor",
//     "message": "Sure, go ahead and ask.",
//     "timestamp": "2024-06-18T10:10:00"
//   },
//   {
//     "id": 4,
//     "sender": "Mentee",
//     "message": "What are the specific deliverables for the project?",
//     "timestamp": "2024-06-18T10:15:00"
//   },
//   {
//     "id": 5,
//     "sender": "Mentor",
//     "message": "The deliverables include a report, presentation slides, and a prototype.",
//     "timestamp": "2024-06-18T10:20:00"
//   }
// ]


// let mockAnnouncementsData = [
//   {
//     "id": 1,
//     "title": "Midterm Exam Schedule",
//     "content": "The midterm exams will be held from June 25 to June 30.",
//     "date": "2024-06-15"
//   },
//   {
//     "id": 2,
//     "title": "Project Submission Deadline",
//     "content": "Please submit your project reports by June 28.",
//     "date": "2024-06-17"
//   },
//   {
//     "id": 3,
//     "title": "Guest Lecture on AI",
//     "content": "There will be a guest lecture on Artificial Intelligence on June 22.",
//     "date": "2024-06-19"
//   },
//   {
//     "id": 4,
//     "title": "Summer Internship Opportunities",
//     "content": "Explore various summer internship opportunities. Check your email for details.",
//     "date": "2024-06-20"
//   },
//   {
//     "id": 5,
//     "title": "Workshop on Data Visualization",
//     "content": "Attend a workshop on Data Visualization techniques on June 26.",
//     "date": "2024-06-21"
//   }
// ]

// let mockDiscussionData = [
//   {
//     "id": 1,
//     "topic": "Project Ideas",
//     "author": "Alice",
//     "content": "Let's discuss some innovative project ideas for the upcoming assignment.",
//     "date": "2024-06-16"
//   },
//   {
//     "id": 2,
//     "topic": "Study Resources",
//     "author": "Bob",
//     "content": "Can anyone share some good resources for learning React?",
//     "date": "2024-06-17"
//   },
//   {
//     "id": 3,
//     "topic": "Career Advice",
//     "author": "Carol",
//     "content": "Seeking advice on career paths after graduation. Any tips?",
//     "date": "2024-06-18"
//   },
//   {
//     "id": 4,
//     "topic": "Group Project Collaboration",
//     "author": "David",
//     "content": "Looking for group members for a collaborative project. Interested?",
//     "date": "2024-06-19"
//   },
//   {
//     "id": 5,
//     "topic": "Tech Trends",
//     "author": "Eve",
//     "content": "Discussing the latest trends in technology. Any predictions for the future?",
//     "date": "2024-06-20"
//   }
// ]


  function CommunicationTools(){
    const [chatData, setChatData] = useState([]);
    const [announcementsData, setAnnouncementsData] = useState([]);
    const [discussionData, setDiscussionData] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    useEffect(() => {
      // Mock API calls to fetch chat, announcements, and discussion data
      axios.get('https://mocki.io/v1/057dcf9b-9107-466e-a672-9512c03cd348')
        .then(response => setChatData(response.data))
        .catch(error => console.error('Error fetching chat data:', error));
  
      axios.get('https://mocki.io/v1/8e6a517d-6d52-48be-ac67-5e8c7655895d')
        .then(response => setAnnouncementsData(response.data))
        .catch(error => console.error('Error fetching announcements data:', error));
  
      axios.get('https://mocki.io/v1/6b312879-dabd-4ec4-a484-f0efb5362274')
        .then(response => setDiscussionData(response.data))
        .catch(error => console.error('Error fetching discussion data:', error));
    }, []);
  
    const handleSendMessage = () => {
      const newChatEntry = {
        id: chatData.length + 1,
        sender: "Mentor",
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      setChatData([...chatData, newChatEntry]);
      setNewMessage('');
  
      // Mock API call to send new message
      // axios.post('/path/to/sendMessage', newChatEntry)
      //   .then(response => setChatData(response.data))
      //   .catch(error => console.error('Error sending message:', error));
    };
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Mentors Dashboard - Communication Tools
        </Typography>
  
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box component={Paper} p={2} mb={4}>
              <Typography variant="h6">Chat</Typography>
              <List>
                {chatData.map(chat => (
                  <ListItem key={chat.id}>
                    <ListItemText
                      primary={`${chat.sender}: ${chat.message}`}
                      secondary={new Date(chat.timestamp).toLocaleString()}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="New Message"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: '8px' }}>
                  Send
                </Button>
              </Box>
            </Box>
          </Grid>
  
          <Grid item xs={12} md={6}>
            <Box component={Paper} p={2} mb={4}>
              <Typography variant="h6">Announcements</Typography>
              <List>
                {announcementsData.map(announcement => (
                  <div key={announcement.id}>
                    <ListItem>
                      <ListItemText
                        primary={announcement.title}
                        secondary={`${announcement.content} - ${new Date(announcement.date).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Box>
          </Grid>
  
          <Grid item xs={12}>
            <Box component={Paper} p={2}>
              <Typography variant="h6">Discussion Forums</Typography>
              <List>
                {discussionData.map(discussion => (
                  <div key={discussion.id}>
                    <ListItem>
                      <ListItemText
                        primary={discussion.topic}
                        secondary={`${discussion.content} - ${discussion.author} - ${new Date(discussion.date).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  };


  
  






  
