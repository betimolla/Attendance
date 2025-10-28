import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../component/backButton';

export default function sessionHistory() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterYearEnabled, setFilterYearEnabled] = useState(true);
  const [filterGenderEnabled, setFilterGenderEnabled] = useState(false);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterGender, setFilterGender] = useState('All');

  // Sessions & filtered sessions
  const [sessions] = useState([
    { id: 1, name: 'Fourth Year students', date: '2024-03-15', rate: '88%', year: 2025 },
    { id: 2, name: 'Third Year students', date: '2024-03-22', rate: '92%', year: 2025 },
    { id: 3, name: 'Second Year students', date: '2024-03-29', rate: '78%', year: 2025 },
    { id: 4, name: 'First Year students', date: '2024-04-05', rate: '90%', year: 2025 },
  ]);
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  // Attendance Data
  const attendanceData = {
    1: [{ name: 'Martha Lee', status: 'Present', gender: 'female' }, { name: 'Paul Green', status: 'Absent', gender: 'female' }],
    2: [{ name: 'Alice Smith', status: 'Present', gender: 'male' }, { name: 'Bob Johnson', status: 'Present', gender: 'female' }, { name: 'Charlie Brown', status: 'Present', gender: 'male' }],
    3: [{ name: 'David King', status: 'Absent', gender: 'female' }, { name: 'Sophie Lane', status: 'Present', gender: 'female' }],
    4: [{ name: 'Brian Cox', status: 'Present', gender: 'female' }, { name: 'Olivia Ray', status: 'Present', gender: 'female' }],
  };

  const getAttendanceSummary = (sessionId) => {
    const data = attendanceData[sessionId] || [];
    const summary = { Present: 0, Absent: 0 };
    data.forEach((student) => {
      if (summary[student.status] !== undefined) summary[student.status]++;
    });
    return summary;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-600';
      case 'Absent': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  // Apply filters whenever filter/search changes
  useEffect(() => {
    let filtered = sessions;

    if (filterYearEnabled) {
      filtered = filtered.filter(s => s.year === filterYear);
    }

    if (filterGenderEnabled && filterGender !== 'All') {
      filtered = filtered.filter(session =>
        (attendanceData[session.id] || []).some(student => student.gender === filterGender)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredSessions(filtered);
  }, [sessions, searchQuery, filterYearEnabled, filterGenderEnabled, filterYear, filterGender]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <div className="w-full max-w-6xl bg-[#111] p-8 rounded-xl shadow-lg border border-gray-700">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-400">Session Attendance History</h1>

          <div className="flex gap-3">
            {/* New Button: Go to Attendance Analysis */}
            <button
              onClick={() => navigate('/attendance-analysis')} // Make sure your route matches this
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-blue-400 transition"
            >
              Attendance Analysis
            </button>

            {/* Add Session */}
            <button
              onClick={() => alert('Add Session clicked')}
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition"
            >
              + Add Session
            </button>
          </div>
        </div>


        {/* Search + Filter Toggle */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search session name..."
            className="p-2 rounded flex-1 bg-black text-gray-300 border border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Filter {showFilterPanel ? '▲' : '▼'}
          </button>
        </div>

        {/* Filter Panel */}
        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="bg-gray-800 p-4 rounded mb-6 w-full max-w-lg shadow-lg">
            {/* Year Filter */}
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={filterYearEnabled} onChange={() => setFilterYearEnabled(!filterYearEnabled)} />
              <label>Filter by Year</label>
              {filterYearEnabled && (
                <select className="ml-auto p-2 rounded text-black" value={filterYear} onChange={(e) => setFilterYear(parseInt(e.target.value))}>
                  {[...new Set(sessions.map(s => s.year))].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Gender Filter */}
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={filterGenderEnabled} onChange={() => setFilterGenderEnabled(!filterGenderEnabled)} />
              <label>Filter by Gender</label>
              {filterGenderEnabled && (
                <select className="ml-auto p-2 rounded text-black" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                  <option value="All">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
            </div>

            {/* Apply Button */}
            <button
              onClick={() => {
                let filtered = sessions;

                if (filterYearEnabled) {
                  filtered = filtered.filter(s => s.year === filterYear);
                }

                if (filterGenderEnabled && filterGender !== 'All') {
                  filtered = filtered.filter(session =>
                    (attendanceData[session.id] || []).some(student => student.gender === filterGender)
                  );
                }

                if (searchQuery) {
                  filtered = filtered.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
                }

                setFilteredSessions(filtered);
                setShowFilterPanel(false); // hide panel after applying
              }}
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition mt-2"
            >
              Apply
            </button>
          </div>
        )}


        {/* Sessions Table */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600 text-yellow-400">
                  <th className="py-2">Session Name</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Rate</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                    <td className="py-2">{session.name}</td>
                    <td className="py-2">{session.date}</td>
                    <td className="py-2 text-yellow-400">{session.rate}</td>
                    <td className="py-2">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Details */}
          {selectedSession && (
            <div className="flex-1 bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 animate-fadeIn">
              <h2 className="text-lg font-semibold mb-4 text-yellow-400">
                Attendance for {selectedSession.name} ({selectedSession.year})
              </h2>
              <div className="flex gap-4 mb-4">
                {Object.entries(getAttendanceSummary(selectedSession.id)).map(([status, count]) => (
                  <div key={status} className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(status)}`}>
                    {status}: {count}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {attendanceData[selectedSession.id]
                  ?.filter(student => filterGender === 'All' || student.gender.toLowerCase() === filterGender.toLowerCase())
                  .map((student, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#222] p-3 rounded hover:bg-[#333] transition">
                      <span>{student.name}</span>
                      <span className={`${getStatusColor(student.status)} px-3 py-1 rounded text-sm font-semibold`}>
                        {student.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/sessionAdmin')}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg shadow-md hover:bg-yellow-400 hover:scale-105 transition-transform duration-200 font-semibold"
          >
            ← Back To Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}