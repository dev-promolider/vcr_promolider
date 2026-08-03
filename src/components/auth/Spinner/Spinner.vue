<template>
  <div class="tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-[#ECECEC] dark:tw-bg-[#0a0f18] tw-transition-all tw-duration-400 tw-ease-in-out tw-w-full tw-h-screen tw-z-50">
    <svg class="tw-animate-spin tw-h-20 tw-w-20 tw-text-[#131b1e] dark:tw-text-[#10B981]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
</template>
<script>
export default {
  name: "Spinner",
  data() {
    return {};
  },
};
</script>
