<!--
Project: WebProTpl
Author：12278
Email：2726893248@qq.com
CreateDate：2019-01-01 00:00:00
IDE: WebStorm
-->
<style lang = 'scss'
       scoped
       src = 'vueStyDir/xmQAQ/ImgShowTool.scss' />
<template>
  <div class = 'css-reset ofh root imgShowToolBox'>
    <button class = 'css-reset cP returnToBtnBoxA'
            @doubleTap = 'returnTo' />
    <button class = 'css-reset cP refreshBtnBoxA'
            @doubleTap = 'refresh' />
    <img class = 'css-reset'
         :src = 'src'
         :alt = 'alt'
         :index = 'index'
         :preload-img-count = 'preloadImgCount'
         :is-first = 'isFirst'
         :state = 'state'
         @load = 'imgLoad' />
    <button class = 'css-reset cP prevBtn'
            :class = '{
                touchAN: isTouchAN,
                }'
            :title = 'prevBtnTitle'
            @tap = 'prevImg'
            @swipeRight = 'prevImg'
            @swipeLeft = 'nextImg'
            @swipeUp = 'nextImg'
            @swipeDown = 'prevImg' />
    <button class = 'css-reset cP nextBtn'
            :class = '{
                touchAN: isTouchAN,
                }'
            :title = 'nextBtnTitle'
            @tap = 'nextImg'
            @swipeRight = 'prevImg'
            @swipeLeft = 'nextImg'
            @swipeUp = 'nextImg'
            @swipeDown = 'prevImg' />
  </div>
</template>
<script type = 'module'>
'use strict';

export {
  default,
  default as ImgShowTool,
} from 'vueMDir/xmQAQ/ImgShowTool.esm.js';
</script>
