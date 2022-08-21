计算假设每次中奖概率为 2%，连续抽奖 45 次中至少中一次奖的概率为多少？
https://www.zhihu.com/question/29587261

2022-08-21 16:33:44

# 探索

## 绘制图线

http://tools.jb51.net/jisuanqi/fun_draw

100 年，概率 0.002。

```
1-Math.pow(1-2933 / 1412709,x*12)
0-100
```

## 示例

ECharts 教程
https://www.runoob.com/try/try.php?filename=tryecharts_intro

http://tools.jb51.net/jisuanqi/fun_draw

```js
//line图
function get_line_option(text, subtext, yAxis_name, y_format, x_data, y_data) {
  option = {
    title: {
      text: text,
      subtext: subtext,
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      x: 60,
      y: 60,
      x2: 25,
      y2: 25,
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataZoom: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    dataZoom: {
      show: false,
      start: 0,
      end: plot_cnt,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        name: "x",
        data: x_data,
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        name: yAxis_name,
        axisLabel: {
          formatter: "{value} " + y_format,
        },
      },
    ],
    series: [
      {
        name: yAxis_name,
        type: "line",
        data: y_data,
      },
    ],
  };
  return option;
}
```
