<template>
    <header class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="flex items-center space-x-2">
                        <img src="/logo.png" alt="Dayan Hotel" class="h-10 w-auto" />
                        <span class="text-xl font-bold text-primary-600">
                            {{ $t('common.hotel_name', 'Даян зочид буудал') }}
                        </span>
                    </NuxtLink>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-8">
                    <NuxtLink v-for="item in navigationItems" :key="item.name" :to="item.path"
                        class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        :class="{ 'text-primary-600 border-b-2 border-primary-600': $route.path === item.path }">
                        {{ $t(item.label) }}
                    </NuxtLink>
                </nav>

                <!-- Right side actions -->
                <div class="hidden md:flex items-center space-x-4">
                    <!-- Language Switcher -->
                    <div class="relative">
                        <button @click="toggleLanguageMenu"
                            class="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                            <span class="text-sm font-medium">{{ currentLocale.toUpperCase() }}</span>
                            <ChevronDownIcon class="h-4 w-4" />
                        </button>

                        <div v-if="showLanguageMenu"
                            class="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-50">
                            <button v-for="locale in availableLocales" :key="locale.code"
                                @click="switchLanguage(locale.code)"
                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {{ locale.name }}
                            </button>
                        </div>
                    </div>

                    <!-- User Actions -->
                    <div v-if="user" class="relative">
                        <button @click="toggleUserMenu"
                            class="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                            <UserCircleIcon class="h-6 w-6" />
                            <span class="text-sm font-medium">{{ user.name }}</span>
                            <ChevronDownIcon class="h-4 w-4" />
                        </button>

                        <div v-if="showUserMenu"
                            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {{ $t('navigation.profile') }}
                            </NuxtLink>
                            <NuxtLink v-if="user.role === 'ADMIN' || user.role === 'STAFF'" to="/admin"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {{ $t('navigation.admin') }}
                            </NuxtLink>
                            <button @click="logout"
                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {{ $t('navigation.logout') }}
                            </button>
                        </div>
                    </div>

                    <!-- Login/Register -->
                    <div v-else class="flex items-center space-x-3">
                        <NuxtLink to="/auth/login" class="text-gray-700 hover:text-primary-600 text-sm font-medium">
                            {{ $t('navigation.login') }}
                        </NuxtLink>
                        <NuxtLink to="/auth/register"
                            class="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">
                            {{ $t('navigation.register') }}
                        </NuxtLink>
                    </div>

                    <!-- Book Now Button -->
                    <NuxtLink to="/booking"
                        class="bg-accent-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-accent-600 transition-colors">
                        {{ $t('common.book_now') }}
                    </NuxtLink>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="toggleMobileMenu" class="text-gray-700 hover:text-primary-600 p-2">
                        <Bars3Icon v-if="!showMobileMenu" class="h-6 w-6" />
                        <XMarkIcon v-else class="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <NuxtLink v-for="item in navigationItems" :key="item.name" :to="item.path"
                    class="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium" @click="closeMobileMenu">
                    {{ $t(item.label) }}
                </NuxtLink>

                <div class="border-t border-gray-200 pt-4">
                    <div v-if="user" class="space-y-1">
                        <div class="px-3 py-2 text-sm text-gray-500">
                            {{ user.name }}
                        </div>
                        <NuxtLink to="/profile" class="block px-3 py-2 text-gray-700 hover:text-primary-600"
                            @click="closeMobileMenu">
                            {{ $t('navigation.profile') }}
                        </NuxtLink>
                        <NuxtLink v-if="user.role === 'ADMIN' || user.role === 'STAFF'" to="/admin"
                            class="block px-3 py-2 text-gray-700 hover:text-primary-600" @click="closeMobileMenu">
                            {{ $t('navigation.admin') }}
                        </NuxtLink>
                        <button @click="logout"
                            class="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600">
                            {{ $t('navigation.logout') }}
                        </button>
                    </div>

                    <div v-else class="space-y-1">
                        <NuxtLink to="/auth/login" class="block px-3 py-2 text-gray-700 hover:text-primary-600"
                            @click="closeMobileMenu">
                            {{ $t('navigation.login') }}
                        </NuxtLink>
                        <NuxtLink to="/auth/register" class="block px-3 py-2 text-gray-700 hover:text-primary-600"
                            @click="closeMobileMenu">
                            {{ $t('navigation.register') }}
                        </NuxtLink>
                    </div>

                    <NuxtLink to="/booking"
                        class="block mx-3 mt-4 bg-accent-500 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-accent-600"
                        @click="closeMobileMenu">
                        {{ $t('common.book_now') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import {
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    UserCircleIcon
} from '@heroicons/vue/24/outline'

const { $i18n } = useNuxtApp()
const router = useRouter()
const { user, logout: authLogout } = useAuth()

// Mobile menu state
const showMobileMenu = ref(false)
const showLanguageMenu = ref(false)
const showUserMenu = ref(false)

// Navigation items
const navigationItems = [
    { name: 'home', label: 'navigation.home', path: '/' },
    { name: 'rooms', label: 'navigation.rooms', path: '/rooms' },
    { name: 'services', label: 'navigation.services', path: '/services' },
    { name: 'restaurant', label: 'navigation.restaurant', path: '/restaurant' },
    { name: 'gallery', label: 'navigation.gallery', path: '/gallery' },
    { name: 'attractions', label: 'navigation.attractions', path: '/attractions' },
    { name: 'about', label: 'navigation.about', path: '/about' },
    { name: 'contact', label: 'navigation.contact', path: '/contact' },
]

// Language switching
const currentLocale = computed(() => $i18n.locale.value)
const availableLocales = computed(() => $i18n.locales.value)

const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
    showMobileMenu.value = false
}

const toggleLanguageMenu = () => {
    showLanguageMenu.value = !showLanguageMenu.value
    showUserMenu.value = false
}

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
    showLanguageMenu.value = false
}

const switchLanguage = async (locale: "mn" | "en") => {
    await $i18n.setLocale(locale)
    showLanguageMenu.value = false
}

const logout = async () => {
    await authLogout()
    showUserMenu.value = false
    await router.push('/')
}

// Refs for language and user menu containers
const languageMenuRef = ref<HTMLElement | null>(null)
const userMenuRef = ref<HTMLElement | null>(null)

// Close menus when clicking outside
onClickOutside(languageMenuRef, () => {
    showLanguageMenu.value = false
})
onClickOutside(userMenuRef, () => {
    showUserMenu.value = false
})

// Close mobile menu on route change
watch(() => router.currentRoute.value.path, () => {
    showMobileMenu.value = false
})


function useAuth(): { user: any; logout: any } {
    throw new Error('Function not implemented.')
}
</script>