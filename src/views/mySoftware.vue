<template>
  <div class="h-[calc(100vh-64px)] bg-#f5f5f5">
    <el-scrollbar class="h-full pt-64">
      <div class="w-1440 mx-a pt-20 pb-60">
        <h1 class="text-36 font-bold text-gray-800 mb-50 text-center">{{ currentTitle }}</h1>
        <ul>
          <li
              v-for="(project, index) in currentProjects"
              :key="project.name"
              class="flex items-center justify-between gap-5% h-auto py-15 mb-40">
            <div class="flex-1 w-full flex items-center justify-between p-40 rounded-16 bg-white shadow-lg">
              <div class="flex-1">
                <h2 class="mb-10 text-30 tracking-1">{{ project.name }}</h2>
                <p v-if="project.description" class="mb-10 text-gray-600">{{ project.description }}</p>
                <p v-if="project.features && project.features.length > 0" class="mb-10">
                  <span class="font-800">功能特点：</span>
                  <br>
                  <span v-for="(feature, idx) in project.features" :key="idx">{{ idx + 1 }}、{{ feature }}<br></span>
                </p>
                <p v-if="project.duties && project.duties.length > 0" class="mb-10">
                  <span class="font-800">支持格式/说明：</span>
                  <br>
                  <span v-for="(duty, idx) in project.duties" :key="idx">{{ idx + 1 }}、{{ duty }}<br></span>
                </p>
                <p class="mb-10">
                  <span class="font-800">技术栈：</span>
                  {{ project.tech }}
                </p>
              </div>
              <div v-if="project.link" class="ml-30 flex-shrink-0">
                <el-button
                  type="primary"
                  size="large"
                  @click="downloadFile(project.link)"
                  class="download-btn">
                  <span class="iconfont icon-xiazai mr-5"></span>
                  立即下载
                </el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {computed} from 'vue';

const downloadFile = (url) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.download = url.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const projectData = {
  title: '我的软件',
  projects: [
    {
      name: '图片转换工具',
      link: 'http://47.116.190.6:11888/down/2OTD48eKbTqz.exe',
      tech: 'Python',
      description: '一个基于Python的图片格式转换工具，支持将图片转换为JPG、PNG、WebP、BMP、GIF等多种格式。',
      features: [
        '批量/单独转换：支持文件夹和单张图片转换',
        '多格式支持：支持JPG、PNG、WebP、BMP、GIF等格式互转',
        '质量调节：支持10-100的质量调节范围',
        'GIF优化：保留动图格式并压缩',
        '保持目录结构：批量转换时保持原有结构'
      ],
      duties: [
        '输入格式：JPG、JPEG、PNG、BMP、GIF、WebP',
        '输出格式：JPG、JPEG、PNG、WebP、BMP、GIF'
      ]
    },
    {
      name: '浏览器插件',
      image: '@/assets/object/HetCataX.webp',
      link: 'http://47.116.190.6:11888/down/Jw795XH5wY5c.zip',
      tech: 'NodeJS、Chrome Extension',
      description: '一个功能丰富的浏览器插件，支持Cookie复制、销售数据查询、通知单统计等多种功能。',
      features: [
        'Cookie复制：一键复制当前页面的Cookie（支持字符串格式和JSON格式）',
        '销售数据查询：自动获取唯品会销售数据，生成信息总结',
        '通知单统计：自动统计webopm页面的通知单数量',
        '密码自动生成：基于AES加密算法自动生成月度密码',
        '主题切换：支持随机切换页面主题颜色',
        '账号密码显示：在特定域名下自动显示账号密码信息',
        '自动检测域名：根据当前访问的域名自动切换功能模式'
      ],
      duties: []
    },
    {
      name: '表格自动化程序',
      image: '@/assets/object/shouban.webp',
      link: 'http://47.116.190.6:11888/down/SWWzRToM9W01.exe',
      tech: 'Python、Tkinter',
      description: '自动生成配饰表格 & ERP明细工具，基于Python + Tkinter的桌面程序。',
      features: [
        'OMS订单解析：解析网页/表格，抽取配饰相关数据',
        'SKU→熊吊牌匹配：根据本地映射表自动匹配熊吊牌',
        '生成配饰Excel表格：按唯品会配饰要求生成标准表格',
        'ERP侧操作自动化：调用archivesAdd创建ERP单据，并通过DJMxEdit接口自动新增明细'
      ],
      duties: [
        '适合配饰业务的日常批量处理'
      ]
    },
    {
      name: '2048游戏',
      link: 'http://47.116.190.6:11888/down/GVufpp8UispW.exe',
      tech: 'Python、Tkinter',
      description: '经典的2048数字合并游戏',
      features: ['数字合并玩法', '分数记录', '简洁界面'],
      duties: []
    },
    {
      name: 'fireworks.exe',
      image: '@/assets/object/HetCataX.webp',
      link: 'http://47.116.190.6:11888/down/d0jf3Eke7LaQ.exe',
      tech: 'Python、Pygame',
      description: '烟花特效程序，绚丽的烟花绽放效果',
      features: ['绚丽烟花效果', '多种颜色', '鼠标交互'],
      duties: []
    },
    {
      name: 'LovePopup.exe',
      image: '@/assets/object/shouban.webp',
      link: 'http://47.116.190.6:11888/down/mAEHyoyCgrQb.exe',
      tech: 'Python、Tkinter',
      description: '爱情回答弹窗，浪漫的表白工具',
      features: ['随机情话', '精美弹窗', '背景音乐'],
      duties: []
    },
    {
      name: 'restOfMyLife.exe',
      link: 'http://47.116.190.6:11888/down/SWWzRToM9W01.exe',
      tech: 'Python、Tkinter',
      description: '余生主题小程序',
      features: ['倒计时功能', '备忘录', '精美界面'],
      duties: []
    },
    {
      name: 'warm.exe',
      image: '@/assets/object/HetCataX.webp',
      link: 'http://47.116.190.6:11888/down/Du1D1ersRLbz.exe',
      tech: 'Python、Tkinter',
      description: '超级温馨问候弹窗',
      features: ['温馨祝福语', '动画效果', '定时提醒'],
      duties: []
    },
    {
      name: '小月壁纸.exe',
      image: '@/assets/object/shouban.webp',
      link: 'http://47.116.190.6:11888/down/Du1D1ersRLbz.exe',
      tech: 'Python、PyQt5',
      description: '小月壁纸程序，一键更换精美壁纸',
      features: ['壁纸下载', '自动切换', '多分辨率支持'],
      duties: []
    }
  ]
};

const currentTitle = computed(() => projectData.title);
const currentProjects = computed(() => projectData.projects);
</script>

<style scoped lang="less">
ul {
  li {
    &:nth-child(2n) {
      flex-direction: row-reverse;
    }

    p, div {
      font-size: 20px;
    }

    .download-btn {
      padding: 12px 40px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
