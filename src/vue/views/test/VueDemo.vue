<!--
Project: WebProTpl
Author：12278
Email：2726893248@qq.com
CreateDate：2019-01-01 00:00:00
IDE: WebStorm
-->
<style lang = 'scss'
       scoped
       src = 'vueStyDir/test/VueDemo.scss' />
<template>
  <div class = 'css-reset root'>
    <p class = 'css-reset'
       v-bind:[titleAttrKeyName] = 'titleAttrKeyValue'>{{ textA }}
    </p>
    <br />
    <ol class = 'css-reset'>
      <li class = 'css-reset'
          v-for = '( todo, index ) in todos'
          :key = 'index'>
        {{ todo.text }}___{{ todo.obj1.a }}
      </li>
    </ol>
    <br />
    <ol class = 'css-reset'>
      <li class = 'css-reset'
          v-for = '( v, index ) in arr1'
          :key = 'index'>
        {{ index }}---{{ v }}
      </li>
    </ol>
    <br />
    <p class = 'css-reset'
       v-text>
      {{ vText1 }}
    </p>
    <p class = 'css-reset'
       v-html>
      {{ vHtml1 }}
    </p>
    <br />
    <p class = 'css-reset'
       v-text = 'vText1'></p>
    <p class = 'css-reset'
       v-html = 'vHtml1'></p>
    <br />
    <p class = 'css-reset'>{{ fullName }}</p>
    <br />
    <p class = 'css-reset'>VueDemo->props->attr1->{{ attr1 }}</p>
    <br />
    <p class = 'css-reset'>VueDemo->props->attr2->{{ attr2 }}</p>
    <br />
    <p class = 'css-reset'>VueDemo->props->attr3->{{ attr3 }}</p>
    <br />
    <slot :VueDemo4SlotAttr1 = 'slotAttr1'>{{ slotAttr1 }}</slot>
    <br />
    <Global4VueComponentA class = 'css-reset'></Global4VueComponentA>
    <br />
  </div>
</template>
<script type = 'module'>
'use strict';

export {
  default,
  default as VueDemo,
} from 'vueMDir/test/VueDemo.esm.js';
</script>
