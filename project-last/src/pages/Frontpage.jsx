import React from 'react'
import WelcomeBannerCarousel from '../components/Banner'
import PopularProducts from '../components/Cards'
import TrendingProducts from '../components/Trending'
import CategoriesPage from '../components/Categories'
import FloneFooter from '../components/Footer'

const Frontpage = () => {
  return (
    <div>
         <WelcomeBannerCarousel />
      <PopularProducts />
      <TrendingProducts />
      <CategoriesPage />
      </div>
  )
}

export default Frontpage