const axios = require("axios");
let DATABASE = {
  recent: {
    adsInfo: {
      search: { bottom: true, hints: "使用,百度", top: true },
    },
    total: 6987,
    unread_total: 790,
    rss_link: "",
    items: [
      {
        comments: [],
        is_attached_item: true,
        created_at: 1648366715,
        first_by: "mastermeichen",
        pri_sticky_count: 0,
        real_name: "mastermeichen",
        type_name: "bookmark",
        share_link: "https://www.right.com.cn/forum/thread-1586619-1-1.html",
        user_id: 9434282,
        first_by_real_name: "mastermeichen",
        text_view_link:
          "https://www.diigo.com/text_view?url=https%3A%2F%2Fwww.right.com.cn%2Fforum%2Fthread-1586619-1-1.html",
        pub_sticky_count: 0,
        updated_at: 1648366715,
        c_count: 0,
        pri_c_count: 0,
        readed: 1,
        hasDetails: "false",
        groups: [],
        pub_c_count: 0,
        outliners_id: [],
        private: false,
        description:
          "--> <2022-03-27 Sun 15:38:32 UTC+08:00>\n" +
          "不需要开启桥接模式，不需要关闭DHCP，反而是需要使用DHCP或固定IP。\n" +
          "\n" +
          "1. ＂网络配置-无线中继-将无线中继开启＂，直接开启而不加入到网络中（如果直接加入网络，将无法进入路由器的管理页面）\n" +
          "2. ＂专家模式-网络设置-DHCP＂，在开启＂无线中继＂后，会自动开启了＂桥接＂模式，导致路由器的IP跟主路由一致，需要手动切换为DHCP，让路由器的管理页面不发生变化。\n" +
          "3. 再在无线中继里扫描网络，并连接上主路由的WiFi。\n" +
          "\n" +
          "以上操作是解决无法进入路由器管理页面、连接到路由器后IP地址还是跟直连主路由一样的问题。\n" +
          "<-- <2022-03-27 Sun 15:38:32 UTC+08:00>",
        pri_a_count: 0,
        t_name: "设置,无线,信号,扩展,新手,入门,其它,软件,powered,论坛",
        link_id: 626416730,
        title:
          "中兴E8820/E8820s/中继设置无线信号扩展设置 - 新手入门及其它(软件) - 恩山无线论坛 - Powered by Discuz!",
        ouliner_id: [],
        tags: "设置,无线,信号,扩展,新手,入门,其它,软件,powered,论坛",
        mode: 0,
        url: "https://www.right.com.cn/forum/thread-1586619-1-1.html",
        annotations: [],
        pub_a_count: 0,
        u_name: "mastermeichen",
      },
    ],
  },
};
async function index() {
  const count = 3;
  const { status, statusText, data } = await axios.get(
    "https://www.diigo.com/interact_api/load_user_items",
    {
      params: {
        sort: "updated",
        count: count,
      },
      headers: {
        "X-Requested-With": "X-Requested-With",
        cookie: "Cookie: gcc_cookie_id=2e853",
      },
    }
  );
  console.log("response.data", data);
}
index();
