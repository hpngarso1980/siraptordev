import DashboardWrapper from '@/components/pages/wrapper/DashboardWrapper';
import checkLogin from './guards/check-login';
import checkMe from './guards/check-me';

const UserLogin = () => import(/* webpackChunkName: "user-login" */ '@/components/pages/UserLogin');
const PerformanceMonitoring = () => import(/* webpackChunkName: "performance-monitoring" */ '@/components/pages/PerformanceMonitoring');
const PerformanceMonitoringTemplate = () => import(/* webpackChunkName: "performance-monitoring-template" */ '@/components/pages/PerformanceMonitoringTemplate');
const PerformanceMonitoringTemplateDetail = () => import(/* webpackChunkName: "performance-monitoring-template-detail" */ '@/components/pages/PerformanceMonitoringTemplateDetail');
const PerformanceMonitoringTemplateDetailForm = () => import(/* webpackChunkName: "performance-monitoring-template-detail-form" */ '@/components/pages/PerformanceMonitoringTemplateDetailForm');
const PerformanceMonitoringActionPlan = () => import(/* webpackChunkName: "performance-monitoring-action-plan" */ '@/components/pages/PerformanceMonitoringActionPlan');
const SelfAssessment = () => import(/* webpackChunkName: "self-assessment" */ '@/components/pages/SelfAssessment');
const SelfAssessmentBoard = () => import(/* webpackChunkName: "self-assessment-board" */ '@/components/pages/SelfAssessmentBoard');
const SelfAssessmentSummary = () => import(/* webpackChunkName: "self-assessment-summary" */ '@/components/pages/SelfAssessmentSummary');
const SelfAssessmentStream = () => import(/* webpackChunkName: "self-assessment-stream" */ '@/components/pages/SelfAssessmentStream');
const SelfAssessmentStreamSummary = () => import(/* webpackChunkName: "self-assessment-stream-summary" */ '@/components/pages/SelfAssessmentStreamSummary');
const SelfAssessmentArea = () => import(/* webpackChunkName: "self-assessment-area" */ '@/components/pages/SelfAssessmentArea');
const SelfAssessmentSubArea = () => import(/* webpackChunkName: "self-assessment-sub-area" */ '@/components/pages/SelfAssessmentSubArea');
const SelfAssessmentCriteria = () => import(/* webpackChunkName: "self-assessment-criteria" */ '@/components/pages/SelfAssessmentCriteria');
const SelfAssessmentActionPlan = () => import(/* webpackChunkName: "self-assessment-action-plan" */ '@/components/pages/SelfAssessmentActionPlan');
const ManagementActionPlan = () => import(/* webpackChunkName: "management-action-plan" */ '@/components/pages/ManagementActionPlan');
const StreamScoreBoard = () => import(/* webpackChunkName: "stream-score-board" */ '@/components/pages/StreamScoreBoard');
const UserScoreBoard = () => import(/* webpackChunkName: "user-score-board" */ '@/components/pages/UserScoreBoard');
const UserSettings = () => import(/* webpackChunkName: "user-settings" */ '@/components/pages/UsersSettings');
const ProfileSettings = () => import(/* webpackChunkName: "profile-settings" */ '@/components/pages/ProfileSettings');
const Notifications = () => import(/* webpackChunkName: "notifications" */ '@/components/pages/Notifications');
const Tasks = () => import(/* webpackChunkName: "tasks" */ '@/components/pages/Tasks');
const ActionPlanCategories = () => import(/* webpackChunkName: "action-plan-categories" */ '@/components/pages/ActionPlanCategories');
const RankGroups = () => import(/* webpackChunkName: "rank-groups" */ '@/components/pages/RankGroups');

const perfMonitoringPath = (path = '') => `/monitoring-kinerja${path}`;
const selfAssessmentPath = (path = '') => `/self-assessment${path}`;

export default [
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
    beforeEnter: checkLogin,
  },
  {
    path: '/',
    component: DashboardWrapper,
    beforeEnter: checkMe,
    children: [
      {
        path: '/',
        name: 'Home',
        redirect: perfMonitoringPath(),
      },
      {
        path: perfMonitoringPath(),
        name: 'PerformanceMonitoring',
        component: PerformanceMonitoring,
      },
      {
        path: perfMonitoringPath('/template'),
        name: 'PerformanceMonitoringTemplate',
        component: PerformanceMonitoringTemplate,
      },
      {
        path: perfMonitoringPath('/template/:id'),
        name: 'PerformanceMonitoringTemplateDetail',
        component: PerformanceMonitoringTemplateDetail,
      },
      {
        path: perfMonitoringPath('/template/:id/edit'),
        name: 'PerformanceMonitoringTemplateDetailFormEdit',
        component: PerformanceMonitoringTemplateDetailForm,
      },
      {
        path: perfMonitoringPath('/action-plan'),
        name: 'PerformanceMonitoringActionPlan',
        component: PerformanceMonitoringActionPlan,
      },
      {
        path: selfAssessmentPath(),
        name: 'SelfAssessment',
        component: SelfAssessment,
      },
      {
        path: selfAssessmentPath('/stream/:id/ringkasan/:epicId'),
        name: 'SelfAssessmentStreamSummary',
        component: SelfAssessmentStreamSummary,
      },
      {
        path: selfAssessmentPath('/stream'),
        name: 'SelfAssessmentStream',
        component: SelfAssessmentStream,
      },
      {
        path: selfAssessmentPath('/area'),
        name: 'SelfAssessmentArea',
        component: SelfAssessmentArea,
      },
      {
        path: selfAssessmentPath('/sub-area'),
        name: 'SelfAssessmentSubArea',
        component: SelfAssessmentSubArea,
      },
      {
        path: selfAssessmentPath('/kriteria-penilaian'),
        name: 'SelfAssessmentCriteria',
        component: SelfAssessmentCriteria,
      },
      {
        path: selfAssessmentPath('/penguatan-kinerja-proses'),
        name: 'SelfAssessmentActionPlan',
        component: SelfAssessmentActionPlan,
      },
      {
        path: selfAssessmentPath('/:id/ringkasan'),
        name: 'SelfAssessmentSummary',
        component: SelfAssessmentSummary,
      },
      {
        path: selfAssessmentPath('/:id'),
        name: 'SelfAssessmentBoard',
        component: SelfAssessmentBoard,
      },
      {
        path: '/rapat-tinjauan-manajemen',
        name: 'ManagementActionPlan',
        component: ManagementActionPlan,
      },
      {
        path: '/stream-score-board',
        name: 'StreamScoreBoard',
        component: StreamScoreBoard,
      },
      {
        path: '/user-score-board',
        name: 'UserScoreBoard',
        component: UserScoreBoard,
      },
      {
        path: '/pengaturan/pengguna',
        name: 'UsersSettings',
        component: UserSettings,
      },
      {
        path: '/profil',
        name: 'ProfileSettings',
        component: ProfileSettings,
      },
      {
        path: '/notifikasi',
        name: 'Notifications',
        component: Notifications,
      },
      {
        path: '/pekerjaan',
        name: 'Tasks',
        component: Tasks,
      },
      {
        path: '/kategori-action-plan',
        name: 'ActionPlanCategories',
        component: ActionPlanCategories,
      },
      {
        path: '/level-ranking',
        name: 'RankGroups',
        component: RankGroups,
      },
    ],
  },
  {
    path: '*',
    redirect: perfMonitoringPath(),
  },
];
