import React from 'react';

interface ChartProps {
  data: Array<{ label: string; value: number }>;
  type: 'bar' | 'line' | 'pie';
  height?: number;
  color?: string;
}

const Chart: React.FC<ChartProps> = ({ data, type, height = 300, color = '#3B82F6' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const padding = 40;

  const renderBarChart = () => {
    const chartWidth = 400;
    const barWidth = Math.max(20, (chartWidth - padding * 2) / data.length - 10);
    const chartHeight = height - padding * 2;

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} className="w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = padding + (chartHeight * (1 - percent / 100));
          return (
            <g key={percent}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-500 hidden sm:block"
              >
                {Math.round((maxValue * percent) / 100)}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const x = padding + index * (barWidth + 10);
          const barHeight = (item.value / maxValue) * chartHeight;
          const y = padding + chartHeight - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                className="hover:opacity-80 transition-opacity"
              />
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                className="text-xs fill-gray-600 hidden sm:block"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderLineChart = () => {
    const chartWidth = 400;
    const pointSpacing = (chartWidth - padding * 2) / (data.length - 1);
    const chartHeight = height - padding * 2;

    const points = data.map((item, index) => ({
      x: padding + index * pointSpacing,
      y: padding + chartHeight - (item.value / maxValue) * chartHeight
    }));

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} className="w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = padding + (chartHeight * (1 - percent / 100));
          return (
            <g key={percent}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-500 hidden sm:block"
              >
                {Math.round((maxValue * percent) / 100)}
              </text>
            </g>
          );
        })}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          className="drop-shadow-sm"
        />

        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={color}
            className="hover:r-6 transition-all"
          />
        ))}

        {/* Labels */}
        {data.map((item, index) => (
          <text
            key={index}
            x={points[index].x}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-gray-600 hidden sm:block"
          >
            {item.label}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg p-2 sm:p-4 overflow-hidden">
      {type === 'bar' && renderBarChart()}
      {type === 'line' && renderLineChart()}
    </div>
  );
};

export default Chart;