import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { useRouter } from 'src/routes/hooks';

import Account from 'src/_mock/account';
import { user_api } from 'src/services/userapi';
import { signOut } from 'src/redux/slices/userSlice';

// ----------------------------------------------------------------------

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

const MENU_OPTIONS = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    path: '/dashboard/profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const { user } = Account();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSignOut = () => {
    // Make a POST request with JSON data
    dispatch(
      signOut({
        name: '',
        photoURL: '',
        role: 'none',
        token: '',
        login:'',
        logout:'',
        login_location: '',
        loginDay: '',
        loginTime: '',
        logoutTime: '',
        logoutDay: '',
      })
    );
    (async () => {
      const url = `${user_api}/signout`;
      const signoutaxios = await axios
        .post(url, {
          email: user.email,
          login: user.login,
        })
        .then((response) => {          
          if (response.data.msg === 'Logout time recorded successfully') {
            router.push('/');
          } else {
            alert(response.data);
          }
        })
        .catch((error) => alert(error, 'error block activated'));
    })();

    handleClose();
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (path) => {
    setOpen(null);
  };
  const handleClick = (path) => {
    router.push(path);
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL === ''}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClick={handleClick}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={() => handleClick(option.path)}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={() => {
            handleOpenModal();
          }}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You wont be able to login today again!!
            </Typography>
            <Button color="error" onClick={() => handleSignOut()}>
              Sure? Log out
            </Button>
          </Box>
        </Modal>
      </Popover>
    </>
  );
}
