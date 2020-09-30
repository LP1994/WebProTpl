<!--
Project: WebProTpl
Author：12278
Email：2726893248@qq.com
CreateDate：2019-01-01 00:00:00
IDE: WebStorm
-->
<style lang = 'scss'
       scoped
       src = 'vueStyDir/xmQAQ/AppBtn.scss' />
<template>
  <div class = 'css-reset ofh cP flexBox flexSBC flexDC root appBtn'
       @tap = 'activity'>
    <img class = 'css-reset'
         :src = 'src'
         :alt = 'alt' />
    <label class = 'css-reset sLTextE'>{{ appName }}</label>
  </div>
</template>
<script type = 'module'>
'use strict';

export {
  default,
  default as AppBtn,
} from 'vueMDir/xmQAQ/AppBtn.esm.js';
</script>
