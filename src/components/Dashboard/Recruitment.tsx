import React, { useState } from 'react';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { mockRecruitmentData } from '../../data/mockData';

const Recruitment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const stages = ['applied', 'screening', 'interview', 'hired', 'rejected'];
  const stageColors = {
    applied: 'bg-blue-100 text-blue-800',
    screening: 'bg-yellow-100 text-yellow-800',
    interview: 'bg-purple-100 text-purple-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const filteredPositions = mockRecruitmentData.filter(position => 
    position.position.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStage === 'all' || position.stage === filterStage)
  );

  const stageStats = stages.map(stage => ({
    stage,
    count: mockRecruitmentData.filter(pos => pos.stage === stage).length
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Recruitment Pipeline</h2>
        <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span className="hidden sm:inline">Add Position</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
            >
              <option value="all">All Stages</option>
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {stageStats.map(({ stage, count }) => (
          <div key={stage} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-xs sm:text-sm text-gray-600 capitalize">{stage}</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(count / mockRecruitmentData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Kanban</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stages.map(stage => (
            <div key={stage} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 capitalize">{stage}</h4>
                <span className="text-sm text-gray-500">
                  {mockRecruitmentData.filter(pos => pos.stage === stage).length}
                </span>
              </div>
              <div className="space-y-3">
                {mockRecruitmentData
                  .filter(pos => pos.stage === stage)
                  .map(position => (
                    <div key={position.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900 text-sm truncate pr-2">{position.position}</h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[position.priority]}`}>
                          {position.priority}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2 truncate">{position.department}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{position.applicants} applicants</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Position List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Position Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 min-w-[200px]">Position</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 hidden sm:table-cell">Department</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900">Applicants</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900">Stage</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900 hidden md:table-cell">Priority</th>
                <th className="text-left p-3 sm:p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPositions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 sm:p-4">
                    <div className="font-medium text-gray-900 truncate">{position.position}</div>
                    <div className="text-xs text-blue-600 sm:hidden">{position.department}</div>
                  </td>
                  <td className="p-3 sm:p-4 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {position.department}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-gray-900">{position.applicants}</td>
                  <td className="p-3 sm:p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageColors[position.stage]}`}>
                      {position.stage}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[position.priority]}`}>
                      {position.priority}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm hidden sm:inline">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recruitment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">This Month</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">New Applications:</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interviews Conducted:</span>
              <span className="font-medium">28</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Offers Made:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hires:</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Time to Hire:</span>
              <span className="font-medium">18 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Offer Accept Rate:</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cost per Hire:</span>
              <span className="font-medium">$2,400</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Source Quality:</span>
              <span className="font-medium">8.2/10</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">Interview Panel</div>
              <div className="text-sm text-blue-700">Tomorrow, 2:00 PM</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900">Offer Review</div>
              <div className="text-sm text-yellow-700">Friday, 10:00 AM</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Onboarding</div>
              <div className="text-sm text-green-700">Next Monday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;