/* Concert program and roster, in English and Chinese.
   Every [en, zh] pair is shown in the current language. Performer lists are
   written in Chinese as in the printed program; NAMES gives the English spelling.
   Edit the data below to change the schedule or roster. */
(function () {
  'use strict';

  var NAMES = {
    '蔡纳新': 'Naxin Cai', '王建国': 'Jianguo Wang', '陈亚和': 'Yahe Chen', '蒋平': 'Ping Jiang',
    '何雪炀': 'Xueyang He', '冯皓': 'Hao Feng', '杨氢': 'Qing Yang', '张博': 'Bo Zhang',
    '张春瀛': 'Chunying Zhang', '郑志桐': 'Zhitong Zheng', '伍仲仁': 'Zhongren Wu', '余波': 'Bo Yu',
    '曾颃': 'Hang Zeng', '辜晓虎': 'Xiaohu Gu', '张静雨': 'Jingyu Zhang', '赵健': 'Jian Zhao',
    '李兆刚': 'Zhaogang Li', '余品绚': 'Pinxuan Yu', '徐晓天': 'Xiaotian Xu', '陈贵平': 'Guiping Chen',
    '杨远园': 'Yuanyuan Yang', '余晓明': 'Xiaoming Yu', '赵波': 'Bo Zhao', '邓军': 'Jun Deng',
    '老枪': 'Lao Qiang', '劳乐生': 'Lesheng Lao', '王蕊': 'Rui Wang',
    '杨劲松': 'Jinsong Yang', '钱练': 'Lian Qian', '温迪': 'Di Wen', '张莹': 'Ying Zhang',
    '刘耀斌': 'Yaobin Liu', '李欣源': 'Xinyuan Li', '秦朴': 'Pu Qin',
    '老炮合唱团': 'Philadelphia Old Boys Choir',
    '老炮小乐队': 'Old Boys Mini Band',
    '鹏飞音乐室小乐队': 'Pengfei Music Studio Band'
  };

  var CHOIR = '老炮合唱团';
  var BAND = '老炮小乐队';
  var SIX = '蔡纳新,王建国,何雪炀,冯皓,陈亚和,蒋平';
  var MP3 = ['Recorded track (MP3)', 'MP3'];

  var LABELS = {
    vocals: ['Vocals', '演唱'],
    played: ['Performed by', '演奏'],
    harmony: ['Harmony', '和声'],
    accomp: ['Accompaniment', '伴奏'],
    piano: ['Piano', '钢琴伴奏']
  };

  var PROGRAM = [
    { part: ['TE Student Opening Performance', 'TE 学生开场表演'], opening: true, items: [
      { title: ['Johnny B Goodie & Forgetting Things (original)', 'Johnny B Goodie & Forgetting Things（原创）'], credits: [
        ['vocals', ["Andrew Sun (10 yrs), Tigue Berkobin (9 yrs), Tigue's Dad", 'Andrew Sun（10岁）、Tigue Berkobin（9岁）、Tigue 的爸爸']],
        ['accomp', ['Electric guitar & drums', '电吉他和鼓']]] },
      { title: ['Friedrich Seitz: Student Concerto No. 2 in G Major (violin solo)', 'Friedrich Seitz：G大调第2号学生协奏曲（小提琴独奏）'], credits: [
        ['played', ['Ethan Lin (10 yrs)', 'Ethan Lin（10岁）']]] },
      { title: ['Classic Songs Medley (guitar)', '经典乐曲串烧（吉他）'], credits: [
        ['played', ['Derek Zhao (13 yrs)', 'Derek Zhao（13岁）']]] }
    ] },
    { part: ['First half', '上半场'], items: [
      { title: ['Setting Off', '《启程》'], credits: [['vocals', '蔡纳新,王建国'], ['harmony', '陈亚和,蒋平'], ['accomp', BAND]] },
      { title: ['You, My Desk Mate', '《同桌的你》'], credits: [['vocals', CHOIR], ['accomp', BAND]] },
      { title: ['Shaolin, Shaolin', '《少林，少林》'], credits: [['vocals', CHOIR], ['accomp', ['John Zhang (accordion)', 'John Zhang（手风琴）']]] },
      { title: ['Songs of Teresa Teng', '《邓丽君的歌》'], credits: [['vocals', ['Meggie Cao (guest)', 'Meggie Cao（嘉宾）']], ['accomp', '鹏飞音乐室小乐队']] },
      { title: ['Take Me Home, Country Roads', '《Take Me Home, Country Roads》'], credits: [['vocals', '蔡纳新,王建国,冯皓,陈亚和,杨氢,Paul Li,何雪炀,张博,张春瀛'], ['accomp', BAND]] },
      { title: ['Autumn Cicada', '《秋蝉》'], credits: [['vocals', SIX], ['accomp', BAND]] },
      { title: ['Smoke Rising Again', '《又见炊烟》'], credits: [['vocals', SIX], ['accomp', BAND]] },
      { title: ['Xihai Love Song', '《西海情歌》'], credits: [['vocals', '何雪炀'], ['accomp', BAND]] },
      { title: ['Daylily', '《萱草花》'], credits: [['vocals', ['Choir family members (guests), choir members', '老炮家属（嘉宾）、老炮团员']], ['accomp', BAND]] }
    ] },
    { interval: ['Intermission: lucky draw', '中场休息（幸运抽奖）'] },
    { part: ['Second half', '下半场'], items: [
      { title: ['Bon Voyage', '《祝你一路顺风》'], credits: [['vocals', '蔡纳新'], ['accomp', BAND]] },
      { title: ['Late', '《迟到》'], credits: [['vocals', '蔡纳新,王建国'], ['accomp', BAND]] },
      { title: ['The Story of Time', '《光阴的故事》'], credits: [['vocals', '王建国,冯皓,蔡纳新'], ['accomp', BAND]] },
      { title: ['Ah, Friend, Farewell!', '《啊，朋友，再见！》'], credits: [['vocals', SIX], ['accomp', BAND]] },
      { title: ['The Maple Leaves Turn Red', '《枫叶红了》'], credits: [['vocals', '蔡纳新,王建国,何雪炀,冯皓,陈亚和'], ['accomp', BAND]] },
      { title: ['The Sound of Silence / Ordinary Road', '《Sound of Silence》《平凡之路》'], credits: [['vocals', ['Echo Music Group (guests)', 'Echo（回声）声乐组合（嘉宾）']], ['accomp', MP3]] },
      { title: ['You Raise Me Up', '《You Raise Me Up》'], credits: [['vocals', '杨氢,蔡纳新,蒋平,王建国,郑志桐,张春瀛,Paul Li,张博'], ['accomp', MP3]] },
      { title: ['Hunters’ Chorus', '《猎人合唱》'], credits: [['vocals', CHOIR], ['piano', 'Grace']] }
    ] }
  ];

  var ROSTER = [
    { name: ['Philadelphia Old Boys Choir', '费城老炮男声合唱团'], roles: [
      [['President', '团长'], '蒋平'],
      [['Conductor', '指挥'], '余晓明'],
      [['Piano', '钢琴伴奏'], 'Grace'],
      [['Tenor 1', '男高1'], '蔡纳新,王建国,Paul Li,杨氢,伍仲仁,余波,Chris,曾颃'],
      [['Tenor 2', '男高2'], '何雪炀,冯皓,辜晓虎,张静雨,John Zhang,赵健,李兆刚'],
      [['Baritone', '男中'], '陈亚和,郑志桐,张博,余品绚'],
      [['Bass', '男低'], '蒋平,张春瀛,徐晓天,陈贵平']] },
    { name: ['Old Boys Mini Band', '老炮小乐队'], roles: [
      [['Keyboard', '键盘'], '伍仲仁'],
      [['Guitar', '吉他'], '辜晓虎,蒋平'],
      [['Electronic wind instrument', '电吹管'], '徐晓天'],
      [['Violin', '小提琴'], '陈亚和'],
      [['Bass guitar', '贝司'], 'Chris'],
      [['Percussion', '打击乐器'], 'Chris,王建国']] },
    { name: ['Echo Music Group (guest)', '回声音乐组合（嘉宾）'], roles: [
      [['Members', '成员'], '杨劲松,钱练,温迪,张莹,刘耀斌,李欣源,秦朴']] },
    { name: ['Production crew', '制作团队'], roles: [
      [['Concert producers', '节目制作'], 'Lei Chen,蒋平,Tracy Sun'],
      [['Event planners', '活动策划'], 'Grace Yu,Corey Han'],
      [['Artistic directors', '艺术总监'], '蒋平,余晓明'],
      [['Sound', '音响设备'], '蔡纳新,辜晓虎'],
      [['Stage managers', '舞台监督'], 'John Zhang,Sam'],
      [['Program directors', '节目总监'], '蒋平,杨远园'],
      [['Promotion', '广告宣传'], 'Lei Chen,杨远园'],
      [['Photography', '摄影'], '老枪,劳乐生,王蕊'],
      [['Video', '录影'], '赵波,邓军']] }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // A performer list is either "a,b,c" (Chinese names, translated via NAMES) or an [en, zh] pair.
  function names(v, i) {
    if (Array.isArray(v)) return esc(v[i]);
    return v.split(',').map(function (n) {
      n = n.trim();
      return esc(i ? n : (NAMES[n] || n));
    }).join(i ? '、' : ', ');
  }

  function render(lang) {
    var i = lang === 'zh' ? 1 : 0;
    var sep = i ? '：' : ': ';
    var prog = document.getElementById('program');
    var roster = document.getElementById('roster');
    if (!prog && !roster) return;

    if (prog) {
      var n = 0;
      prog.innerHTML = PROGRAM.map(function (block) {
        if (block.interval) {
          return '<p class="prog-break"><svg aria-hidden="true"><use href="#i-leaf"/></svg><span>' + esc(block.interval[i]) + '</span></p>';
        }
        var tag = block.opening ? 'ul' : 'ol';
        var start = block.opening ? '' : ' start="' + (n + 1) + '"';
        var items = block.items.map(function (it) {
          var badge = block.opening ? '<span class="num dot" aria-hidden="true">♪</span>' : '<span class="num" aria-hidden="true">' + (++n) + '</span>';
          var credits = it.credits.map(function (c) {
            return '<p class="meta"><span class="lbl">' + LABELS[c[0]][i] + sep + '</span>' + names(c[1], i) + '</p>';
          }).join('');
          return '<li class="prog-item">' + badge + '<div><h4>' + esc(it.title[i]) + '</h4>' + credits + '</div></li>';
        }).join('');
        return '<div class="prog-part' + (block.opening ? ' opening' : '') + '"><h3 class="prog-head">' + esc(block.part[i]) + '</h3>' +
          '<' + tag + ' class="prog-list"' + start + '>' + items + '</' + tag + '></div>';
      }).join('');
    }

    if (roster) {
      roster.innerHTML = ROSTER.map(function (g) {
        return '<article class="band"><h4>' + esc(g.name[i]) + '</h4><dl>' + g.roles.map(function (r) {
          return '<dt>' + esc(r[0][i]) + '</dt><dd>' + names(r[1], i) + '</dd>';
        }).join('') + '</dl></article>';
      }).join('');
    }
  }

  document.addEventListener('voa:lang', function (e) { render(e.detail); });
})();
