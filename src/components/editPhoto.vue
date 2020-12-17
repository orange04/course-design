<template>
  <div class="background"></div>
</template>

<script>
// import React, { useState } from "react";
// import { render } from "react-dom";
// import FilerobotImageEditor from "filerobot-image-editor";

export default {
  name: "editPhoto",
  data() {
    return {
      ImageEditor: ""
    };
  },
  mounted: function() {
    console.log(this.$route.params);
    const imageE = new FilerobotImageEditor();
    imageE.open(this.$route.params.imageid);
  }
};
</script>
