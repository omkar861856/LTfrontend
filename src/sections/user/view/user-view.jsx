
import Container from '@mui/material/Container';

import { user_api } from 'src/services/userapi';
import Account from 'src/_mock/account';





// ----------------------------------------------------------------------

export default function UserPage() {

  const {user} = Account();

  console.log(user)
    
  return (
    <Container>

      comming soon...
     
    </Container>
  );
}
