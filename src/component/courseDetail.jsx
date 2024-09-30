import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseDetail = () => {
  const { navigation } = useParams();  
  const [course, setCourse] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://api.codenp.com/api/shared/blog/getBlogByBlogNavigation?navigation=${navigation}`
        );

        if (response.data && response.data.succeeded) {
          setCourse(response.data.data); 
        } else {
          setError("Error",error);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details.");
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [navigation]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {course ? (
        <div>
          <h1>{course.title}</h1>
          <img src={course.coverImageUrl.replace(/\\/g, '/')} alt={course.title} style={{ width: '100%', borderRadius: '8px' }} />
          <p>{course.content}</p> {/* Assuming `content` is part of the course details */}
        </div>
      ) : (
        <div>No course details found.</div>
      )}
    </div>
  );
};

export default CourseDetail;
