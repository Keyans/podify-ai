<template>
  <div class="app">
    <NuxtLayout>
    <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import 'assets/css/main.css';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.app {
  min-height: 100vh;
}
</style>
