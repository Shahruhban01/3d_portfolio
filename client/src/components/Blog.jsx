import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchPosts } from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="blog" className="section blog-section">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section blog-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Blog</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Thoughts on technology, development, and creative coding
          </p>
        </motion.div>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              className="blog-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="blog-header">
                <span className="blog-date">{formatDate(post.createdAt)}</span>
                <div className="blog-tags">
                  {post.tags && post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">
                {post.content ? post.content.substring(0, 150) + '...' : ''}
              </p>
              
              <button className="blog-read-more">
                Read More →
              </button>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <p className="no-posts-message">No blog posts yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default Blog;
