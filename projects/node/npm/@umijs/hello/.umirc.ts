import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  // Module parse failed: Unexpected token (16:29)
  // @see https://github.com/umijs/umi/issues/4834
  chainWebpack(memo) {
    memo.module.rule('ts-in-node_modules').include.clear();
    return memo;
  },
});
