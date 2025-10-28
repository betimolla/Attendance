import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sessions = [
  { id: 1, name: 'Fourth Year students', date: '2024-03-15', year: 2025, department: 'Accounting' },
  { id: 2, name: 'Third Year students', date: '2024-03-22', year: 2025, department: 'Sociology' },
  { id: 3, name: 'Second Year students', date: '2024-03-29', year: 2025, department: 'Economics' },
  { id: 4, name: 'First Year students', date: '2024-04-05', year: 2025, department: 'Logistics' },
];

const attendanceData = {
  1: [
    { name: 'student 1', status: 'Present', gender: 'female' },
    { name: 'student 2', status: 'Absent', gender: 'male' },
    { name: 'student 3', status: 'Present', gender: 'male' },
  ],
  2: [
    { name: 'student 1', status: 'Present', gender: 'male' },
    { name: 'student 2', status: 'Present', gender: 'female' },
    { name: 'student 3', status: 'Present', gender: 'male' },
  ],
  3: [
    { name: 'student 1', status: 'Absent', gender: 'female' },
    { name: 'student 2', status: 'Present', gender: 'female' },
  ],
  4: [
    { name: 'student 1', status: 'Present', gender: 'female' },
    { name: 'student 2', status: 'Present', gender: 'female' },
  ],
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Present': return 'bg-green-600';
    case 'Absent': return 'bg-red-600';
    case 'Late': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

export default function AttendanceAnalysis() {
  const navigate = useNavigate();
  const [filterYear, setFilterYear] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterGender, setFilterGender] = useState('All');
  const [expandedSessions, setExpandedSessions] = useState({});

  const years = [...new Set(sessions.map(s => s.year))];

  const toggleDetails = (id) => {
    setExpandedSessions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSessions = sessions.filter(s => {
    if (filterYear !== 'All' && s.year !== parseInt(filterYear)) return false;
    if (filterDepartment !== 'All' && s.department !== filterDepartment) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Attendance Analysis</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="p-2 rounded text-black"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
        >
          <option value="All">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <select
          className="p-2 rounded text-black"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          {[...new Set(sessions.map(s => s.department))].map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <select
          className="p-2 rounded text-black"
          value={filterGender}
          onChange={e => setFilterGender(e.target.value)}
        >
          <option value="All">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Sessions */}
      <div className="w-full max-w-4xl space-y-6">
        {filteredSessions.map(session => {
          const allStudents = attendanceData[session.id] || [];
          const students = allStudents.filter(s => filterGender === 'All' || s.gender.toLowerCase() === filterGender.toLowerCase());
          const totalFiltered = students.length;
          const presentCount = students.filter(s => s.status === 'Present').length;
          const percentPresent = totalFiltered > 0 ? ((presentCount / totalFiltered) * 100).toFixed(1) : 0;
          const isExpanded = expandedSessions[session.id] || false;

          return (
            <div key={session.id} className="bg-[#111] p-4 rounded border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-yellow-400">{session.name} ({session.year})</span>
                <span>
                  {percentPresent}% of {filterGender === 'All' ? 'students' : filterGender}
                  {filterDepartment !== 'All' ? ` in ${session.department}` : ''} present ({presentCount}/{totalFiltered})
                </span>
              </div>

              <button
                onClick={() => toggleDetails(session.id)}
                className="bg-gray-700 px-3 py-1 rounded text-sm mb-2 hover:bg-gray-600 transition"
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>

              {isExpanded && (
                <div className="space-y-1">
                  {students.map((s, i) => {
                    const studentPercent = ((s.status === 'Present' ? 1 : 0) / totalFiltered * 100).toFixed(1);
                    return (
                      <div key={i} className="flex justify-between bg-[#222] p-2 rounded">
                        <span>{s.name}</span>
                        <span className={`${getStatusColor(s.status)} px-2 py-1 rounded text-sm font-semibold`}>
                          {s.status} ({studentPercent}% of class)
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/sessionhistory')}
        className="bg-yellow-500 text-black px-6 py-2 rounded-lg mt-8"
      >
        ← Back To Session History
      </button>
    </div>
  );
}