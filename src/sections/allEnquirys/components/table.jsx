import axios from 'axios';
import * as React from 'react';
import { useDispatch  } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridToolbar, useGridApiRef } from '@mui/x-data-grid';

import { enquiry_api } from 'src/services/userapi';
import { feedEnquirys } from 'src/redux/slices/enquirysSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// const VISIBLE_FIELDS = ['name', 'course', 'preferreLocation', 'createdDate', 'isFresher'];

export default function EnquiryTable() {
  // ----- demo data generator from mui -----

  const dispatch = useDispatch();

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'creationDate',
      sort: 'desc',
    },
  ]);

  const navigate = useNavigate();

  const [id, setId] = useState('');


  const handleRowClick = (params) => {
    setId(params.row.id);
    navigate(`/dashboard/allenquirys/enquiry/${params.row.id}`)
  };

  const apiRef = useGridApiRef();

  function noEnquirys() {
    alert('No enquirys to display, create Enquiry');
  }

  const [loading, setLoading] = useState(false);

  // ************* Important data schema *******************

  async function feedData() {
    try {
      setLoading(true);
      const response = await axios.get(`${enquiry_api}/allenquirys`);
      const { data } = response;
      if (data.length === 0) {
        noEnquirys();
      }     
      // alert("update enquiry in redux all") 
      // dispatch(feedEnquirys(data.enquiries))
      console.log(data.enquiries);
      setId(data.enquiries.id);
      return data.enquiries;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately
      return [];
    } finally {
      setLoading(false);
    }
  }

  // important data schema for table MUI
  const [data1, setData1] = useState({
    columns: [
      {
        field: 'id',
        hide: true,
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 120,
        editable: false,
        groupable: false,
        aggregable: false,
      },
      {
        field: 'location',
        headerName: 'Location',
        editable: false,
        hide: true,
      },
      {
        field: 'isFresher',
        headerName: 'Is Fresher?',
        type: 'boolean',
        width: 150,
        editable: false,
      },
      {
        field: 'contact',
        headerName: 'Contact',
        width: 150,
        editable: false,
        hide: true,
      },
      {
        field: 'altContact',
        headerName: 'Alt. Contact',
        width: 150,
        editable: false,
        hide: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: false,
        hide: true,
      },
      {
        field: 'preferredLocation',
        headerName: 'Preferrd Location',
        width: 160,
        editable: false,
        groupable: false,
        aggregable: false,
        hide: true,
      },
      {
        field: 'qualification',
        headerName: 'Qualification',
        width: 150,
        editable: false,
        hide: true,
      },
      {
        field: 'creationDate',
        headerName: 'Created On',
        type: 'dateTime',
        width: 180,
        editable: false,
        hide: true,
      },
      {
        field: 'course',
        headerName: 'Course',
        editable: false,
        hide: true,
      },
      {
        field: 'isEmployed',
        headerName: 'Is Employed?',
        type: 'boolean',
        width: 150,
        editable: false,
      },
      {
        field: 'organisation',
        headerName: 'Organisation',
        width: 180,
        editable: false,
        hide: true,
      },
      {
        field: 'aboutUs',
        headerName: 'About Us',
        width: 180,
        editable: false,
        hide: true,
      },
      {
        field: 'branch',
        headerName: 'Branch',
        width: 150,
        editable: false,
        hide: true,
      },
      {
        field: 'preferredBatch',
        headerName: 'Preferred Batch',
        width: 150,
        editable: false,
        hide: true,
      },
    ],
    rows: [
      // {
      //   id: "22032d3-97ee-55e3-864b-3fbebfe73fc1",
      //   name: "Richard Ford",
      //   location: "Domlur",
      //   isFresher: true,
      //   contact: "8888888888",
      //   altContact: "0000000000",
      //   email: "umaec@paz.nf",
      //   preferredLocation: "marathahalli",
      //   qualification: "Masters",
      //   creationDate: new Date(),
      //   course: "MERN",
      //   isEmployed: true,
      //   organisation: "IBM",
      //   aboutUs: "From friend",
      //   branch: "Mechanical",
      //   preferredBatch: "Weekend"
      // },
      // {
      //   id: "2f20323-97ee-55e3-864b-3fbebfe73fc1",
      //   name: "Rich",
      //   location: "Domlur",
      //   isFresher: false,
      //   contact: "8888888888",
      //   altContact: "0000000000",
      //   email: "umaec@paz.nf",
      //   preferredLocation: "btm",
      //   qualification: "Masters",
      //   creationDate: new Date(),
      //   course: "MERN",
      //   isEmployed: true,
      //   organisation: "IBM",
      //   aboutUs: "From friend",
      //   branch: "Mechanical",
      //   preferredBatch: "Weekend"
      // },
      // {
      //   id: "2f2032d397ee-55e3-864b-3fbebfe73fc1",
      //   name: "Rico",
      //   location: "Domlur",
      //   isFresher: false,
      //   contact: "8888888888",
      //   altContact: "0000000000",
      //   email: "umaec@paz.nf",
      //   preferredLocation: "wfh",
      //   qualification: "Masters",
      //   creationDate: new Date(),
      //   course: "MERN",
      //   isEmployed: false,
      //   organisation: "",
      //   aboutUs: "From friend",
      //   branch: "Mechanical",
      //   preferredBatch: "Weekday"
      // },
      // {
      //   id: "2f2032-97ee-55e3-864b-3fbebfe73fc1",
      //   name: "Si",
      //   location: "Domlur",
      //   isFresher: true,
      //   contact: "8888888888",
      //   altContact: "0000000000",
      //   email: "umaec@paz.nf",
      //   preferredLocation: "marathahalli",
      //   qualification: "Masters",
      //   creationDate: new Date(2022, 7, 25),
      //   course: "MERN",
      //   isEmployed: false,
      //   organisation: "",
      //   aboutUs: "From friend",
      //   branch: "Mechanical",
      //   preferredBatch: "Weekday"
      // }
    ],
    initialState: {
      columns: {
        columnVisibilityModel: {
          id: false,
          name: true,
          location: false,
          isFresher: true,
          contact: true,
          altContact: false,
          email: true,
          preferredLocation: true,
          qualification: false,
          creationDate: true,
          course: true,
          isEmployed: false,
          organisation: false,
          aboutUs: false,
          branch: false,
          preferredBatch: true,
        },
      },
    },
  });
 


  // const data = {
  //   columns: [
  //     {
  //       field: "id",
  //       hide: true,
  //     },
  //     {
  //       field: "name",
  //       headerName: "Name",
  //       width: 120,
  //       editable: true,
  //       groupable: false,
  //       aggregable: false,
  //     },
  //     {
  //       field: "location",
  //       headerName: "Location",
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "isFresher",
  //       headerName: "Is Fresher?",
  //       type: "boolean",
  //       width: 150,
  //       editable: true,
  //     },
  //     {
  //       field: "contact",
  //       headerName: "Contact",
  //       width: 150,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "altContact",
  //       headerName: "Alt. Contact",
  //       width: 150,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "email",
  //       headerName: "Email",
  //       width: 150,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "preferredLocation",
  //       headerName: "Preferrd Location",
  //       width: 160,
  //       editable: true,
  //       groupable: false,
  //       aggregable: false,
  //       hide: true,
  //     },
  //     {
  //       field: "qualification",
  //       headerName: "Qualification",
  //       width: 150,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "creationDate",
  //       headerName: "Created On",
  //       type: "dateTime",
  //       width: 180,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "course",
  //       headerName: "Course",
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "isEmployed",
  //       headerName: "Is Employed?",
  //       type: "boolean",
  //       width: 150,
  //       editable: true,
  //     },
  //     {
  //       field: "organisation",
  //       headerName: "Organisation",
  //       width: 180,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "aboutUs",
  //       headerName: "About Us",
  //       width: 180,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "branch",
  //       headerName: "Branch",
  //       width: 150,
  //       editable: true,
  //       hide: true,
  //     },
  //     {
  //       field: "preferredBatch",
  //       headerName: "Preferred Batch",
  //       width: 150,
  //       editable: true,
  //       hide: true,
  //     },
  //   ],
  //   rows: [
  //     // {
  //     //   id: "22032d3-97ee-55e3-864b-3fbebfe73fc1",
  //     //   name: "Richard Ford",
  //     //   location: "Domlur",
  //     //   isFresher: true,
  //     //   contact: "8888888888",
  //     //   altContact: "0000000000",
  //     //   email: "umaec@paz.nf",
  //     //   preferredLocation: "marathahalli",
  //     //   qualification: "Masters",
  //     //   creationDate: new Date(),
  //     //   course: "MERN",
  //     //   isEmployed: true,
  //     //   organisation: "IBM",
  //     //   aboutUs: "From friend",
  //     //   branch: "Mechanical",
  //     //   preferredBatch: "Weekend"
  //     // },
  //     // {
  //     //   id: "2f20323-97ee-55e3-864b-3fbebfe73fc1",
  //     //   name: "Rich",
  //     //   location: "Domlur",
  //     //   isFresher: false,
  //     //   contact: "8888888888",
  //     //   altContact: "0000000000",
  //     //   email: "umaec@paz.nf",
  //     //   preferredLocation: "btm",
  //     //   qualification: "Masters",
  //     //   creationDate: new Date(),
  //     //   course: "MERN",
  //     //   isEmployed: true,
  //     //   organisation: "IBM",
  //     //   aboutUs: "From friend",
  //     //   branch: "Mechanical",
  //     //   preferredBatch: "Weekend"
  //     // },
  //     // {
  //     //   id: "2f2032d397ee-55e3-864b-3fbebfe73fc1",
  //     //   name: "Rico",
  //     //   location: "Domlur",
  //     //   isFresher: false,
  //     //   contact: "8888888888",
  //     //   altContact: "0000000000",
  //     //   email: "umaec@paz.nf",
  //     //   preferredLocation: "wfh",
  //     //   qualification: "Masters",
  //     //   creationDate: new Date(),
  //     //   course: "MERN",
  //     //   isEmployed: false,
  //     //   organisation: "",
  //     //   aboutUs: "From friend",
  //     //   branch: "Mechanical",
  //     //   preferredBatch: "Weekday"
  //     // },
  //     // {
  //     //   id: "2f2032-97ee-55e3-864b-3fbebfe73fc1",
  //     //   name: "Si",
  //     //   location: "Domlur",
  //     //   isFresher: true,
  //     //   contact: "8888888888",
  //     //   altContact: "0000000000",
  //     //   email: "umaec@paz.nf",
  //     //   preferredLocation: "marathahalli",
  //     //   qualification: "Masters",
  //     //   creationDate: new Date(2022, 7, 25),
  //     //   course: "MERN",
  //     //   isEmployed: false,
  //     //   organisation: "",
  //     //   aboutUs: "From friend",
  //     //   branch: "Mechanical",
  //     //   preferredBatch: "Weekday"
  //     // }
  //   ],
  //   initialState: {
  //     columns: {
  //       columnVisibilityModel: {
  //         id: false,
  //         name: true,
  //         location: false,
  //         isFresher: true,
  //         contact: true,
  //         altContact: false,
  //         email: true,
  //         preferredLocation: true,
  //         qualification: false,
  //         creationDate: true,
  //         course: true,
  //         isEmployed: false,
  //         organisation: false,
  //         aboutUs: false,
  //         branch: false,
  //         preferredBatch: true,
  //       },
  //     },
  //   },
  // };

  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        field: 'rating',
        operator: '>',
        value: '2.5',
      },
    ],
  });

  useEffect(() => {
    feedData().then((data) => {
      /// data transform
      data.map((obj) => {
        obj.id = obj._id;

        // // Delete old key
        delete obj._id;

        if (obj.isFresher === ('true' || 'yes')) {
          obj.isFresher = true;
        } else if (obj.isFresher === ('false' || 'no')) {
          obj.isFresher = false;
        }

        if (obj.isEmployed === ('true' || 'yes')) {
          obj.isEmployed = true;
        } else if (obj.isEmployed === ('false' || 'no')) {
          obj.isEmployed = false;
        }

        obj.creationDate = new Date(obj.creationDate);

        return obj;
      });
      setData1((prevData) => ({
        ...prevData,
        rows: data,
      }));
      dispatch(feedEnquirys(data));
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        slots={{
          loadingOverlay: LinearProgress,
          toolbar: GridToolbar,
        }}
        loading={loading}
        // sortModel={sortModel}
        onRowClick={handleRowClick}
        // onRowDoubleClick={handleRowClick}
        apiRef={apiRef}
        {...data1}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />

      {/* data of each enqury is in message named state */}
    </div>
  );
}
