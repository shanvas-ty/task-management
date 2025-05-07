import React, { useState } from 'react';

const Blog = () => {
  const [expanded, setExpanded] = useState([false, false, false, false]);

  const toggleReadMore = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const blogPosts = [
    {
      title: 'Top 5 Productivity Hacks',
      summary: 'Discover the top 5 time-saving productivity hacks used by high achievers to get more done in less time.',
      details: 'From the Pomodoro Technique to batching similar tasks, these methods help you focus and eliminate distractions for better results every day.'
    },
    {
      title: 'Why Task Management Fails',
      summary: 'Learn about the common mistakes people make with task management tools and how to avoid them for better results.',
      details: 'Lack of clear goals, unrealistic to-do lists, and neglecting regular reviews often lead to failure. Fixing these can dramatically boost productivity.'
    },
    {
      title: 'The Power of Daily Planning',
      summary: 'Daily planning isn’t just a habit, it’s a superpower. See how 10 minutes every morning can save you hours later.',
      details: 'With just 10 minutes of planning, you can prioritize tasks, reduce stress, and achieve more by focusing on what truly matters.'
    },
    {
      title: 'Must-Have Features in Task Tools',
      summary: 'Not all task tools are made equal. Here are the features you should look for when choosing the right one.',
      details: 'A good task tool should offer reminders, collaboration, subtasks, priority tags, and a clean UI to improve your workflow efficiently.'
    }
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">Our Blog</h1>
      <p className="lead">
        Welcome to our blog! Here, we share tips, insights, and news to help you stay productive and organized.
      </p>

      <div className="row">
        {blogPosts.map((post, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">{post.title}</h5>
                <p className="card-text">{post.summary}</p>
                {expanded[index] && (
                  <p className="card-text text-muted">{post.details}</p>
                )}
                <button
                  className="btn btn-outline-primary"
                  onClick={() => toggleReadMore(index)}
                >
                  {expanded[index] ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;
