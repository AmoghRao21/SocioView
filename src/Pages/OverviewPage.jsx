import React from 'react'
import Header from '../components/common/Header'
import { motion } from 'framer-motion'
import StatCard from '../components/common/StatCard'
import { ChartNoAxesCombined, MessageCircleMore, Share2, ThumbsUp } from 'lucide-react'
import EngagementOverviewChart from '../components/overview/EngagementOverviewChart'
import PostTypeChart from '../components/overview/PostTypeChart'
import EngagementChannelChart from '../components/overview/EngagementChannelChart'


const OverviewPage = () => {
  return (
    <div className='flex-1 overflow-auto relative'>
      <Header title='Overview' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:1}}
        >
          <StatCard 
            name="Average Enagagement" value="849" icon={ChartNoAxesCombined} color="#6366F1"
          />
          <StatCard 
            name="Average Likes" value="500" icon={ThumbsUp} color="#8B5CF6"
          />
          <StatCard 
            name="Average Shares" value="100" icon={Share2} color="#EC4899"
          />
          <StatCard 
            name="Average Comments" value="249" icon={MessageCircleMore} color="#10B981"
          />
        </motion.div>

      {/*charts*/}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <EngagementOverviewChart />
          <PostTypeChart />
          <EngagementChannelChart />
        </div>

      </main>
    </div>
  )
}

export default OverviewPage
