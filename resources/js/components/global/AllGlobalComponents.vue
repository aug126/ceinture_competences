<template>
  <div>
    <!-- <notification /> -->
    <overlay-loader></overlay-loader>
  </div>
</template>
<script>
import Notification from "./Notification";
import OverlayLoader from "./OverlayLoader";

export default {
  components: {
    Notification,
    OverlayLoader
  }
};
</script>