<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen bg-cover bg-center" 
             style="background-image: url('/images/hero-bg.jpg')">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 flex items-center justify-center h-full text-white text-center">
        <div class="max-w-4xl mx-auto px-4">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            {{ $t('hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {{ $t('hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/booking" 
                      class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              {{ $t('hero.bookNow') }}
            </NuxtLink>
            <NuxtLink to="/rooms" 
                      class="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              {{ $t('hero.viewRooms') }}
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Quick Booking Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">
            {{ $t('quickBooking.title') }}
          </h2>
          
          <div class="bg-white rounded-lg shadow-lg p-6">
            <form @submit.prevent="handleQuickBooking" class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('booking.checkIn') }}
                </label>
                <input v-model="quickBooking.checkIn" 
                       type="date" 
                       :min="today"
                       class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('booking.checkOut') }}
                </label>
                <input v-model="quickBooking.checkOut" 
                       type="date" 
                       :min="quickBooking.checkIn || today"
                       class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('booking.guests') }}
                </label>
                <select v-model="quickBooking.guests" 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="1">1 {{ $t('booking.guest') }}</option>
                  <option value="2">2 {{ $t('booking.guests') }}</option>
                  <option value="3">3 {{ $t('booking.guests') }}</option>
                  <option value="4">4 {{ $t('booking.guests') }}</option>
                  <option value="5">5+ {{ $t('booking.guests') }}</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('booking.roomType') }}
                </label>
                <select v-model="quickBooking.roomType" 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="">{{ $t('booking.anyRoom') }}</option>
                  <option value="standard">{{ $t('rooms.standard') }}</option>
                  <option value="deluxe">{{ $t('rooms.deluxe') }}</option>
                  <option value="suite">{{ $t('rooms.suite') }}</option>
                </select>
              </div>
              
              <div class="flex items-end">
                <button type="submit" 
                        class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  {{ $t('booking.search') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          {{ $t('features.title') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.id" 
               class="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon :name="feature.icon" class="w-8 h-8 text-amber-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              {{ $t(feature.title) }}
            </h3>
            <p class="text-gray-600">
              {{ $t(feature.description) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rooms Preview Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4 text-gray-800">
            {{ $t('rooms.title') }}
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            {{ $t('rooms.description') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="room in featuredRooms" :key="room.id" 
               class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="relative h-48 bg-gray-200">
              <img :src="room.image" 
                   :alt="$t(room.name)"
                   class="w-full h-full object-cover">
              <div class="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ formatPrice(room.price) }}₮
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">
                {{ $t(room.name) }}
              </h3>
              <p class="text-gray-600 mb-4">
                {{ $t(room.description) }}
              </p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="amenity in room.amenities" :key="amenity"
                      class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {{ $t(amenity) }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">
                  {{ room.capacity }} {{ $t('booking.guests') }}
                </span>
                <NuxtLink :to="`/rooms/${room.id}`" 
                          class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  {{ $t('common.viewDetails') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/rooms" 
                    class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            {{ $t('rooms.viewAll') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Location Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6 text-gray-800">
              {{ $t('location.title') }}
            </h2>
            <p class="text-gray-600 mb-6 text-lg">
              {{ $t('location.description') }}
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-amber-600 mr-3" />
                <span class="text-gray-700">{{ $t('location.address') }}</span>
              </div>
              <div class="flex items-center">
                <Icon name="heroicons:phone" class="w-5 h-5 text-amber-600 mr-3" />
                <span class="text-gray-700">+976 1234 5678</span>
              </div>
              <div class="flex items-center">
                <Icon name="heroicons:envelope" class="w-5 h-5 text-amber-600 mr-3" />
                <span class="text-gray-700">info@dayanhotel.mn</span>
              </div>
            </div>
            
            <div class="mt-8">
              <NuxtLink to="/contact" 
                        class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                {{ $t('common.contactUs') }}
              </NuxtLink>
            </div>
          </div>
          
          <div class="relative">
            <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <!-- Map placeholder - replace with actual map component -->
              <div class="text-center">
                <Icon name="heroicons:map" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p class="text-gray-500">{{ $t('location.mapPlaceholder') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          {{ $t('reviews.title') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="review in reviews" :key="review.id" 
               class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center mb-4">
              <div class="flex text-amber-400">
                <Icon v-for="i in 5" :key="i" 
                      name="heroicons:star" 
                      :class="i <= review.rating ? 'text-amber-400' : 'text-gray-300'"
                      class="w-5 h-5" />
              </div>
            </div>
            
            <p class="text-gray-600 mb-4 italic">
              "{{ $t(review.comment) }}"
            </p>
            
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span class="text-sm font-semibold text-gray-600">
                  {{ review.author.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ review.author }}</p>
                <p class="text-sm text-gray-500">{{ review.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-amber-600">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          {{ $t('cta.title') }}
        </h2>
        <p class="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
          {{ $t('cta.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/booking" 
                    class="bg-white hover:bg-gray-100 text-amber-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            {{ $t('cta.bookNow') }}
          </NuxtLink>
          <NuxtLink to="/contact" 
                    class="border-2 border-white hover:bg-white hover:text-amber-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            {{ $t('cta.contactUs') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Meta tags
useHead({
  title: 'Даян Зочид Буудал - Улиастай, Завхан',
  meta: [
    { name: 'description', content: 'Завхан аймгийн Улиастай хотод байрлах тансаг зочид буудал. Тав тухтай өрөө, өндөр чанарын үйлчилгээ.' },
    { name: 'keywords', content: 'зочид буудал, Улиастай, Завхан, захиалга, өрөө' }
  ]
})

// Reactive data
const quickBooking = ref({
  checkIn: '',
  checkOut: '',
  guests: '2',
  roomType: ''
})

// Computed properties
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Static data
const features = [
  {
    id: 1,
    icon: 'heroicons:wifi',
    title: 'features.wifi.title',
    description: 'features.wifi.description'
  },
  {
    id: 2,
    icon: 'heroicons:sparkles',
    title: 'features.restaurant.title',
    description: 'features.restaurant.description'
  },
  {
    id: 3,
    icon: 'heroicons:shield-check',
    title: 'features.security.title',
    description: 'features.security.description'
  },
  {
    id: 4,
    icon: 'heroicons:car',
    title: 'features.parking.title',
    description: 'features.parking.description'
  },
  {
    id: 5,
    icon: 'heroicons:clock',
    title: 'features.reception.title',
    description: 'features.reception.description'
  },
  {
    id: 6,
    icon: 'heroicons:heart',
    title: 'features.service.title',
    description: 'features.service.description'
  }
]

const featuredRooms = [
  {
    id: 1,
    name: 'rooms.standard.name',
    description: 'rooms.standard.shortDescription',
    price: 120000,
    capacity: 2,
    image: '/images/rooms/standard.jpg',
    amenities: ['amenities.wifi', 'amenities.tv', 'amenities.bathroom']
  },
  {
    id: 2,
    name: 'rooms.deluxe.name',
    description: 'rooms.deluxe.shortDescription',
    price: 180000,
    capacity: 3,
    image: '/images/rooms/deluxe.jpg',
    amenities: ['amenities.wifi', 'amenities.tv', 'amenities.minibar', 'amenities.balcony']
  },
  {
    id: 3,
    name: 'rooms.suite.name',
    description: 'rooms.suite.shortDescription',
    price: 250000,
    capacity: 4,
    image: '/images/rooms/suite.jpg',
    amenities: ['amenities.wifi', 'amenities.tv', 'amenities.minibar', 'amenities.jacuzzi']
  }
]

const reviews = [
  {
    id: 1,
    author: 'Болд Б.',
    rating: 5,
    comment: 'reviews.review1.comment',
    date: '2024-11-15'
  },
  {
    id: 2,
    author: 'Сэрэмжидийн С.',
    rating: 5,
    comment: 'reviews.review2.comment',
    date: '2024-11-10'
  },
  {
    id: 3,
    author: 'Туяа Т.',
    rating: 4,
    comment: 'reviews.review3.comment',
    date: '2024-11-05'
  }
]

// Methods
const handleQuickBooking = () => {
  if (!quickBooking.value.checkIn || !quickBooking.value.checkOut) {
    alert('Эхлэх болон дуусах огноо сонгоно уу!')
    return
  }
  
  const query = {
    checkIn: quickBooking.value.checkIn,
    checkOut: quickBooking.value.checkOut,
    guests: quickBooking.value.guests,
    roomType: quickBooking.value.roomType
  }
  
  navigateTo({ path: '/booking', query })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('mn-MN').format(price)
}

// Lifecycle
onMounted(() => {
  // Set default check-in date to tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  quickBooking.value.checkIn = tomorrow.toISOString().split('T')[0]
  
  // Set default check-out date to day after tomorrow
  const dayAfter = new Date()
  dayAfter.setDate(dayAfter.getDate() + 2)
  quickBooking.value.checkOut = dayAfter.toISOString().split('T')[0]
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hero section overlay */
.hero-overlay {
  background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
}
</style>