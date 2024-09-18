import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ProjectOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dataview',
    name: 'dataview',
    component: Layout,
    meta: {
      sort: 10,
      isRoot: true,
      activeMenu: 'dataview_index',
      icon: renderIcon(ProjectOutlined),
    },
    children: [
      {
        path: 'index',
        name: `dataview_index`,
        meta: {
          title: '数字大屏',
          activeMenu: 'dataview_index',
        },
        component: () => import('@/views/dataview/index.vue'),
      },
    ],
  },
];

export default routes;
