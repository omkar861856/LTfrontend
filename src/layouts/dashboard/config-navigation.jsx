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
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_courses'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'invoices',
    path: '/dashboard/invoices',
    icon: icon('ic_form'),
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: icon('ic_form'),
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
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_courses'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
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
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: icon('ic_courses'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  }, 
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: icon('ic_form'),
  },
 
];
