<script setup lang="ts"></script>

<template>
  <div class="rounded bg-white pb-6 pl-7 pr-5 pt-7">
    <h4 class="mb-4 text-smd font-medium tracking-wide text-cdark-1">File Attachment</h4>
    <div class="flex flex-col gap-5">
      <div class="flex gap-5">
        <g-icon class="w-9" icon="pdf" />
        <div class="flex min-w-0 flex-1 flex-col justify-between pb-0.5">
          <div class="flex items-center justify-between">
            <div class="flex">
              <h4 class="text-xsm font-medium">User-Journey.pdf</h4>
              <span class="ml-3 text-xs text-cdark-1">4.5M</span>
            </div>
            <p class="text-xs font-medium text-cdark-1/50">Cancel</p>
          </div>
          <g-progress-bar color="pink" :percent="30" />
        </div>
      </div>
      <div class="flex gap-5">
        <g-icon class="w-9" icon="xls" />
        <div class="flex min-w-0 flex-1 flex-col justify-between">
          <div class="flex items-center justify-between">
            <div class="flex">
              <h4 class="text-xsm font-medium">Data-Structure.xls</h4>
              <span class="ml-3 text-xs text-cdark-1">12.4 MB</span>
            </div>
            <p class="cursor-pointer text-xs font-medium text-cpurple-5">Download</p>
          </div>
          <p class="text-xs text-cdark-1/50">Angela Hope</p>
        </div>
      </div>
    </div>
  </div>
</template>
