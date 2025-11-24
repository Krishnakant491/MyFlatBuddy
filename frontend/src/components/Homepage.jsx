import { Search } from 'lucide-react'
import React from 'react'
import Herosection from '../components/Herosection'
import brokers from "../assets/avoid-brokers.png"
import list from "../assets/list.png"
import lightning from "../assets/lightning.png"
import budget from "../assets/budget.png"
import Footer from './shared/Footer'
import WhyChoose from './WhyChoose'
import Featured from './Featured'
import PostOrBrowse from './PostOrBrowse'
import HomeBlog from './HomeBlog'
import axios from 'axios'

const Homepage = () => {

    return (
        <div>
            <Herosection />
            <WhyChoose />
            <Featured />
            <PostOrBrowse />
            <HomeBlog />
        </div>
    )
}

export default Homepage