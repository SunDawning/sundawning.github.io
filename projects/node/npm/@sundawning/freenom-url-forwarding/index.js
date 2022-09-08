module.exports = {
  redirect,
  getCookie,
  getDomainID,
  isURLForading,
  getToken,
  urlForwarding,
  tryAxios,
  getDomains,
};
/**
 * freenom
 * @param {string} url 重定向到的URL
 * @returns
 */
async function redirect({ username, password, domain, url } = {}) {
  if (url === undefined) {
    console.log("freenom缺少重定向URL");
    return;
  }
  if (domain === undefined) {
    console.log("freenom缺少域名");
    return;
  }
  const DATABASE = {
    cookie: "",
    id: "",
    domain,
    username,
    password,
  };
  DATABASE.cookie = await getCookie(DATABASE.username, DATABASE.password); // 获取cookie
  DATABASE.id = await getDomainID(DATABASE.cookie, DATABASE.domain); // 获取domain的id
  const _isURLForading = await isURLForading(DATABASE.id, DATABASE.cookie, url); // 是否已经设置了URL重定向
  if (_isURLForading === true) {
    return;
  }
  const token = await getToken(DATABASE.cookie); // 得到token
  await urlForwarding(DATABASE.id, DATABASE.cookie, token, url); // 设置了URL重定向
  console.log("域名重定向到", DATABASE.domain, "=>", url);
}
/**
 * 得到token
 * @param {string} cookie
 * @returns
 */
async function getToken(cookie) {
  try {
    const axios = require("axios");
    const { data } = await axios({
      method: "GET",
      url: "https://my.freenom.com/clientarea.php?action=domaindetails",
      headers: {
        cookie,
      },
    });
    // console.log(data);
    const match = data.match(
      /<input type="hidden" name="token" value="(.*)" \/>/
    );
    if (match === null) {
      return;
    }
    const [full, token] = match;
    console.log(token);
    return token;
  } catch (error) {
    console.log(error.message);
  }
}
/**
 * 是否已经设置了URL重定向
 * @param {number} id 域名的ID
 * @param {string} cookie
 * @param {string} url 重定向到的URL
 * @returns
 */
async function isURLForading(id, cookie, url) {
  try {
    const axios = require("axios");
    const { data } = await axios({
      method: "GET",
      url: `https://my.freenom.com/clientarea.php?action=domaindetails&id=${id}&modop=custom&a=urlforwarding`,
      headers: {
        cookie,
      },
    });
    if (data.match(url)) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
/**
 * 设置了URL重定向
 * @param {number} id 域名的ID
 * @param {string} cookie
 * @param {string} token
 * @param {string} url 重定向到的URL
 * @returns
 */
async function urlForwarding(id, cookie, token, url) {
  try {
    const axios = require("axios");
    const { data } = await axios({
      method: "POST",
      url: "https://my.freenom.com/clientarea.php?action=domaindetails",
      headers: {
        cookie,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: require("qs").stringify({
        token, // 6f50dc87856f2ed8b897a982dd30665555677608
        id,
        modop: "custom",
        a: "urlforwarding",
        save: true,
        url,
        mode: "301_redirect",
      }),
    });
    if (data.match(url)) {
      console.log(url);
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function getCookie(username, password) {
  // 登录过程
  let cookie;
  // 1. GET https://my.freenom.com/clientarea.php 获取set-cookie
  {
    const { data, headers } = await tryAxios({
      method: "GET",
      url: "https://my.freenom.com/clientarea.php",
      maxRedirects: 0,
      // @see https://github.com/axios/axios/issues/953
      validateStatus: function (status) {
        return status >= 200 && status <= 303;
      },
    });
    // console.log(headers);
    const setCookie = headers["set-cookie"];
    console.log(
      "1. GET https://my.freenom.com/clientarea.php 获取set-cookie",
      setCookie
    );
    cookie = setCookie[0].split(";")[0];
  }
  let token;
  // 2. 302重定向 GET https://my.freenom.com/clientarea.php，带上cookie请求，获取token
  {
    const { data, headers } = await tryAxios({
      method: "GET",
      url: "https://my.freenom.com/clientarea.php",
      headers: {
        cookie,
      },
    });
    // console.log(data);
    const match = data.match(
      /<input type="hidden" name="token" value="(.*)" \/>/
    );
    token = match[1];
    console.log(
      "2. 302重定向 GET https://my.freenom.com/clientarea.php，带上cookie请求，获取token",
      token
    );
  }
  // 3. POST https://my.freenom.com/dologin.php，带上cookie、token、账号和密码，content-type: application/x-www-form-urlencoded，获取新的cookie
  {
    const { data, headers } = await tryAxios({
      method: "POST",
      url: "https://my.freenom.com/dologin.php",
      headers: {
        cookie,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: require("qs").stringify({
        token, // 6f50dc87856f2ed8b897a982dd30665555677608
        username,
        password,
      }),
      maxRedirects: 0,
      // @see https://github.com/axios/axios/issues/953
      validateStatus: function (status) {
        return status >= 200 && status <= 303;
      },
    });
    const setCookie = headers["set-cookie"];
    console.log(
      "3. POST https://my.freenom.com/dologin.php，带上cookie、token、账号和密码，content-type: application/x-www-form-urlencoded，获取新的cookie",
      setCookie
    );
    cookie = setCookie[0].split(";")[0];
  }
  return cookie;
  // 4. 302重定向 GET https://my.freenom.com/clientarea.php，带上cookie请求
}
async function tryAxios(options) {
  try {
    const axios = require("axios");
    const response = await axios(options);
    return response;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}
/**
 * 获取domain的id
 * @param {string} cookie
 * @param {string} domain
 * @returns
 */
async function getDomainID(cookie, domain) {
  const { data, headers } = await tryAxios({
    method: "GET",
    url: "https://my.freenom.com/clientarea.php?action=domains",
    headers: { cookie },
  });
  const { JSDOM } = require("jsdom");
  let jsdom = new JSDOM(data);
  const domains = getDomains(jsdom.window.document);
  console.log("domains", domains);
  if (domains.length === 0) {
    return;
  }
  let _domains = domains.filter(function (_domain) {
    return _domain.domain === domain;
  });
  if (_domains.length === 0) {
    return;
  }
  return _domains[0].id;
}
/**
 *
 * @param {document} document
 * @returns object
 * @example
 * getDomains(document);
 * 
 * ```json
[
  {
    domain: "sundawning.ml",
    registration: "2022-07-30",
    expiry: "2023-07-30",
    status: "Active",
    type: "Free",
    id: "1135433180",
  },
];
 * ```
 */
function getDomains(document) {
  let tbody = document.querySelector("#bulkactionform > table > tbody");
  tbody = Object.values(tbody.children);
  return tbody.map(function (tr) {
    tr = tr.getElementsByTagName("td");
    tr = Object.values(tr);
    let domain = new URL(tr[0].querySelector("a").href).host; // innerText在jsdom里不起作用
    let registration = tr[1].innerHTML;
    let expiry = tr[2].innerHTML;
    let status = tr[3].querySelector("span").innerHTML;
    let type = tr[4].innerHTML;
    let id = new URL(tr[5].querySelector("a").href).searchParams.get("id");
    return { domain, registration, expiry, status, type, id };
  });
}
