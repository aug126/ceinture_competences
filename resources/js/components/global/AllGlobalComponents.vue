<template>
  <div>
    <notify-info :show-info="this.$store.state.notifyInfo"></notify-info>
    <overlay-loader></overlay-loader>
  </div>
</template>
<script>
import NotifyInfo from "./NotifyInfo";
import OverlayLoader from "./OverlayLoader";

export default {
  components: {
    NotifyInfo,
    OverlayLoader
  }
};
</script>