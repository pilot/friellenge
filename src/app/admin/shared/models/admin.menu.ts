export const ADMIN_MENU = [
  {
    icon: 'widgets',
    title: 'Friellenges',
    path: 'challenges',
  }, {
    icon: 'collections',
    title: 'Шаблоны Friellenge',
    path: 'templates',
    // submenu: [
    //   {
    //     title: 'Список Шаблонов',
    //     path: 'templates',
    //   }, {
    //     title: 'Создать Шаблон',
    //     path: 'template/create',
    //   }
    // ]
  }, {
    icon: 'people',
    title: 'Пользователи',
    path: 'users',
  }, {
    icon: 'sms_failed',
    title: 'Жалобы',
    path: 'complaints',
    submenu: [
      {
        title: 'Пользователи',
        path: 'complaints/users',
      }, {
        title: 'Friellenges',
        path: 'complaints/challenges',
      }
    ]
  }, {
    title: 'Платежи',
    icon: 'credit_card',
    path: '',
    submenu: [
      {
        title: 'Выплаты',
        path: 'payouts',
      }, {
        title: 'Donations',
        path: 'donations',
      }
    ]
  }, {
    title: 'Settings',
    icon: 'settings',
    path: 'settings'
  }
];

