import React from 'react';
import MetricCard from '../Common/MetricCard';
import Chart from '../Common/Chart';
import { Users, TrendingUp, Calendar, DollarSign, UserCheck, AlertTriangle } from 'lucide-react';
import { mockEmployees, mockAttendanceData, mockRecruitmentData } from '../../data/mockData';

const Overview: React.FC = () => {
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const avgSalary = Math.round(mockEmployees.reduce((sum, emp) => sum + emp.salary, 0) / mockEmployees.length);
  const avgAttendance = Math.round(mockEmployees.reduce((sum, emp) => sum + emp.attendanceRate, 0) / mockEmployees.length);
  const openPositions = mockRecruitmentData.filter(pos => pos.stage !== 'hired').length;
  const avgPerformance = mockEmployees.reduce((sum, emp) => sum + emp.performanceRating, 0) / mockEmployees.length;

  const attendanceChartData = mockAttendanceData.slice(-7).map(item => ({
    label: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    value: item.present
  }));

  const departmentData = mockEmployees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentData).map(([dept, count]) => ({
    label: dept,
    value: count
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="hidden sm:block text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
          subtitle={`${activeEmployees} active`}
        />
        <MetricCard
          title="Average Salary"
          value={`$${avgSalary.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 2.1, isPositive: true }}
        />
        <MetricCard
          title="Attendance Rate"
          value={`${avgAttendance}%`}
          icon={Calendar}
          trend={{ value: 1.8, isPositive: false }}
        />
        <MetricCard
          title="Open Positions"
          value={openPositions}
          icon={UserCheck}
          subtitle="Across all departments"
        />
        <MetricCard
          title="Avg Performance"
          value={avgPerformance.toFixed(1)}
          icon={TrendingUp}
          trend={{ value: 3.2, isPositive: true }}
        />
        <MetricCard
          title="Pending Reviews"
          value={8}
          icon={AlertTriangle}
          subtitle="Due this week"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance</h3>
          <Chart data={attendanceChartData} type="line" height={250} color="#10B981" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <Chart data={departmentChartData} type="bar" height={250} color="#3B82F6" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start sm:items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">New employee onboarding</p>
              <p className="text-xs text-gray-500">Sarah Johnson completed her first day</p>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">2 hours ago</div>
          </div>
          
          <div className="flex items-start sm:items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Performance review completed</p>
              <p className="text-xs text-gray-500">Michael Chen received 4.8/5 rating</p>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">5 hours ago</div>
          </div>
          
          <div className="flex items-start sm:items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Training program launched</p>
              <p className="text-xs text-gray-500">Leadership Development course now available</p>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;