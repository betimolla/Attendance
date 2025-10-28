import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import contactImage from '../assets/contact.png'
import calanderImage from '../assets/calander.png'
import bgImage from '../assets/background.png'
import { BackButton } from '../component/backButton'

export default function SessionPage() {
  const navigate = useNavigate()
  const [totalStudent, setTotalStudent] = useState(50)
  const [lastSessionDate, setLastSessionDate] = useState('2025-10-23')
  const [showHistory, setShowHistory] = useState(false)
  const [attendanceHistory, setAttendanceHistory] = useState([])

  const handleViewHistory = async () => {
    // Temporary sample data (replace with backend call later)
    const dummyData = [
      { date: '2025-10-20', status: 'Present' },
      { date: '2025-10-21', status: 'Absent' },
      { date: '2025-10-22', status: 'Present' },
    ]
    setAttendanceHistory(dummyData)
    setShowHistory(true)
  }

  const handleCloseHistory = () => {
    setShowHistory(false)
  }

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div
        style={{ width: '700px', minHeight: '500px' }}
        className="p-12 rounded-xl shadow-lg text-center flex flex-col justify-center gap-8 bg-white"
      >
        <h1 className="text-3xl font-bold text-green-700">
          <b>Welcome, Session Admin!</b>
        </h1>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate('/attendance')}
            className="flex-1 h-15 bg-white text-yellow-600 px-5 py-3 text-1xl rounded-lg border-2 border-yellow-600 hover:bg-yellow-600 hover:text-white transition"
          >
            <b>Start Attendance</b>
          </button>

          <button
            onClick={() => navigate('/sessionHistory')}
            className="flex-1 h-15 bg-yellow-600 text-white px-5 py-3 text-1xl rounded-lg hover:bg-white hover:border-yellow-600 hover:border-2 hover:text-yellow-600 transition"
          >
            <b>View History</b>
          </button>
        </div>

        {/* Stats section */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={contactImage} alt="Total Students" className="w-40 h-40" />
            <div className="text-left">
              <p className="text-lg font-semibold">
                Total Students: <span className="text-blue-600">{totalStudent}</span>
              </p>
              <p className="text-gray-600">Currently enrolled</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img src={calanderImage} alt="Calendar" className="w-40 h-40" />
            <div className="text-left">
              <p className="text-lg font-semibold">
                Last Session: <span className="text-gray-600">{lastSessionDate}</span>
              </p>
              <p className="text-gray-600">Attendance Record</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[500px] text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Attendance History</h2>

            <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2">Date</th>
                  <th className="border border-gray-300 px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-3 py-2">{record.date}</td>
                    <td
                      className={`border border-gray-300 px-3 py-2 font-semibold ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleCloseHistory}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}