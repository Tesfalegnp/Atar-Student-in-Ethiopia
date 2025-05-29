import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import PostModal from '../components/PostModal';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with actual API call
        // const { data } = await axios.get('/api/posts');
        const mockPosts = [
          {
            id: 1,
            title: 'How to prepare for Calculus exam',
            content: 'Here are some tips for preparing for your calculus exam...',
            author: 'John Doe',
            date: '2023-05-15',
            comments: 5
          },
          {
            id: 2,
            title: 'Best resources for Data Structures',
            content: 'I found these resources helpful when studying data structures...',
            author: 'Jane Smith',
            date: '2023-05-10',
            comments: 3
          }
        ];
        setPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Community Posts</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => {
            setCurrentPost(null);
            setShowModal(true);
          }}>
            <FaPlus className="me-1" /> New Post
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : filteredPosts.length === 0 ? (
        <Card>
          <Card.Body className="text-center">
            <Card.Text>No posts found. Be the first to create one!</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {filteredPosts.map(post => (
            <Col key={post.id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By {post.author} on {post.date}
                  </Card.Subtitle>
                  <Card.Text>
                    {post.content.length > 100 
                      ? `${post.content.substring(0, 100)}...` 
                      : post.content}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => {
                        setCurrentPost(post);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit className="me-1" /> View/Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FaTrash className="me-1" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <PostModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        post={currentPost}
        onSave={(newPost) => {
          if (currentPost) {
            // Update existing post
            setPosts(posts.map(p => p.id === currentPost.id ? newPost : p));
          } else {
            // Add new post
            setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
          }
          toast.success(`Post ${currentPost ? 'updated' : 'created'} successfully`);
        }}
      />
    </Container>
  );
};

export default PostsPage;