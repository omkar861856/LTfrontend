
import Container from '@mui/material/Container';

import { user_api } from 'src/services/userapi';
import Account from 'src/_mock/account';

import UserView from '../demo';






// ----------------------------------------------------------------------

export default function UserPage() {

  const {user} = Account();

  console.log(user)
    
  return (
    <Container>

      <UserView />
     
    </Container>
  );
}
