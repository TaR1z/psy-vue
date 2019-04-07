<template>
    <div>
      <div ref="editorElem"></div>
    </div>  
</template>

<script>
  import E from 'wangeditor'
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.$nextTick(() => {
        var editor = new E(this.$refs.editorElem)
        editor.customConfig.onchange = (html) => {
          this.$emit("catchData", html);
        }
        editor.create()
      })
    }
  }
</script>
