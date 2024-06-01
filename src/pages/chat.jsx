import { Helmet } from 'react-helmet-async';

import { ChatView } from 'src/sections/chat';
// ------------------providing metadata----------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Helmet>
        <title> Chat | LT </title>
      </Helmet>

      <ChatView />
    </>
  );
}
