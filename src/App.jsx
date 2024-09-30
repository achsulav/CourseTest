import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './component/courseList';
import CourseDetail from './component/courseDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:navigation" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
