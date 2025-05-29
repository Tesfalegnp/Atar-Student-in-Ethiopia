import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaPaperPlane, FaUserFriends } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Mock chat data
  const [chats, setChats] = useState([
    { id: 1, name: 'General Group', isGroup: true, lastMessage: 'Hello everyone!', unread: 2 },
    { id: 2, name: 'Computer Science Group', isGroup: true, lastMessage: 'Assignment due tomorrow', unread: 0 },
    { id: 3, name: 'John Doe', isGroup: false, lastMessage: 'Did you see the notes?', unread: 1 },
    { id: 4, name: 'Jane Smith', isGroup: false, lastMessage: 'Thanks for the help!', unread: 0 }
  ]);

  // Mock users data
  const users = [
    { id: 1, name: 'John Doe', online: true },
    { id: 2, name: 'Jane Smith', online: true },
    { id: 3, name: 'Mike Johnson', online: false },
    { id: 4, name: 'Sarah Williams', online: true }
  ];

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('onlineUsers');
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString()
    };

    if (socket) {
      socket.emit('sendMessage', {
        chatId: activeChat,
        message: newMessage
      });
    }

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Chats</h5>
              <Badge bg="success">{onlineUsers.length} Online</Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-3 position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" />
              </div>
              <ListGroup variant="flush">
                {filteredChats.map(chat => (
                  <ListGroup.Item
                    key={chat.id}
                    action
                    active={activeChat === chat.id}
                    onClick={() => {
                      setActiveChat(chat.id);
                      // Load messages for this chat
                      setMessages([
                        {
                          id: 1,
                          text: chat.lastMessage,
                          sender: chat.name.split(' ')[0],
                          timestamp: '10:30 AM'
                        },
                        {
                          id: 2,
                          text: 'Hello there!',
                          sender: 'You',
                          timestamp: '10:25 AM'
                        }
                      ]);
                    }}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <strong>{chat.name}</strong>
                      <div className="text-muted small">{chat.lastMessage}</div>
                    </div>
                    {chat.unread > 0 && (
                      <Badge bg="danger" pill>
                        {chat.unread}
                      </Badge>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>
              <h5 className="mb-0">Online Users</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {users.filter(u => u.online).map(user => (
                  <ListGroup.Item
                    key={user.id}
                    action
                    onClick={() => {
                      // Check if chat exists, if not create new
                      const existingChat = chats.find(c => !c.isGroup && c.name === user.name);
                      if (existingChat) {
                        setActiveChat(existingChat.id);
                      } else {
                        const newChat = {
                          id: chats.length + 1,
                          name: user.name,
                          isGroup: false,
                          lastMessage: '',
                          unread: 0
                        };
                        setChats([...chats, newChat]);
                        setActiveChat(newChat.id);
                      }
                    }}
                  >
                    <FaUserFriends className="me-2 text-success" />
                    {user.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {activeChat ? (
            <Card className="h-100">
              <Card.Header>
                <h5 className="mb-0">
                  {chats.find(c => c.id === activeChat)?.name}
                </h5>
              </Card.Header>
              <Card.Body
                style={{
                  height: '400px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column-reverse'
                }}
              >
                <div>
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`mb-2 d-flex ${message.sender === 'You' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div
                        className={`p-2 rounded ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-light'}`}
                        style={{ maxWidth: '70%' }}
                      >
                        {message.sender !== 'You' && (
                          <div className="fw-bold">{message.sender}</div>
                        )}
                        <div>{message.text}</div>
                        <div className={`small ${message.sender === 'You' ? 'text-white-50' : 'text-muted'} text-end`}>
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer>
                <Form onSubmit={handleSendMessage}>
                  <div className="d-flex">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Type your message here..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <Button variant="primary" type="submit" className="ms-2">
                      <FaPaperPlane />
                    </Button>
                  </div>
                </Form>
              </Card.Footer>
            </Card>
          ) : (
            <Card className="h-100">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <h4>Select a chat to start messaging</h4>
                <p className="text-muted">Or start a new conversation with an online user</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;