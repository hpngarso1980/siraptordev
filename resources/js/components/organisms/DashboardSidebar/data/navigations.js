import p from '@/configs/permissions';

export default [
  {
    _name: 'CSidebarNav',
    _children: [

      /** Featured item */
      {
        _name: 'CSidebarNavItem',
        name: 'Monitoring Kinerja',
        to: { name: 'PerformanceMonitoring' },
        icon: 'cil-speedometer',
        permissions: '*',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Self Assessment',
        to: { name: 'SelfAssessment' },
        icon: 'cil-task',
        permissions: '*',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Score Board Stream',
        to: { name: 'StreamScoreBoard' },
        icon: 'cil-star',
        permissions: '*',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Score Board PIC',
        to: { name: 'UserScoreBoard' },
        icon: 'cil-star',
        permissions: '*',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Action Plan Monitoring Kinerja',
        to: { name: 'PerformanceMonitoringActionPlan' },
        icon: 'cil-pencil',
        permissions: '*',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Action Plan Penguatan Kinerja Proses',
        to: { name: 'SelfAssessmentActionPlan' },
        icon: 'cil-pencil',
        permissions: '*',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Action Plan Rapat Tinjauan Manajemen',
        to: { name: 'ManagementActionPlan' },
        icon: 'cil-pencil',
        permissions: '*',
      },

      /** Performance Monitoring Configuration */
      {
        _name: 'CSidebarNavTitle',
        _children: ['Pengaturan Monitoring Kinerja'],
        permissions: [
          p.MANAGE_PERFORMANCE_MONITORING,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Periode Monitoring Kinerja',
        to: { name: 'PerformanceMonitoringTemplate' },
        icon: 'cil-file',
        permissions: [
          p.MANAGE_PERFORMANCE_MONITORING,
        ],
      },

      /** Self Assessment Configuration */
      {
        _name: 'CSidebarNavTitle',
        _children: ['Pengaturan Self Assessment'],
        permissions: [
          p.MANAGE_SELF_ASSESSMENT,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Master Data Stream',
        to: { name: 'SelfAssessmentStream' },
        icon: 'cil-list',
        permissions: [
          p.MANAGE_SELF_ASSESSMENT,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Master Data Area',
        to: { name: 'SelfAssessmentArea' },
        icon: 'cil-list',
        permissions: [
          p.MANAGE_SELF_ASSESSMENT,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Master Data Sub Area',
        to: { name: 'SelfAssessmentSubArea' },
        icon: 'cil-list',
        permissions: [
          p.MANAGE_SELF_ASSESSMENT,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Master Data Kriteria Penilaian',
        to: { name: 'SelfAssessmentCriteria' },
        icon: 'cil-list',
        permissions: [
          p.MANAGE_SELF_ASSESSMENT,
        ],
      },

      /** Common Admin Configuration */
      {
        _name: 'CSidebarNavTitle',
        _children: ['Area Admin'],
        permissions: [
          p.MANAGE_USER,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kategori Action Plan',
        to: { name: 'ActionPlanCategories' },
        icon: 'cil-list',
        permissions: [
          p.MANAGE_PERFORMANCE_MONITORING_ACTION_PLAN,
          p.MANAGE_SELF_ASSESSMENT_ACTION_PLAN,
          p.MANAGE_MANAGEMENT_ACTION_PLAN,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Level Ranking',
        to: { name: 'RankGroups' },
        icon: 'cil-list',
        permissions: [
          p.MANAGE_USER,
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Pengaturan Pengguna',
        to: { name: 'UsersSettings' },
        icon: 'cil-people',
        permissions: [
          p.MANAGE_USER,
        ],
      },
    ],
  },
];
