import authentication from './authentication'
import info from './info'
import performanceMonitoring from './performance-monitoring'
import userSettings from './user-settings'
import managementActionPlans from './managemen-action-plans'
import profile from './profile'
import selfAssessment from './self-assessment'
import epics from './epics'
import tasks from './tasks'

export default {
  ...authentication,
  ...info,
  ...performanceMonitoring,
  ...userSettings,
  ...managementActionPlans,
  ...profile,
  ...selfAssessment,
  ...epics,
  ...tasks,
}
