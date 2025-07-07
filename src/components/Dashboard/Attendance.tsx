import React, { useState } from 'react';
import { Calendar, Clock, UserCheck, UserX } from 'lucide-react';
import Chart from '../Common/Chart';
import { mockAttendanceData, mockEmployees } from '../../data/mockData';

const Attendance: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('january');
  const [viewType, setViewType] = useState('overview');

  const attendanceChartData = mockAttendanceData.map(item => ({
    label: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    value: item.present
  }));

  const absenteeismChartData = mockAttendanceData.map(item => ({
    label: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    value: item.absent
  }));

  const totalPresent = mockAttendanceData.reduce((sum, item) => sum + item.present, 0);
  const totalAbsent = mockAttendanceData.reduce((sum, item) => sum + item.absent, 0);
  const totalLate = mockAttendanceData.reduce((sum, item) => sum + item.late, 0);
  const totalDays = mockAttendanceData.length;
  const avgAttendance = Math.round((totalPresent / (totalPresent + totalAbsent)) * 100);

  const attendanceByDepartment = mockEmployees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { present: 0, absent: 0, total: 0, rate: 0 };
    }
    acc[emp.department].total += 1;
    acc[emp.department].present += emp.attendanceRate;
    acc[emp.department].rate = Math.round(acc[emp.department].present / acc[emp.department].total);
    return acc;
  }, {} as Record<string, { present: number; absent: number; total: number; rate: number }>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Attendance & Time Tracking</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 sm:px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="january">January 2024</option>
            <option value="february">February 2024</option>
            <option value="march">March 2024</option>
          </select>
          <select className="hidden sm:block border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed View</option>
            <option value="reports">Reports</option>
          </select>
        </div>
      </div>

      {/* Attendance Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{avgAttendance}%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Present</p>
              <p className="text-2xl font-bold text-gray-900">{totalPresent}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Absent</p>
              <p className="text-2xl font-bold text-gray-900">{totalAbsent}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-gray-900">{totalLate}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Attendance</h3>
          <Chart data={attendanceChartData} type="bar" height={300} color="#10B981" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Absenteeism Trend</h3>
          <Chart data={absenteeismChartData} type="line" height={300} color="#EF4444" />
        </div>
      </div>

      {/* Department Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Attendance Rates</h3>
        <div className="space-y-4">
          {Object.entries(attendanceByDepartment).map(([department, data]) => (
            <div key={department} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
              <div>
                <div className="font-medium text-gray-900">{department}</div>
                <div className="text-sm text-gray-600">{data.total} employees</div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="flex-1 sm:w-48 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${data.rate}%` }}
                  ></div>
                </div>
                <div className="text-lg font-bold text-gray-900 w-12 text-right flex-shrink-0">{data.rate}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Calendar</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-1 sm:p-2 font-medium text-gray-600">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const attendance = 85 + Math.random() * 15; // Mock attendance rate
            const colorClass = attendance >= 95 ? 'bg-green-100 text-green-800' :
                              attendance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800';
            
            return (
              <div key={day} className={`p-1 sm:p-2 rounded-lg ${colorClass} hover:opacity-80 cursor-pointer`}>
                <div className="font-medium">{day}</div>
                <div className="text-xs">{Math.round(attendance)}%</div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>95%+ Attendance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 rounded"></div>
            <span>85-94% Attendance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span>Below 85% Attendance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;