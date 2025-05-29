import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Badge } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import PostModal from '../components/PostModal';
import '../styles/PostsPage.css'; // Create this CSS file for custom styles

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with actual API call
        // const { data } = await axios.get('/api/posts');
        const mockPosts = [
          {
            id: 1,
            title: 'How to prepare for Calculus exam',
            content: 'Here are some tips for preparing for your calculus exam. Start by reviewing all the fundamental theorems and practice problems from each section. Create a study schedule and stick to it, allocating more time to topics you find challenging.',
            author: 'John Doe',
            date: '2023-05-15',
            comments: 5,
            likes: 12,
            tags: ['math', 'study tips', 'calculus'],
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 2,
            title: 'Best resources for Data Structures',
            content: 'I found these resources helpful when studying data structures. The book "Introduction to Algorithms" by Cormen is excellent for theory, while LeetCode and HackerRank provide great practice problems. YouTube channels like freeCodeCamp offer fantastic tutorials.',
            author: 'Jane Smith',
            date: '2023-05-10',
            comments: 3,
            likes: 8,
            tags: ['programming', 'computer science', 'algorithms'],
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 3,
            title: 'Effective time management techniques',
            content: 'After trying various methods, I found the Pomodoro technique combined with time blocking to be most effective. Work for 25 minutes, then take a 5-minute break. After four cycles, take a longer break. Plan your day in blocks dedicated to specific tasks.',
            author: 'Alex Johnson',
            date: '2023-05-20',
            comments: 7,
            likes: 15,
            tags: ['productivity', 'study tips'],
            image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? {...post, likes: post.likes - 1} : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? {...post, likes: post.likes + 1} : post
      ));
    }
  };

  const filteredPosts = posts.filter(post =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (activeFilter === 'all' || post.tags.includes(activeFilter))
  );

  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <Container fluid className="posts-page">
      <Row className="header-section mb-5">
        <Col className="text-center py-5">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="display-4 fw-bold text-white"
          >
            Community Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lead text-white"
          >
            Share knowledge, ask questions, and connect with peers
          </motion.p>
        </Col>
      </Row>

      <Container className="main-content">
        <Row className="mb-4 justify-content-between align-items-center">
          <Col md={8}>
            <motion.div whileHover={{ scale: 1.01 }}>
              <div className="search-box">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search posts by title, content or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </motion.div>
          </Col>
          <Col md={4} className="text-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="primary" 
                onClick={() => {
                  setCurrentPost(null);
                  setShowModal(true);
                }}
                className="new-post-btn"
              >
                <FaPlus className="me-2" /> Create New Post
              </Button>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <div className="filter-tags">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`filter-tag ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Topics
              </motion.button>
              {allTags.map(tag => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`filter-tag ${activeFilter === tag ? 'active' : ''}`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-5"
          >
            <Card className="no-results-card">
              <Card.Body>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="No results" 
                  className="no-results-img mb-3"
                />
                <h4>No posts found</h4>
                <p className="text-muted">Try adjusting your search or create the first post!</p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setCurrentPost(null);
                    setShowModal(true);
                  }}
                >
                  Create Post
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        ) : (
          <Row>
            <AnimatePresence>
              {filteredPosts.map(post => (
                <Col key={post.id} xs={12} className="mb-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="post-card">
                      <Row className="g-0">
                        {post.image && (
                          <Col md={4} className="post-image-col">
                            <div 
                              className="post-image"
                              style={{ backgroundImage: `url(${post.image})` }}
                            />
                          </Col>
                        )}
                        <Col md={post.image ? 8 : 12}>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <Card.Title className="post-title">{post.title}</Card.Title>
                              <div className="post-actions">
                                <Button 
                                  variant="link" 
                                  size="sm"
                                  onClick={() => {
                                    setCurrentPost(post);
                                    setShowModal(true);
                                  }}
                                  className="action-btn"
                                >
                                  <FaEdit />
                                </Button>
                                <Button 
                                  variant="link" 
                                  size="sm"
                                  onClick={() => handleDelete(post.id)}
                                  className="action-btn"
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <span className="post-author">{post.author}</span>
                              <span className="post-date mx-2">•</span>
                              <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                            <Card.Text className="post-content">
                              {post.content.length > 200 
                                ? `${post.content.substring(0, 200)}...` 
                                : post.content}
                            </Card.Text>
                            <div className="post-tags mb-3">
                              {post.tags.map(tag => (
                                <Badge key={tag} pill bg="light" text="dark" className="me-2 tag-pill">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="post-stats">
                              <Button 
                                variant="link" 
                                className={`stat-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                                onClick={() => handleLike(post.id)}
                              >
                                <FaHeart className="me-1" /> {post.likes}
                              </Button>
                              <Button variant="link" className="stat-btn">
                                <FaComment className="me-1" /> {post.comments}
                              </Button>
                              <Button variant="link" className="stat-btn">
                                <FaShare className="me-1" /> Share
                              </Button>
                            </div>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </AnimatePresence>
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
              setPosts([{ 
                ...newPost, 
                id: Math.max(...posts.map(p => p.id), 0) + 1,
                likes: 0,
                comments: 0,
                date: new Date().toISOString().split('T')[0]
              }, ...posts]);
            }
            toast.success(`Post ${currentPost ? 'updated' : 'created'} successfully`);
          }}
        />
      </Container>
    </Container>
  );
};

export default PostsPage;