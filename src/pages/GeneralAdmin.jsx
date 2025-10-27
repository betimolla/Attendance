import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GeneralAdmin = () => {
  const navigate = useNavigate();

  // Academic Dates state
  const [academicYear, setAcademicYear] = useState("");
  const [academicDate, setAcademicDate] = useState("");
  const [academicEntries, setAcademicEntries] = useState([]);

  // Courses state
  const [courseYear, setCourseYear] = useState("1st Year");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseEntries, setCourseEntries] = useState([]);

  // Add Academic Date
  const handleAddAcademicDate = () => {
    if (academicYear && academicDate) {
      const newEntry = {
        id: crypto.randomUUID(),
        year: academicYear,
        date: academicDate,
      };
      setAcademicEntries([...academicEntries, newEntry]);
      setAcademicYear("");
      setAcademicDate("");
    } else {
      alert("Please enter both year and date.");
    }
  };

  // Delete Academic Date
  const handleDeleteAcademic = (id) => {
    setAcademicEntries(academicEntries.filter((entry) => entry.id !== id));
  };

  // Edit Academic Date
  const handleEditAcademic = (id) => {
    const entry = academicEntries.find((e) => e.id === id);
    if (entry) {
      setAcademicYear(entry.year);
      setAcademicDate(entry.date);
      setAcademicEntries(academicEntries.filter((e) => e.id !== id));
    }
  };

  // Add Course
  const handleAddCourse = () => {
    if (courseName && courseId) {
      const newCourse = {
        id: crypto.randomUUID(),
        year: courseYear,
        name: courseName,
        courseId: courseId,
      };
      setCourseEntries([...courseEntries, newCourse]);
      setCourseName("");
      setCourseId("");
    } else {
      alert("Please enter course name and ID.");
    }
  };

  // Delete Course
  const handleDeleteCourse = (id) => {
    setCourseEntries(courseEntries.filter((course) => course.id !== id));
  };

  // Edit Course
  const handleEditCourse = (id) => {
    const course = courseEntries.find((c) => c.id === id);
    if (course) {
      setCourseYear(course.year);
      setCourseName(course.name);
      setCourseId(course.courseId);
      setCourseEntries(courseEntries.filter((c) => c.id !== id));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/gbiphoto.jpg')" }}
    >
      <h1 className="text-4xl font-bold text-yellow-500 text-center mb-12 drop-shadow-lg">
        Welcome (General Admin)
      </h1>

      <div className="flex justify-center gap-16">
        {/* Academic Dates */}
        <div className="bg-white/90 p-6 rounded-lg shadow-md w-[450px]">
          <h2 className="text-xl font-semibold mb-4">Add Academic Dates</h2>

          <label className="block mb-2">Enter Academic Year</label>
          <input
            type="text"
            placeholder="YYYY"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full h-8 rounded-md border border-gray-300 mb-4 px-2"
          />

          <label className="block mb-2">Enter Date</label>
          <input
            type="date"
            value={academicDate}
            onChange={(e) => setAcademicDate(e.target.value)}
            className="w-full h-9 rounded-md border border-gray-300 mb-4 px-2"
          />

          <button
            onClick={handleAddAcademicDate}
            className="w-full h-8 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Add
          </button>

          {academicEntries.length > 0 && (
            <table className="mt-4 w-full border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-1 border">Academic Year</th>
                  <th className="px-2 py-1 border">Date</th>
                  <th className="px-2 py-1 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {academicEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-2 py-1 border">{entry.year}</td>
                    <td className="px-2 py-1 border">{entry.date}</td>
                    <td className="px-2 py-1 border flex gap-2">
                      <button
                        onClick={() => handleEditAcademic(entry.id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAcademic(entry.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Courses */}
        <div className="bg-white/90 p-6 rounded-lg shadow-md w-[350px]">
          <h2 className="text-xl font-semibold mb-4">Add Course</h2>

          <label className="block mb-2">Academic Year</label>
          <select
            value={courseYear}
            onChange={(e) => setCourseYear(e.target.value)}
            className="w-full h-9 rounded-md border border-gray-300 mb-4 px-2"
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <label className="block mb-2">Course Name</label>
          <input
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full h-9 rounded-md border border-gray-300 mb-4 px-2"
          />

          <label className="block mb-2">Course ID</label>
          <input
            type="text"
            placeholder="Enter course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full h-9 rounded-md border border-gray-300 mb-4 px-2"
          />

          <button
            onClick={handleAddCourse}
            className="flex items-center gap-2 w-full h-9 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            <span className="text-xl">+</span> Add
          </button>

          {courseEntries.length > 0 && (
            <table className="mt-4 w-full border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-1 border">Year</th>
                  <th className="px-2 py-1 border">Course Name</th>
                  <th className="px-2 py-1 border">Course ID</th>
                  <th className="px-2 py-1 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {courseEntries.map((course) => (
                  <tr key={course.id}>
                    <td className="px-2 py-1 border">{course.year}</td>
                    <td className="px-2 py-1 border">{course.name}</td>
                    <td className="px-2 py-1 border">{course.courseId}</td>
                    <td className="px-2 py-1 border flex gap-2">
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={() => navigate("/")}
          className="w-32 h-10 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button className="w-32 h-10 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default GeneralAdmin;
