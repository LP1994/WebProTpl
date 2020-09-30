<!--
Project: WebProTpl
Author：12278
Email：2726893248@qq.com
CreateDate：2019-01-01 00:00:00
IDE: WebStorm
-->
<style lang = 'scss'
       scoped
       src = 'vueStyDir/ExampleA.scss' />
<template>
  <div class = 'css-reset root'>
    {{ textA }}
  </div>
</template>
<script type = 'module'>
'use strict';

export {
  default,
  default as ExampleA,
} from 'vueMDir/ExampleA.esm.js';
</script>
