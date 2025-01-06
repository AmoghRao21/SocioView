import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const EnagagementData = [
	{ 
        name: "Jan",
        reel: 749,
        carousel: 941.75,
        photo:653,  
    },
    { 
        name: "Feb",
        reel: 836,
        carousel: 958,
        photo: 730,  
    },
    { 
        name: "Mar",
        reel: 840,
        carousel: 938,
        photo:749,  
    },
    { 
        name: "Apr",
        reel: 890,
        carousel: 956,
        photo: 715,  
    },
    { 
        name: "May",
        reel: 875,
        carousel: 953,
        photo:746,  
    },
    { 
        name: "Jun",
        reel: 980,
        carousel: 970,
        photo:653,  
    },
    { 
        name: "Jul",
        reel: 1047,
        carousel: 955,
        photo:700,  
    },
    { 
        name: "Aug",
        reel: 1050,
        carousel: 941.75,
        photo:749,  
    },
    { 
        name: "Sep",
        reel: 1000,
        carousel: 942.75,
        photo: 723,  
    },
    { 
        name: "Oct",
        reel: 1047,
        carousel: 941.75,
        photo:749,  
    },
    { 
        name: "Nov",
        reel: 1047,
        carousel: 941.75,
        photo:749,  
    },
    { 
        name: "Dec",
        reel: 1047,
        carousel: 941.75,
        photo:749,  
    },
]
	


const EngagementOverviewChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2
        className="text-lg font-medium mb-4 text-gray-100"
      >Engagement Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart data={EnagagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke='#4B5563' />
            <XAxis dataKey={'name'} />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
            }}
            itemStyle={{ color: "#E5E7EB" }}
        />
        <Legend />
            <Line type='monotone'
							dataKey='reel'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }} />
            <Line type='monotone' 
                            dataKey='carousel'
                            stroke='#8884d8'
                            strokeWidth={3}
                            dot={{ fill: "#8884d8", strokeWidth: 2, r: 6}}
                            activeDot={{ r: 8, strokeWidth: 2}} />
            <Line type='monotone' 
                            dataKey='photo'
                            stroke='#02f570'
                            strokeWidth={3}
                            dot={{ fill: "#02f570", strokeWidth: 2, r: 6}}
                            activeDot={{ r: 8, strokeWidth: 2}} />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </motion.div>
  )
}

export default EngagementOverviewChart

