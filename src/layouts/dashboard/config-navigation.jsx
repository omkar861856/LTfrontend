import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  // {
  //   title: 'New enquirey',
  //   path: '/dashboard/newenquirey',
  //   icon: icon('ic_form'),
  // },
  {
    title: ' admin dashboard',
    path: '/dashboard',
    icon: icon('ic_home'),
  },
  {
    title: 'new enquiry',
    path: '/dashboard/newenquiry',
    icon: icon('ic_enquiry'),
  },
  {
    title: 'all enquirys',
    path: '/dashboard/allenquirys',
    icon: icon('ic_allenquiry'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_users'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_allcourses'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blogs'),
  },
  {
    title: 'invoices',
    path: '/dashboard/invoices',
    icon: icon('ic_invoices'),
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: icon('ic_chat'),
  },
  // ==================  Not Found and Login routes  ===========================
  // {
  //   title: 'login',
  //   path: '/',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

// student - dashboard, users, courses, blog

export const navStudentConfig = [
  // {
  //   title: 'New enquirey',
  //   path: '/dashboard/newenquirey',
  //   icon: icon('ic_form'),
  // },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_home'),
  },
  {
    title: 'new enquiry',
    path: '/dashboard/newenquiry',
    icon: icon('ic_enquiry'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_users'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_allcourses'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blogs'),
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: icon('ic_chat'),
  },
 
];

// mentor - dashboard, users, courses, blog, chat


export const navMentorConfig = [
  // {
  //   title: 'New enquirey',
  //   path: '/dashboard/newenquirey',
  //   icon: icon('ic_form'),
  // },
  {
    title: 'mentor dashboard',
    path: '/dashboard',
    icon: icon('ic_home'),
  },
  {
    title: 'new enquiry',
    path: '/dashboard/newenquiry',
    icon: icon('ic_enquiry'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_users'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_allcourses'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blogs'),
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: icon('ic_chat'),
  },
 
];
