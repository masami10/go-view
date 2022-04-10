<template>
  <n-dropdown
    trigger="hover"
    @select="handleSelect"
    :show-arrow="true"
    :options="options"
  >
    <div class="user-info-box">
      <person-icon v-if="fallback"></person-icon>
      <n-avatar
        v-if="!fallback"
        round
        object-fit="cover"
        size="medium"
        :src="Person"
        @error="errorHandle"
      ></n-avatar>
    </div>
  </n-dropdown>

  <!-- 系统设置 model -->
  <go-system-set v-model:modelShow="modelShow"></go-system-set>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { NAvatar, NText } from 'naive-ui'
import { renderIcon } from '@/utils'
import { openDoc, logout, renderLang } from '@/utils'
import { GoSystemSet } from '@/components/GoSystemSet/index'
import Person from './person.png'

import { icon } from '@/plugins'
const {
  DocumentTextIcon,
  ChatboxEllipsesIcon,
  PersonIcon,
  LogOutOutlineIcon,
  SettingsSharpIcon
} = icon.ionicons5

const t = window['$t']

const modelShow = ref(false)

// 是否失败
const fallback = ref(false)

// 用户图标渲染
const renderUserInfo = () => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: Person
      }),
      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => '奔跑的面条' })
        ])
      ])
    ]
  )
}
const options = ref([
  {
    label: '我的信息',
    key: 'info',
    type: 'render',
    render: renderUserInfo
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: renderLang('global.doc'),
    key: 'doc',
    icon: renderIcon(DocumentTextIcon)
  },
  {
    label: renderLang('global.contact'),
    key: 'contact',
    icon: renderIcon(ChatboxEllipsesIcon)
  },
  {
    label: renderLang('global.sys_set'),
    key: 'sysSet',
    icon: renderIcon(SettingsSharpIcon)
  },
  {
    type: 'divider',
    key: 'd3'
  },
  {
    label: renderLang('global.logout'),
    key: 'logout',
    icon: renderIcon(LogOutOutlineIcon)
  }
])

// 图片渲染错误
const errorHandle = (e: Event) => {
  fallback.value = true
}

// 系统设置
const sysSetHandle = () => {
  modelShow.value = true
}

const handleSelect = (key: string) => {
  switch (key) {
    case 'doc':
      openDoc()
      break
    case 'contact':
      openDoc()
      break
    case 'sysSet':
      sysSetHandle()
      break
    case 'logout':
      logout()
      break
  }
}
</script>

<style lang="scss" scoped>
.user-info-box {
  cursor: pointer;
  transform: scale(0.7);
}
</style>