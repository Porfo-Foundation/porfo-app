export const config = {
  screens: {
    MainStack: {
      path: 'app',
      screens: {
        // initialRouteName: 'TabScreens',
        // TabScreens: {
        //   path: 'cards',
        // },
        Connections: {
          screens: {
            ConnectionDetail: {
              path: 'card/:cardHash',
            },
          },
        },
      },
    },
  },
};
export const linking = {
  prefixes: ['https://meu.world', 'meu://'],
  config,
};
