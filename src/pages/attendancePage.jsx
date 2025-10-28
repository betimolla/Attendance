import { useState } from 'react'

export default function AttendancePage() {
  const [academicYear, setAcademicYear] = useState('')
  const [date, setDate] = useState('')
  const [showAttendanceBox, setShowAttendanceBox] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [studentData, setStudentData] = useState(null)
  const [showSuccessBox, setShowSuccessBox] = useState(false)
  const [recordedStudents, setRecordedStudents] = useState([]);


  const handleStartAttendance = () => {
    if (!academicYear || !date) {
      alert('Please select Academic Year and Date')
      return
    }
    setShowAttendanceBox(true)
  }

  const handleFetchStudent = () => {
    if (!studentId || studentId.length !== 4) {
      return alert('Enter a valid 4-digit Student ID');
    }

    if (studentId === '1234') {

      setStudentData({ id: '1234', name: 'kebede abebe' });
    } else {

      alert('Student not found');
    }
  };


  //   try {
  //     const response = await fetch(`/api/students/${studentId}`)
  //     if (!response.ok) throw new Error('Student not found')
  //     const data = await response.json()
  //     setStudentData(data)
  //   } catch (err) {
  //     alert(err.message)
  //   }
  // }
  const handleFinishAttendance = () => {
    if (!studentData) return;


    setRecordedStudents(prev => [...prev, studentData]);
    setShowSuccessBox(true);
  }




  const handleNextStudent = () => {
    setStudentId('')
    setStudentData(null)
    setShowSuccessBox(false)
  }

  const handleDoneAttendance = () => {
    if (studentData) {
      // Save last student before finishing
      setRecordedStudents(prev => [...prev, studentData]);
    }

    // Send recordedStudents to backend
    console.log('Sending to backend:', recordedStudents);

    // Reset everything
    setStudentId('');
    setStudentData(null);
    setShowSuccessBox(false);
    setShowAttendanceBox(false);
    setRecordedStudents([]);
  }



  const handleBackToID = () => {
    setStudentData(null); // clears current entry
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="p-12 rounded-xl shadow-lg w-[700px] flex flex-col gap-6 bg-white">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">
          Session Attendance Setup
        </h1>

        <label htmlFor="year">Academic Year:</label>
        <select
          id="year"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Year</option>
          <option value="firstYear">First Year</option>
          <option value="secondYear">Second Year</option>
          <option value="thirdYear">Third Year</option>
          <option value="fourthYear">Fourth Year</option>
        </select>

        <label htmlFor="date">Date & Time:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleStartAttendance}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition w-full"
        >
          Start Attendance
        </button>

        {showAttendanceBox && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 relative"
              style={{ width: '400px', maxWidth: '95%' }}>



              {!showSuccessBox ? (
                <>
                  {!studentData ? (
                    <>
                      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
                      <label htmlFor="studentId">Enter Student ID:</label>
                      <input
                        type="text"
                        placeholder="1234"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="border p-2 rounded w-full mb-3"
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={handleFetchStudent}
                          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition flex-1"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold">Student Name: {studentData.name}</p>
                      <p className="text-gray-600">ID: {studentData.id}</p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleFinishAttendance}
                          className="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-700 transition flex-1"
                        >
                          Mark as Present
                        </button>
                        <button
                          onClick={handleBackToID}
                          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition flex-1"
                        >
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p className="text-yellow-600 font-bold text-xl mb-4">
                    Attendance recorded for {studentData.name} Succesfully!
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleNextStudent}
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition flex-1"
                    >
                      Next Student
                    </button>
                    <button
                      onClick={handleDoneAttendance}
                      className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition flex-1"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}