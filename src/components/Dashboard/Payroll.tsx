import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, FileText } from 'lucide-react';
import Chart from '../Common/Chart';
import { mockEmployees } from '../../data/mockData';

const Payroll: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [viewType, setViewType] = useState('summary');

  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalPayroll / mockEmployees.length;
  const departments = [...new Set(mockEmployees.map(emp => emp.department))];

  const salaryByDepartment = departments.map(dept => ({
    label: dept,
    value: mockEmployees
      .filter(emp => emp.department === dept)
      .reduce((sum, emp) => sum + emp.salary, 0)
  }));

  const salaryDistribution = [
    { label: '<$50K', value: mockEmployees.filter(emp => emp.salary < 50000).length },
    { label: '$50K-$70K', value: mockEmployees.filter(emp => emp.salary >= 50000 && emp.salary < 70000).length },
    { label: '$70K-$90K', value: mockEmployees.filter(emp => emp.salary >= 70000 && emp.salary < 90000).length },
    { label: '$90K+', value: mockEmployees.filter(emp => emp.salary >= 90000).length }
  ];

  const payrollHistory = [
    { month: 'Jan', amount: 485000 },
    { month: 'Feb', amount: 492000 },
    { month: 'Mar', amount: 498000 },
    { month: 'Apr', amount: 505000 },
    { month: 'May', amount: 512000 },
    { month: 'Jun', amount: 518000 }
  ];

  const payrollHistoryData = payrollHistory.map(item => ({
    label: item.month,
    value: item.amount / 1000 // Convert to K for display
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payroll Management</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 sm:px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="current">Current Month</option>
            <option value="previous">Previous Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <span className="hidden sm:inline">Process Payroll</span>
            <span className="sm:hidden">Process</span>
          </button>
        </div>
      </div>

      {/* Payroll Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Salary</p>
              <p className="text-2xl font-bold text-gray-900">${Math.round(avgSalary).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Employees</p>
              <p className="text-2xl font-bold text-gray-900">{mockEmployees.length}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reports</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll by Department</h3>
          <Chart data={salaryByDepartment} type="bar" height={300} color="#8B5CF6" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll History</h3>
          <Chart data={payrollHistoryData} type="line" height={300} color="#10B981" />
        </div>
      </div>

      {/* Salary Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Distribution</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {salaryDistribution.map((range, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{range.value}</div>
              <div className="text-sm text-gray-600">{range.label}</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(range.value / mockEmployees.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Payroll Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 min-w-[200px]">Employee</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 hidden sm:table-cell">Department</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900">Base Salary</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 hidden md:table-cell">Bonus</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 hidden lg:table-cell">Deductions</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900">Net Pay</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 hidden xl:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEmployees.map((employee) => {
                const bonus = Math.floor(employee.salary * 0.1 * (employee.performanceRating / 5));
                const deductions = Math.floor(employee.salary * 0.2); // Tax + benefits
                const netPay = employee.salary + bonus - deductions;
                
                return (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">{employee.name}</div>
                          <div className="text-sm text-gray-500 truncate">{employee.email}</div>
                          <div className="text-xs text-blue-600 sm:hidden">{employee.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {employee.department}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-gray-900 text-sm">${employee.salary.toLocaleString()}</td>
                    <td className="p-3 sm:p-4 text-gray-900 text-sm hidden md:table-cell">${bonus.toLocaleString()}</td>
                    <td className="p-3 sm:p-4 text-gray-900 text-sm hidden lg:table-cell">${deductions.toLocaleString()}</td>
                    <td className="p-3 sm:p-4 text-gray-900 font-medium text-sm">${netPay.toLocaleString()}</td>
                    <td className="p-3 sm:p-4 hidden xl:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Processed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">This Month</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Pay:</span>
              <span className="font-medium">${totalPayroll.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bonuses:</span>
              <span className="font-medium">${(totalPayroll * 0.05).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deductions:</span>
              <span className="font-medium">${(totalPayroll * 0.2).toLocaleString()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Net Payroll:</span>
              <span>${(totalPayroll * 0.85).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">YTD Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium">${(totalPayroll * 6).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Withheld:</span>
              <span className="font-medium">${(totalPayroll * 0.15 * 6).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Benefits:</span>
              <span className="font-medium">${(totalPayroll * 0.05 * 6).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
              Generate Payroll Report
            </button>
            <button className="w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
              Export to Excel
            </button>
            <button className="w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
              Tax Summary
            </button>
            <button className="w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
              Benefits Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;