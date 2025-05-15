'use client'
import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

const Page = () => {
  const automationItems = [
    {
      id: 1,
      title: "Direct traffic towards website",
      date: "October 5th 2024",
      active: true
    },
    {
      id: 2,
      title: "Automated customer responses",
      date: "October 3rd 2024",
      active: true
    },
    {
      id: 3,
      title: "Lead qualification system",
      date: "September 28th 2024",
      active: false
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-6 gap-5 p-4 md:p-6"
    >
      {/* Main Automation List */}
      <motion.div 
        className="lg:col-span-4"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AutomationList />
      </motion.div>

      {/* Side Panel */}
      <motion.div
        className="lg:col-span-2"
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="flex flex-col rounded-xl bg-background border border-gray-200 dark:border-gray-800 gap-y-6 p-6 overflow-hidden shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -2 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <h2 className="text-xl font-semibold">Automations</h2>
            </div>
            <p className="text-muted-foreground">
              Your live automations will show here.
            </p>
          </motion.div>

          {/* Automation Items */}
          <div className="flex flex-col gap-y-4">
            {automationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex flex-col">
                  <h3 className="font-medium flex items-center gap-2">
                    {item.active && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    )}
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.date}
                  </p>
                </div>
                {item.active ? (
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ x: 2 }}>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Create Automation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <CreateAutomation />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Page