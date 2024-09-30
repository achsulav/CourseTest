import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://api.codenp.com/api/shared/blog/getPublishedBlogs');
        console.log(response.data); 

        if (response.data && response.data.succeeded ) {
          setCourses(response.data.data);
        } else {
          setCourses([]); 
        }

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (navigation) => {
    navigate(`/course/${navigation}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course.navigation} // Use navigation as the key
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              width: '250px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={() => handleCourseClick(course.navigation)}
          >
            <img
              src={course.coverImageUrl.replace(/\\/g, '/')} 
              alt={course.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{course.title}</h3>
            <p>{course.briefOverview}</p>
          </div>
        ))
      ) : (
        <div>No courses found.</div>
      )}
    </div>
  );
};

export default CourseList;
