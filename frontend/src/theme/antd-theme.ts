import type { ThemeConfig } from 'antd';

// Ant Design 主题配置 - 遵循 Knowledge Studio 设计规范
export const antdTheme: ThemeConfig = {
  token: {
    // 主色调 - Indigo
    colorPrimary: '#6366f1',
    colorPrimaryHover: '#4f46e5',
    colorPrimaryActive: '#4338ca',

    // 中性色
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f9fafb',
    colorBgElevated: '#ffffff',
    colorBorder: '#e5e7eb',
    colorBorderSecondary: '#f3f4f6',

    // 文本色
    colorText: '#111827',
    colorTextSecondary: '#6b7280',
    colorTextTertiary: '#9ca3af',
    colorTextDisabled: '#d1d5db',

    // 成功色
    colorSuccess: '#22c55e',
    colorSuccessBg: '#f0fdf4',
    colorSuccessBorder: '#86efac',

    // 警告色
    colorWarning: '#f59e0b',
    colorWarningBg: '#fffbeb',
    colorWarningBorder: '#fde68a',

    // 错误色
    colorError: '#ef4444',
    colorErrorBg: '#fef2f2',
    colorErrorBorder: '#fecaca',

    // 信息色
    colorInfo: '#3b82f6',
    colorInfoBg: '#eff6ff',
    colorInfoBorder: '#93c5fd',

    // 圆角 - 8px 基础网格
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    borderRadiusXS: 2,

    // 字体
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,

    // 行高
    lineHeight: 1.5,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.3,
    lineHeightHeading3: 1.4,

    // 阴影
    boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)',
    boxShadowSecondary: '0 4px 6px rgb(0 0 0 / 0.1)',

    // 动画
    motionDurationSlow: '0.3s',
    motionDurationMid: '0.2s',
    motionDurationFast: '0.15s',
  },

  components: {
    // Button 按钮
    Button: {
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingContentHorizontal: 24,
      borderRadius: 8,
      fontWeight: 500,
      primaryShadow: 'none',
      defaultShadow: 'none',
    },

    // Input 输入框
    Input: {
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      borderRadius: 8,
      paddingBlock: 8,
      paddingInline: 12,
    },

    // Card 卡片
    Card: {
      borderRadiusLG: 12,
      paddingLG: 24,
      boxShadowTertiary: '0 1px 2px rgb(0 0 0 / 0.05)',
    },

    // Select 选择器
    Select: {
      controlHeight: 40,
      borderRadius: 8,
    },

    // Modal 对话框
    Modal: {
      borderRadiusLG: 12,
      paddingContentHorizontalLG: 24,
    },

    // Menu 菜单
    Menu: {
      itemBorderRadius: 8,
      itemHeight: 40,
      itemMarginBlock: 4,
      itemMarginInline: 4,
      itemPaddingInline: 12,
    },

    // Tabs 标签页
    Tabs: {
      itemActiveColor: '#6366f1',
      itemHoverColor: '#4f46e5',
      itemSelectedColor: '#6366f1',
      inkBarColor: '#6366f1',
      titleFontSize: 14,
    },

    // Layout 布局
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#f9fafb',
      bodyBg: '#ffffff',
      headerHeight: 64,
      headerPadding: '0 24px',
    },
  },
};
