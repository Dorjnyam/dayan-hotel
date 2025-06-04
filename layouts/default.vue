<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderComponent />
    
    <!-- Main Content -->
    <main>
      <slot />
    </main>
    
    <!-- Footer -->
    <FooterComponent />
    
    <!-- Loading Overlay -->
    <LoadingOverlay v-if="isLoading" />
    
    <!-- Notification Toast -->
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
// Global loading state
const isLoading = ref(false)

// Provide loading state to child components
provide('loading', {
  isLoading: readonly(isLoading),
  setLoading: (value: boolean) => {
    isLoading.value = value
  }
})

// SEO meta tags
useSeoMeta({
  titleTemplate: '%s | Даян зочид буудал',
  ogSiteName: 'Даян зочид буудал',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// Global error handling
onErrorCaptured((error) => {
  console.error('Global error:', error)
  return false
})
</script>